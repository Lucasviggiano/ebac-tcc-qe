# Comparativo de ferramentas e linguagem para automacao UI

## Objetivo

Justificar a escolha da stack de automacao web para o projeto TCC-EBAC-QE.

## Opcoes avaliadas

| Opcao | Linguagem | Vantagens | Desvantagens |
|---|---|---|---|
| Cypress | JavaScript | setup rapido, boa DX, debug facil, excelente para E2E web | limitado para multiplas abas e cenarios fora do browser |
| Playwright | TypeScript/JavaScript | multiplos browsers, recursos avancados, auto-wait robusto | maior curva inicial para quem esta iniciando |
| Selenium WebDriver | Java/JS/Python/C# | ecossistema maduro e suporte amplo | manutencao mais custosa e maior boilerplate |

## Decisao

Escolha: **Cypress com JavaScript**.

## Justificativa

- melhor relacao entre velocidade de implementacao e qualidade para o escopo do TCC
- integra bem com Page Object e App Actions
- facilita demonstracao para banca com evidencias (video/screenshot)
- equipe e contexto academico com curva de aprendizado menor
