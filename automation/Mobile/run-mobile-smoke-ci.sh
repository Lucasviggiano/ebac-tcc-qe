#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
MOBILE_DIR="$ROOT_DIR/automation/Mobile"
MOBILE_REPORT_DIR="$ROOT_DIR/reports/ci/mobile"

mkdir -p "$MOBILE_REPORT_DIR"
cd "$MOBILE_DIR"

npm ci
npx appium driver install uiautomator2 || true
npx appium --base-path / --port 4723 > "$MOBILE_REPORT_DIR/appium.log" 2>&1 &
APPIUM_PID=$!

cleanup() {
  kill "$APPIUM_PID" 2>/dev/null || true
}
trap cleanup EXIT

sleep 15

set +e
npm run test:smoke 2>&1 | tee "$MOBILE_REPORT_DIR/mobile-smoke.log"
TEST_EXIT=${PIPESTATUS[0]}

npm run allure:generate 2>&1 | tee "$MOBILE_REPORT_DIR/allure-generate.log"
ALLURE_EXIT=${PIPESTATUS[0]}
set -e

if [ "$TEST_EXIT" -ne 0 ]; then
  exit "$TEST_EXIT"
fi

if [ "$ALLURE_EXIT" -ne 0 ]; then
  exit "$ALLURE_EXIT"
fi
