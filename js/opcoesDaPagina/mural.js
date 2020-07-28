const moduloMural = (function () {
  const mural = document.querySelector(".mural");
  const templateCartao = document.querySelector("#template-cartao").innerHTML;

  //Exclusão de cartões

  mural.addEventListener("click", (event) => {
    if (event.target.classList.contains("opcoesDoCartao-remove")) {
      // se tem a classe, então é o botão de remoção
      const cartao = event.target.parentElement.parentElement;
      cartao.classList.add("cartao--some");
      cartao.addEventListener("transitionend", () => {
        cartao.remove();
        moduloSync.sincronizar();
      });
    }
  });
  //Mudança da cor do cartão

  mural.addEventListener("change", (event) => {
    const cartao = event.target.parentElement.parentElement;
    cartao.style.backgroundColor = event.target.value;
    moduloSync.sincronizar();
  });
  //mudança de cor do cartão via teclado

  mural.addEventListener("keypress", (event) => {
    let isLabel = event.target.classList.contains("opcoesDoCartao-tipo");
    if (isLabel && (event.key === " " || event.key === "Enter")) {
      // Dá um clique  o label atual que ativa o evento change
      // que muda a cor do cartão
      event.target.click();
    }
  });
  /**
   * Muda o layout do mural exibindo os cartões como BLOCOS ou em LINHAS
   * @returns {void}
   */

  function mudarLayout() {
    mural.classList.toggle("mural--linha");
  }
  /**
   * Função que cria cartões no mural
   * @param {string} conteudo Conteúdo que será adicionado no cartão
   * @param {string} cor Cor a ser aplicada como fundo do cartão
   * @returns {void}
   */
  let numeroCartao = 0;

  function adicionarCartao(conteudo, cor = "") {
    numeroCartao++;
    const cartao = document.createElement("article");
    cartao.style.backgroundColor = cor;
    cartao.classList.add("cartao");
    cartao.tabIndex = 0;
    cartao.innerHTML = templateCartao
      .replace("{{CONTEUDO_CARTAO}}", conteudo)
      .replace(/{{NUMERO_CARTAO}}/g, numeroCartao);
    mural.append(cartao);
  }

  /**
   * Retorna uma lista de objetos contendo o cnteúdo e a cor de cada cartão
   * @returns {Array<Object>}
   */
  function getCartoes() {
    const cartoes = mural.querySelectorAll(".cartao");
    const listaCartoes = Array.from(cartoes).map((cartao) => {
      return {
        conteudo: cartao.querySelector(".cartao-conteudo").textContent,
        cor: cartao.style.backgroundColor,
      };
    });
    //console.log(listaCartoes);
    return listaCartoes;
  }

  //AJAX COM JQUERY

  let urlGet = "https://ceep.herokuapp.com/cartoes/carregar";
  $.get(
    urlGet,
    { usuario: "rafaelvsandrade@gmail.com" },
    (dadosServidor) => {
      console.log(dadosServidor);
      dadosServidor.cartoes.forEach((cartao) => {
        adicionarCartao(cartao.conteudo, cartao.cor);
      });
    },
    "json"
  );

  // retornar um objeto com tudo o que deve ser público (acessível) deste módulo em questão
  return {
    mudarLayout,
    adicionarCartao,
    getCartoes,
  };
})();
