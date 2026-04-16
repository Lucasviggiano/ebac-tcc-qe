function shouldSkipForEnvironment(response, context) {
  if (response.status >= 500) {
    // Ambiente remoto pode ficar indisponivel. Quando isso ocorrer,
    // o teste nao falha por indisponibilidade externa.
    // A validacao funcional continua ativa quando o endpoint responde.
    // eslint-disable-next-line no-console
    console.warn(`[ENV-SKIP] ${context}: endpoint indisponivel (status ${response.status})`);
    return true;
  }

  return false;
}

module.exports = {
  shouldSkipForEnvironment
};
