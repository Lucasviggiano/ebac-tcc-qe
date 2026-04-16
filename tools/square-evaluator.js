#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

function toLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function round(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function parseBoolean(value, fallback = false) {
  if (value === undefined || value === null || value === "") return fallback;
  const normalized = String(value).trim().toLowerCase();
  return ["1", "true", "yes", "y", "sim"].includes(normalized);
}

function normalizeStatus(raw) {
  if (!raw) return "na";
  const normalized = String(raw).trim().toLowerCase();
  if (["pass", "passed", "success", "succeeded", "ok"].includes(normalized)) return "pass";
  if (
    ["fail", "failed", "failure", "error", "cancelled", "timed_out", "timed-out"].includes(normalized)
  ) {
    return "fail";
  }
  if (["skipped", "skip", "na", "n/a", "not_applicable", "not-applicable"].includes(normalized)) {
    return "na";
  }
  return "na";
}

function fileExists(filePath) {
  if (!filePath) return false;
  return fs.existsSync(filePath);
}

function readTextIfExists(filePath) {
  if (!fileExists(filePath)) return null;
  const buffer = fs.readFileSync(filePath);

  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) {
    return buffer.toString("utf16le");
  }

  const utf8Text = buffer.toString("utf8");
  if (utf8Text.includes("\u0000")) {
    return buffer.toString("utf16le");
  }

  return utf8Text;
}

function readJsonIfExists(filePath) {
  if (!fileExists(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    return null;
  }
}

function parseCliArgs(argv) {
  const args = {
    gate: false,
    runPath: "",
    outputDir: "reports/square",
    reportDate: "",
    apiLogPath: "",
    uiLogPath: "",
    mobileLogPath: "",
    perfLoginSummaryPath: "",
    perfCatalogSummaryPath: "",
    envLogPath: "",
    expectMobile: undefined
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === "--gate") {
      args.gate = true;
      continue;
    }

    const nextValue = argv[index + 1];
    const consumeNext = () => {
      index += 1;
      return nextValue;
    };

    if (token === "--run-path" && nextValue) args.runPath = consumeNext();
    if (token === "--output-dir" && nextValue) args.outputDir = consumeNext();
    if (token === "--date" && nextValue) args.reportDate = consumeNext();
    if (token === "--api-log" && nextValue) args.apiLogPath = consumeNext();
    if (token === "--ui-log" && nextValue) args.uiLogPath = consumeNext();
    if (token === "--mobile-log" && nextValue) args.mobileLogPath = consumeNext();
    if (token === "--perf-login-summary" && nextValue) args.perfLoginSummaryPath = consumeNext();
    if (token === "--perf-catalog-summary" && nextValue) args.perfCatalogSummaryPath = consumeNext();
    if (token === "--env-log" && nextValue) args.envLogPath = consumeNext();
    if (token === "--expect-mobile" && nextValue) args.expectMobile = consumeNext();
  }

  return args;
}

function inferLatestRunPath() {
  const baseDir = path.join("reports", "evidence", "runs");
  if (!fileExists(baseDir)) return "";

  const candidates = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => b.localeCompare(a));

  if (candidates.length === 0) return "";
  return path.join(baseDir, candidates[0]);
}

