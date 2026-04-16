# Estrategia de Testes - EBAC Shop

## 1. Objetivo

Garantir a qualidade funcional e nao funcional do EBAC Shop com foco em risco de negocio, cobrindo planejamento, execucao, automacao e evidencia.

Objetivos de qualidade:

- reduzir regressao em fluxos criticos
- validar regras de negocio das historias priorizadas
- aumentar confiabilidade de entrega
- manter rastreabilidade entre requisito, caso de teste e automacao

## 2. Escopo

Funcionalidades principais:

- US-0001 Adicionar item ao carrinho
- US-0002 Login na plataforma
- US-0003 API de cupons
- Catalogo de produtos (web e mobile)
- Painel Minha Conta
- Meus Pedidos
- Enderecos
- Detalhes da Conta

Fora de escopo nesta entrega:

- testes de seguranca aprofundados (pentest)
- testes de carga de longa duracao
- cobertura iOS (documentada como evolucao futura)

## 3. Papeis e responsabilidades

- QA Engineer: estrategia, criterios, casos, automacao, evidencia e relatorio
- Desenvolvedor: correcao de defeitos e apoio tecnico
- Product Owner: validacao de regra de negocio e aceite funcional
- Stakeholder do projeto: aprovacao final do pacote de entrega

## 4. Fases de teste

1. Planejamento de teste e analise de risco
2. Definicao de criterios de aceitacao (Gherkin)
3. Modelagem de casos de teste
4. Automacao UI, API e Mobile
5. Execucao de regressao e performance
6. Consolidacao de evidencias e conclusoes

## 5. Tipos de teste

- funcional (web, api e mobile)
- regressao
- exploratorio
- contrato de API
- performance (k6)

## 6. Tecnicas de teste

- particao de equivalencia
- analise de valor limite
- tabela de decisao
- teste baseado em risco

Pontos de fronteira usados:

- quantidade por produto: 10 e 11
- valor de compra: 199.99, 200, 600, 600.01, 990, 990.01
- tentativas de login invalido: 2 e 3

## 7. Abordagem e padroes

Abordagem:

- manual para descoberta e validacao visual
- automatizada para regressao e repetibilidade

Padroes:

- UI: Page Object + App Actions
- API: Client/Service + Schema Contract Validation
- Mobile: Screen Object Pattern

## 8. Ambientes, ferramentas e plataformas

Ambientes:

- remoto: `http://lojaebac.ebaconline.art.br/`
- opcional local (docker): `http://localhost:80`

Ferramentas:

- UI: Cypress
- API: Supertest + Jest + AJV
- Mobile Android: Appium + WebdriverIO + Mocha + Allure
- Performance: k6
- CI: GitHub Actions

Plataformas:

- web
- api
- mobile (android)

## 9. Criterios de entrada e saida

Entrada:

- historias refinadas
- massa de dados definida
- ambiente acessivel

Saida:

- cenarios principais executados
- automacoes com evidencias
- contratos de API validados
- pipeline de CI configurado
- relatorio final e material textual do TCC atualizados
