# Resumo

Este trabalho apresenta uma estrategia completa de Engenharia de Qualidade para o sistema EBAC Shop, cobrindo planejamento, criterios de aceitacao, modelagem de casos de teste, automacao e integracao continua. O foco foi reduzir riscos nos fluxos criticos de negocio, especialmente autenticacao, carrinho e API de cupons, com governanca formal baseada em SQuaRE.

Foram aplicadas tecnicas como particao de equivalencia, valor limite e tabela de decisao para estruturar testes manuais e automatizados. A camada web foi automatizada com Cypress, a camada de API com Supertest e validacao de contrato por schema, e a camada mobile Android com Appium e WebdriverIO. Para desempenho, foram implementados dois cenarios com k6 usando 20 usuarios virtuais, execucao de 2 minutos e ramp-up de 20 segundos.

O projeto tambem inclui pipeline de GitHub Actions para execucao recorrente, publicacao de evidencias e gate de qualidade por scorecard SQuaRE (ISO/IEC 25010, ISO/IEC 25023 e ISO/IEC 25040). Como resultado, foi entregue uma base de qualidade rastreavel, reutilizavel e alinhada a praticas profissionais de QE, com decisao objetiva de GO/NO-GO.
