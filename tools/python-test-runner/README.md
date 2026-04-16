# Python Test Runner (Streamlit)

Pagina Python para orquestrar as suites de teste do projeto:

- UI (Cypress)
- API (Supertest/Jest)
- Mobile Android Smoke (Appium)
- k6 Login
- k6 Catalogo

## 1. Instalar dependencia da pagina

```powershell
py -3 -m pip install -r tools/python-test-runner/requirements.txt
```

## 2. Abrir a pagina

```powershell
py -3 -m streamlit run tools/python-test-runner/app.py
```

## 3. Como usar

1. Selecione as suites desejadas.
2. Clique em `Executar selecionadas` ou `Executar tudo`.
3. Acompanhe os logs em tempo real na propria pagina.

Os logs ficam salvos em:

- `reports/runner/<timestamp>/`
