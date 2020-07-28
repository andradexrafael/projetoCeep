const moduloNotificacao = (function () {
  /**
   * Função que exibe mensagem para o usuário na tela
   * @param {string} mensagem Mensagem a ser exibida na notificação
   * @returns {void}
   */

  function notificar(mensagem) {
    const msg = document.createElement("div");
    msg.classList.add("formNovoCartao-msg");
    msg.textContent = mensagem;
    document.body.append(msg);
    msg.addEventListener("animationend", () => msg.remove());
  }

  return {
    notificar,
  };
})();
