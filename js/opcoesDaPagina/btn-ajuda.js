(() => {
  const btn = document.querySelector("#btnAjuda");
  btn.addEventListener("click", async () => {
    const resposta = await fetch(
      "https://ceep.herokuapp.com/cartoes/instrucoes"
    );
    const ajudas = await resposta.json();
    console.log(ajudas);
    ajudas.instrucoes.forEach((ajuda) =>
      moduloMural.adicionarCartao(ajuda.conteudo, ajuda.cor)
    );
  });
})();
