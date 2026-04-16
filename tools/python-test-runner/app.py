from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
import subprocess

import streamlit as st


@dataclass(frozen=True)
class Suite:
    key: str
    name: str
    command: str
    description: str


REPO_ROOT = Path(__file__).resolve().parents[2]
RUNNER_REPORTS_DIR = REPO_ROOT / "reports" / "runner"

SUITES = [
    Suite(
        key="ui",
        name="UI (Cypress)",
        command="npm run test:ui",
        description="Executa a automacao web E2E.",
    ),
    Suite(
        key="api",
        name="API (Supertest/Jest)",
        command="npm run test:api",
        description="Executa cenarios de cupons e contratos da API.",
    ),
    Suite(
        key="mobile",
        name="Mobile Android Smoke (Appium)",
        command="npm run test:mobile:smoke",
        description="Executa o smoke de catalogo no Android.",
    ),
    Suite(
        key="k6-login",
        name="Performance k6 - Login",
        command="npm run test:performance:login",
        description="Executa cenario de performance de login.",
    ),
    Suite(
        key="k6-catalog",
        name="Performance k6 - Catalogo",
        command="npm run test:performance:catalog",
        description="Executa cenario de performance de catalogo.",
    ),
]

SUITE_BY_KEY = {suite.key: suite for suite in SUITES}


def run_suite(suite: Suite, run_dir: Path) -> tuple[int, str]:
    output_lines: list[str] = []
    output_placeholder = st.empty()
    command_line = f"{suite.command}  (cwd={REPO_ROOT})"

    output_lines.append(f"$ {command_line}")
    output_placeholder.code("\n".join(output_lines), language="bash")

    process = subprocess.Popen(
        suite.command,
        cwd=REPO_ROOT,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="replace",
    )

    assert process.stdout is not None
    for line in process.stdout:
        output_lines.append(line.rstrip())
        output_placeholder.code("\n".join(output_lines[-300:]), language="bash")

    return_code = process.wait()
    output_text = "\n".join(output_lines) + "\n"

    log_file = run_dir / f"{suite.key}.log"
    log_file.write_text(output_text, encoding="utf-8")

    return return_code, output_text


def main() -> None:
    st.set_page_config(page_title="TCC-QE Test Runner", layout="wide")
    st.title("TCC-QE Test Runner")
    st.write(
        "Pagina Python para executar as suites de teste do projeto em sequencia, "
        "com logs salvos em `reports/runner/<timestamp>`."
    )

    st.info(
        "Antes da primeira execucao, garanta as dependencias instaladas: "
        "`npm ci`, `npm --prefix automation/UI ci`, `npm --prefix automation/API ci`, "
        "`npm --prefix automation/Mobile ci`."
    )

    default_selection = [suite.key for suite in SUITES]
    selected_suite_keys = st.multiselect(
        "Selecione as suites para executar",
        options=[suite.key for suite in SUITES],
        default=default_selection,
        format_func=lambda key: SUITE_BY_KEY[key].name,
    )

    for suite in SUITES:
        st.caption(f"{suite.name}: {suite.description}")

    col1, col2 = st.columns(2)
    run_selected = col1.button("Executar selecionadas", type="primary")
    run_all = col2.button("Executar tudo (UI + API + Mobile + k6)")

    if run_all:
        selected_suite_keys = default_selection
        run_selected = True

    if run_selected:
        if not selected_suite_keys:
            st.warning("Selecione pelo menos uma suite.")
            return

        RUNNER_REPORTS_DIR.mkdir(parents=True, exist_ok=True)
        run_id = datetime.now().strftime("%Y%m%d-%H%M%S")
        run_dir = RUNNER_REPORTS_DIR / run_id
        run_dir.mkdir(parents=True, exist_ok=True)

        st.write(f"Diretorio dos logs desta execucao: `{run_dir}`")

        summary: list[tuple[str, int]] = []
        for suite_key in selected_suite_keys:
            suite = SUITE_BY_KEY[suite_key]
            st.subheader(suite.name)
            return_code, _ = run_suite(suite, run_dir)
            summary.append((suite.name, return_code))

            if return_code == 0:
                st.success(f"{suite.name} finalizada com sucesso.")
            else:
                st.error(f"{suite.name} falhou com codigo {return_code}.")

        st.divider()
        st.subheader("Resumo")
        for name, code in summary:
            status = "OK" if code == 0 else f"FALHA ({code})"
            st.write(f"- {name}: {status}")

        if all(code == 0 for _, code in summary):
            st.success("Execucao concluida com sucesso para todas as suites selecionadas.")
        else:
            st.error("Execucao concluida com falhas. Consulte os logs no diretorio informado.")


if __name__ == "__main__":
    main()
