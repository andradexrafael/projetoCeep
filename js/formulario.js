(() => {
  const formulario = document.querySelector(".formNovoCartao");
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const textArea = formulario.querySelector("textarea");
    if (textArea.value.trim() === "") {
      moduloNotificacao.notificar("Por favor, preencha o campo!");
      textArea.focus();
    } else {
      // cria um cartão novo no mural
      moduloMural.adicionarCartao(textArea.value);
      moduloSync.sincronizar();
      textArea.value = "";
    }
  });
})();
