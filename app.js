// PEGANDO OS ELEMENTOS DO HTML
const board = document.querySelector(".Mesaboard");
const score = document.querySelector(".MesaScore");
const btnRestart = document.querySelector("#btn-restart");

// NOSSOS PARES INICIAIS
let initialPairs = ["1", "1", "2", "5", "3", "3", "4", "4", "5", "6", "6", "2"];

// PARES QUE SELECIONAMENOS
let selectedCards = [];

// CONTADOR DE PONTOS
let scoreCount = 0;

// FUNCAO QUE VAI CARREGAR NOSSO JOGO
const load = () => {
  //RESENTANDO AS VARIAVEIS
  scoreCount = 0;
  selectedCards = [];

  // PEGANDO OS PARES EMBARALHADOS DA FUNCAO
  const sufflePairs = suffle(initialPairs);

  // SE TIVER O TABULEIRO NA TELA, REMOVE ELE
  while (board.firstChild) {
    board.firstChild.remove();
  }

  // CRIAR AS CARTAS NO TABULEIRO
  createCards(sufflePairs);
};

// FUNCAO QUE EMBARALHA AS CARTAS
const suffle = (pairs) => {
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }

  return pairs;
};

// FUNCAO QUE ADICIONA E CRIA AS CARTAS NA TELA
const createCards = (pairs) => {
  pairs.forEach((pair) => {
    const card = document.createElement("div");

    card.className = "boardCard";
    card.dataset.value = pair;
    card.innerText = pair;

    card.addEventListener("click", itIsAMatch);

    board.append(card);
  });
};

// FUNCAO QUE VERIFICA SE OS PARES SAO IGUAIS
const itIsAMatch = (value) => {
  const clickedCard = value.target;

  // VERIFICA SE A CARTA FOI SELECIONADA
  if (clickedCard.classList.contains("open")) {
    return;
  }

  // VIRA A CARTA
  clickedCard.classList.toggle("open");

  // ADICIONA A CARTA NO NOSSO ARRAY = NOSSA MAO
  selectedCards.push(clickedCard);

  if (selectedCards.length > 1) {
    // EXTRAI DO ARRAY AS DUAS PRIMEIRAS POSICOES OU CARTAS
    const [firstCard, secondCard] = [...selectedCards];

    if (firstCard.dataset.value === secondCard.dataset.value) {
      scoreCount = scoreCount + 1;

      score.innerText = `score: ${scoreCount}`;

      selectedCards = [];
    } else {
      selectedCards = [];

      setTimeout(() => {
        firstCard.classList.toggle("open");
        secondCard.classList.toggle("open");
      }, 800);
    }
  }
};

// CARREGA O NOSSO JOGO
load();

// ADICIONA O EVENTO NO BOTAO DE RESTART
btnRestart.addEventListener("click", load);