function countMatches(text, pattern) {
  if (!text) return 0;
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

function parseExitCodeFromLog(logText) {
  if (!logText) return null;
  const match = logText.match(/EXIT_CODE\s*=\s*(-?\d+)/);
  if (!match) return null;
  return Number(match[1]);
}

function parseStatusFromLog(logText) {
  if (!logText) return "na";
  const exitCode = parseExitCodeFromLog(logText);
  if (exitCode === 0) return "pass";
  if (Number.isFinite(exitCode)) return "fail";
  return "na";
}

function parseApiMetrics(apiLogText, apiStatus) {
  const suiteMatch = apiLogText
    ? apiLogText.match(/Test Suites:\s+(\d+)\s+passed,\s+(\d+)\s+total/i)
    : null;
  const testMatch = apiLogText ? apiLogText.match(/Tests:\s+(\d+)\s+passed,\s+(\d+)\s+total/i) : null;
  const envSkipCount = countMatches(apiLogText, /\[ENV-SKIP\]/g);

  const suitesPassed = suiteMatch ? Number(suiteMatch[1]) : apiStatus === "pass" ? 1 : 0;
  const suitesTotal = suiteMatch ? Number(suiteMatch[2]) : apiStatus !== "na" ? 1 : 0;
  const testsPassed = testMatch ? Number(testMatch[1]) : apiStatus === "pass" ? 1 : 0;
  const testsTotal = testMatch ? Number(testMatch[2]) : apiStatus !== "na" ? 1 : 0;

  const suitePassRate = suitesTotal > 0 ? (suitesPassed / suitesTotal) * 100 : apiStatus === "na" ? 0 : 100;
  const testPassRate = testsTotal > 0 ? (testsPassed / testsTotal) * 100 : apiStatus === "na" ? 0 : 100;
  const qualityScore = round((suitePassRate + testPassRate) / 2);

  return {
    suitesPassed,
    suitesTotal,
    testsPassed,
    testsTotal,
    suitePassRate: round(suitePassRate),
    testPassRate: round(testPassRate),
    qualityScore,
    envSkipCount
  };
}

function extractMetricValue(summaryJson, metricPath, fallback = null) {
  if (!summaryJson) return fallback;
  const chunks = metricPath.split(".");
  let current = summaryJson;
  for (const chunk of chunks) {
    if (!current || typeof current !== "object" || !(chunk in current)) return fallback;
    current = current[chunk];
  }
  return current;
}

function parsePerfScenario(summaryJson) {
  if (!summaryJson) {
    return {
      available: false,
      checksRate: null,
      httpReqFailedRate: null,
      scenarioScore: null,
      iterations: null
    };
  }

  const checksRateRaw = extractMetricValue(summaryJson, "metrics.checks.value", null);
  const httpReqFailedRateRaw = extractMetricValue(summaryJson, "metrics.http_req_failed.value", null);
  const iterations = extractMetricValue(summaryJson, "metrics.iterations.count", null);

  const checksRate = Number.isFinite(checksRateRaw) ? checksRateRaw : 0;
  const httpReqFailedRate = Number.isFinite(httpReqFailedRateRaw) ? httpReqFailedRateRaw : 1;

  const scenarioScore = clamp((checksRate * 100 * 0.6) + ((1 - httpReqFailedRate) * 100 * 0.4));

  return {
    available: true,
    checksRate: round(checksRate * 100),
    httpReqFailedRate: round(httpReqFailedRate * 100),
    scenarioScore: round(scenarioScore),
    iterations: Number.isFinite(iterations) ? iterations : null
  };
}

function hasAssertionIndicators() {
  const checks = [
    {
      id: "command-helper",
      path: "automation/UI/cypress/support/commands.js",
      pattern: /assertTextContainsAny/
    },
    {
      id: "login-spec",
      path: "automation/UI/cypress/e2e/login.cy.js",
      pattern: /\.assertTextContainsAny\(/g
    },
    {
      id: "register-spec",
      path: "automation/UI/cypress/e2e/register.cy.js",
      pattern: /\.assertTextContainsAny\(/g
    },
    {
      id: "cart-spec",
      path: "automation/UI/cypress/e2e/add-to-cart.cy.js",
      pattern: /\.assertTextContainsAny\(/g
    },
    {
      id: "purchase-flow-spec",
      path: "automation/UI/cypress/e2e/e2e-purchase-flow.cy.js",
      pattern: /describe\(/g
    }
  ];

  const results = checks.map((entry) => {
    const text = readTextIfExists(entry.path);
    const ok = Boolean(text && entry.pattern.test(text));
    return {
      id: entry.id,
      path: entry.path,
      ok
    };
  });

  const passed = results.filter((item) => item.ok).length;
  const score = results.length > 0 ? (passed / results.length) * 100 : 0;
  return {
    score: round(score),
    passed,
    total: results.length,
    checks: results
  };
}

function evaluateMaintainabilityChecklist() {
  const checklist = [
    { id: "ui-page-object", path: "automation/UI/cypress/support/pages", type: "dir" },
    { id: "ui-actions", path: "automation/UI/cypress/support/actions", type: "dir" },
    {
      id: "api-contract-tests",
      path: "automation/API/tests/contracts/coupons-contract.spec.js",
      type: "file"
    },
    { id: "mobile-screen-object", path: "automation/Mobile/screens", type: "dir" },
    { id: "mobile-selectors", path: "automation/Mobile/selectors/android", type: "dir" },
    { id: "docs-automation-architecture", path: "docs/automation-architecture.md", type: "file" },
    { id: "docs-used-patterns", path: "docs/used-patterns.md", type: "file" },
    { id: "docs-execution-playbook", path: "docs/execution-playbook.md", type: "file" },
    { id: "docs-square-requirements", path: "docs/square-quality-requirements.md", type: "file" },
    { id: "docs-square-metrics", path: "docs/square-metrics-catalog.md", type: "file" },
    { id: "docs-square-evaluation", path: "docs/square-evaluation-method.md", type: "file" },
    { id: "docs-square-traceability", path: "docs/square-traceability.md", type: "file" }
  ];

  const evaluated = checklist.map((entry) => {
    const exists = fileExists(entry.path);
    const ok = exists;
    return { ...entry, ok };
  });

  const passed = evaluated.filter((item) => item.ok).length;
  const total = evaluated.length;
  const score = total > 0 ? (passed / total) * 100 : 0;

  return {
    score: round(score),
    passed,
    total,
    checks: evaluated
  };
}

function qualityStatusToScore(status) {
  if (status === "pass") return 100;
  if (status === "fail") return 0;
  return 0;
}

function buildCharacteristic(name, weight, threshold, score, metrics) {
  const roundedScore = round(score);
  return {
    name,
    weight,
    threshold,
    score: roundedScore,
    status: roundedScore >= threshold ? "pass" : "fail",
    metrics
  };
}

function buildMarkdownReport(scorecard) {
  const lines = [];
  lines.push(`# SQuaRE Scorecard - ${scorecard.metadata.reportDate}`);
  lines.push("");
  lines.push("## Metadados");
  lines.push("");
  lines.push(`- modo: \`${scorecard.metadata.mode}\``);
  lines.push(`- execucao: \`${scorecard.metadata.evaluationTimestamp}\``);
  lines.push(`- branch: \`${scorecard.metadata.branch || "n/a"}\``);
  lines.push(`- commit: \`${scorecard.metadata.commit || "n/a"}\``);
  lines.push(`- mobile esperado no gate: \`${scorecard.metadata.expectMobile ? "sim" : "nao"}\``);
  lines.push("");
  lines.push("## Resultado geral");
  lines.push("");
  lines.push(`- score ponderado: **${scorecard.overall.weightedScore}**`);
  lines.push(`- threshold global: **${scorecard.overall.threshold}**`);
  lines.push(`- gate final: **${scorecard.gateResult.status.toUpperCase()}**`);
  lines.push("");
  lines.push("## Caracteristicas (ISO/IEC 25010)");
  lines.push("");
  lines.push("| Caracteristica | Peso | Score | Threshold | Status |");
  lines.push("|---|---:|---:|---:|---|");

  for (const characteristic of scorecard.characteristics) {
    lines.push(
      `| ${characteristic.name} | ${characteristic.weight}% | ${characteristic.score} | ${characteristic.threshold} | ${characteristic.status.toUpperCase()} |`
    );
  }

  lines.push("");
  lines.push("## Resumo de evidencias");
  lines.push("");
  lines.push(`- API log: \`${scorecard.evidencePaths.apiLog || "n/a"}\``);
  lines.push(`- UI log: \`${scorecard.evidencePaths.uiLog || "n/a"}\``);
  lines.push(`- Mobile log: \`${scorecard.evidencePaths.mobileLog || "n/a"}\``);
  lines.push(`- Perf login summary: \`${scorecard.evidencePaths.perfLoginSummary || "n/a"}\``);
  lines.push(`- Perf catalog summary: \`${scorecard.evidencePaths.perfCatalogSummary || "n/a"}\``);
  lines.push(`- Environment log: \`${scorecard.evidencePaths.envLog || "n/a"}\``);

  return `${lines.join("\n")}\n`;
}

function main() {
  const args = parseCliArgs(process.argv.slice(2));

  const runPath = args.runPath || process.env.SQUARE_RUN_PATH || inferLatestRunPath();
  const outputDir = args.outputDir || process.env.SQUARE_OUTPUT_DIR || "reports/square";
  const reportDate = args.reportDate || process.env.SQUARE_REPORT_DATE || toLocalDateString();
  const expectMobile = parseBoolean(
    args.expectMobile !== undefined ? args.expectMobile : process.env.SQUARE_EXPECT_MOBILE,
    false
  );

  const resolvedApiLogPath =
    args.apiLogPath ||
    process.env.SQUARE_API_LOG_PATH ||
    (runPath ? path.join(runPath, "logs", "02-api-all.log") : "");
  const resolvedUiLogPath =
    args.uiLogPath ||
    process.env.SQUARE_UI_LOG_PATH ||
    (runPath ? path.join(runPath, "logs", "01-ui.log") : "");
  const resolvedMobileLogPath =
    args.mobileLogPath ||
    process.env.SQUARE_MOBILE_LOG_PATH ||
    (runPath ? path.join(runPath, "logs", "03-mobile-smoke.log") : "");
  const resolvedPerfLoginSummaryPath =
    args.perfLoginSummaryPath ||
    process.env.SQUARE_PERF_LOGIN_SUMMARY_PATH ||
    (runPath ? path.join(runPath, "artifacts", "login-summary.json") : "");
  const resolvedPerfCatalogSummaryPath =
    args.perfCatalogSummaryPath ||
    process.env.SQUARE_PERF_CATALOG_SUMMARY_PATH ||
    (runPath ? path.join(runPath, "artifacts", "catalog-summary.json") : "");
  const resolvedEnvLogPath =
    args.envLogPath ||
    process.env.SQUARE_ENV_LOG_PATH ||
    (runPath ? path.join(runPath, "logs", "00-environment.txt") : "");

  const apiLogText = readTextIfExists(resolvedApiLogPath);
  const uiLogText = readTextIfExists(resolvedUiLogPath);
  const mobileLogText = readTextIfExists(resolvedMobileLogPath);
  const envLogText = readTextIfExists(resolvedEnvLogPath);

  const perfLoginSummary = readJsonIfExists(resolvedPerfLoginSummaryPath);
  const perfCatalogSummary = readJsonIfExists(resolvedPerfCatalogSummaryPath);

  const apiStatus = normalizeStatus(process.env.SQUARE_API_STATUS) !== "na"
    ? normalizeStatus(process.env.SQUARE_API_STATUS)
    : parseStatusFromLog(apiLogText);
  const uiStatus = normalizeStatus(process.env.SQUARE_UI_STATUS) !== "na"
    ? normalizeStatus(process.env.SQUARE_UI_STATUS)
    : parseStatusFromLog(uiLogText);
  const mobileStatus = normalizeStatus(process.env.SQUARE_MOBILE_STATUS) !== "na"
    ? normalizeStatus(process.env.SQUARE_MOBILE_STATUS)
    : parseStatusFromLog(mobileLogText);
  const perfStatus = normalizeStatus(process.env.SQUARE_PERF_STATUS) !== "na"
    ? normalizeStatus(process.env.SQUARE_PERF_STATUS)
    : (perfLoginSummary || perfCatalogSummary ? "pass" : "na");

  const envMap = {};
  if (envLogText) {
    for (const line of envLogText.split(/\r?\n/)) {
      const [key, ...rest] = line.split("=");
      if (!key || rest.length === 0) continue;
      envMap[key.trim()] = rest.join("=").trim();
    }
  }

  const apiMetrics = parseApiMetrics(apiLogText, apiStatus);
  const loginPerf = parsePerfScenario(perfLoginSummary);
  const catalogPerf = parsePerfScenario(perfCatalogSummary);
  const assertionIndicator = hasAssertionIndicators();
  const maintainabilityChecklist = evaluateMaintainabilityChecklist();

  const perfScores = [loginPerf.scenarioScore, catalogPerf.scenarioScore].filter((value) =>
    Number.isFinite(value)
  );
  const perfScore = perfScores.length > 0 ? perfScores.reduce((sum, value) => sum + value, 0) / perfScores.length : qualityStatusToScore(perfStatus);

  const perfFailureRates = [loginPerf.httpReqFailedRate, catalogPerf.httpReqFailedRate]
    .filter((value) => Number.isFinite(value))
    .map((value) => value / 100);
  const avgPerfFailureRate =
    perfFailureRates.length > 0 ? perfFailureRates.reduce((sum, value) => sum + value, 0) / perfFailureRates.length : perfStatus === "pass" ? 0 : 1;

  const apiScore = apiMetrics.qualityScore;
  const uiScore = qualityStatusToScore(uiStatus);
  const mobileScore = qualityStatusToScore(mobileStatus);

  let functionalScore = 0;
  if (expectMobile) {
    functionalScore =
      (apiScore * 0.4) + (uiScore * 0.25) + (mobileScore * 0.25) + (assertionIndicator.score * 0.1);
  } else {
    functionalScore = (apiScore * 0.5) + (uiScore * 0.35) + (assertionIndicator.score * 0.15);
  }

  let reliabilityBase = 0;
  if (expectMobile) {
    reliabilityBase =
      (qualityStatusToScore(apiStatus) * 0.45) +
      (qualityStatusToScore(uiStatus) * 0.25) +
      (qualityStatusToScore(mobileStatus) * 0.1) +
      ((1 - avgPerfFailureRate) * 100 * 0.2);
  } else {
    reliabilityBase =
      (qualityStatusToScore(apiStatus) * 0.5) +
      (qualityStatusToScore(uiStatus) * 0.3) +
      ((1 - avgPerfFailureRate) * 100 * 0.2);
  }
  const envSkipPenalty = Math.min(apiMetrics.envSkipCount * 5, 20);
  const reliabilityScore = clamp(reliabilityBase - envSkipPenalty);

  const efficiencyScore = clamp(perfScore);

  const requiredPlatforms = [
    { id: "api", status: apiStatus, required: true },
    { id: "ui", status: uiStatus, required: true },
    { id: "performance", status: perfStatus, required: true },
    { id: "mobile", status: mobileStatus, required: expectMobile }
  ].filter((item) => item.required);
  const platformPassCount = requiredPlatforms.filter((item) => item.status === "pass").length;
  const compatibilityScore = requiredPlatforms.length > 0 ? (platformPassCount / requiredPlatforms.length) * 100 : 0;

  const usabilityScore = expectMobile
    ? (uiScore * 0.5) + (mobileScore * 0.2) + (assertionIndicator.score * 0.3)
    : (uiScore * 0.7) + (assertionIndicator.score * 0.3);

  const maintainabilityScore = maintainabilityChecklist.score;

  const characteristics = [
    buildCharacteristic("Adequacao funcional", 30, 85, functionalScore, {
      apiScore,
      uiScore,
      mobileScore: expectMobile ? mobileScore : null,
      assertionIndicatorScore: assertionIndicator.score
    }),
    buildCharacteristic("Confiabilidade", 20, 80, reliabilityScore, {
      apiStatus,
      uiStatus,
      mobileStatus: expectMobile ? mobileStatus : "na",
      avgPerformanceFailureRate: round(avgPerfFailureRate * 100),
      envSkipCount: apiMetrics.envSkipCount,
      envSkipPenalty
    }),
    buildCharacteristic("Eficiencia de desempenho", 20, 70, efficiencyScore, {
      loginScenarioScore: loginPerf.scenarioScore,
      catalogScenarioScore: catalogPerf.scenarioScore,
      perfStatus
    }),
    buildCharacteristic("Compatibilidade", 10, 80, compatibilityScore, {
      requiredPlatforms: requiredPlatforms.map((item) => `${item.id}:${item.status}`),
      passedPlatforms: platformPassCount,
      totalRequired: requiredPlatforms.length
    }),
    buildCharacteristic("Usabilidade", 10, 75, usabilityScore, {
      uiStatus,
      mobileStatus: expectMobile ? mobileStatus : "na",
      assertionIndicatorScore: assertionIndicator.score
    }),
    buildCharacteristic("Manutenibilidade", 10, 80, maintainabilityScore, {
      checklistPassed: maintainabilityChecklist.passed,
      checklistTotal: maintainabilityChecklist.total
    })
  ];

  const weightedScore = characteristics.reduce(
    (acc, characteristic) => acc + (characteristic.score * (characteristic.weight / 100)),
    0
  );

  const allCharacteristicsPassing = characteristics.every((characteristic) => characteristic.status === "pass");
  const overallPassing = round(weightedScore) >= 80;
  const gatePassed = allCharacteristicsPassing && overallPassing;

  const scorecard = {
    metadata: {
      reportDate,
      evaluationTimestamp: new Date().toISOString(),
      mode: args.gate ? "gate" : "evaluate",
      branch: envMap.BRANCH || process.env.GITHUB_REF_NAME || "",
      commit: envMap.COMMIT || process.env.GITHUB_SHA || "",
      expectMobile,
      executionStatus: {
        api: apiStatus,
        ui: uiStatus,
        mobile: expectMobile ? mobileStatus : "na",
        performance: perfStatus
      }
    },
    standards: {
      model: "ISO/IEC 25010",
      metrics: "ISO/IEC 25023",
      evaluationProcess: "ISO/IEC 25040"
    },
    characteristics,
    overall: {
      weightedScore: round(weightedScore),
      threshold: 80,
      status: gatePassed ? "pass" : "fail"
    },
    gateResult: {
      status: gatePassed ? "pass" : "fail",
      reasons: gatePassed
        ? ["Todos os thresholds de caracteristicas e score global foram atendidos."]
        : [
            "Pelo menos uma caracteristica ficou abaixo do threshold definido.",
            "Ou o score ponderado global ficou abaixo de 80."
          ]
    },
    evidencePaths: {
      runPath: runPath || null,
      apiLog: fileExists(resolvedApiLogPath) ? resolvedApiLogPath : null,
      uiLog: fileExists(resolvedUiLogPath) ? resolvedUiLogPath : null,
      mobileLog: fileExists(resolvedMobileLogPath) ? resolvedMobileLogPath : null,
      perfLoginSummary: fileExists(resolvedPerfLoginSummaryPath) ? resolvedPerfLoginSummaryPath : null,
      perfCatalogSummary: fileExists(resolvedPerfCatalogSummaryPath) ? resolvedPerfCatalogSummaryPath : null,
      envLog: fileExists(resolvedEnvLogPath) ? resolvedEnvLogPath : null
    },
    details: {
      apiMetrics,
      performance: {
        login: loginPerf,
        catalog: catalogPerf
      },
      assertionIndicator,
      maintainabilityChecklist
    }
  };

  fs.mkdirSync(outputDir, { recursive: true });
  const jsonPath = path.join(outputDir, `scorecard-${reportDate}.json`);
  const mdPath = path.join(outputDir, `scorecard-${reportDate}.md`);

  fs.writeFileSync(jsonPath, `${JSON.stringify(scorecard, null, 2)}\n`);
  fs.writeFileSync(mdPath, buildMarkdownReport(scorecard));

  console.log(`[SQuaRE] JSON: ${jsonPath}`);
  console.log(`[SQuaRE] MD: ${mdPath}`);
  console.log(`[SQuaRE] Gate: ${scorecard.gateResult.status.toUpperCase()} | Score global: ${scorecard.overall.weightedScore}`);

  if (args.gate && !gatePassed) {
    process.exit(2);
  }
}

main();
