let jogadorAtual = 'X'; //variável que armazena o símbolo que começa o jogo(jogador que vai começar)
let jogoAtivo = true; //me indica se o jogo está ativo ou não,controlando o game
const celulas = document.querySelectorAll('.celulas'); /**aqui estou selecionando todas as células do tabuleiro
e armazenando para poder usar dentro das funções de uma forma mais rápida. Estou colocando elas numa espécie de 
lista. */

function fazerJogada(celula) {/**essa função é resposável por uma verificação e recebe como parâmetro uma célula. Essa
    função que me retornará se aquela célula pode ser clicada ou não e o que vai acontecer quando ela for clicada*/

    /**quando você vai definir uma função e deseja que ela receba dados, você precisa definir parâmetros nessa função, 
     * um ou mais parâmetros. Uma forma de dizer que aquela função só funciona se receber determinadas informações 
     * (parâmetros) */
    if (!jogoAtivo || celula.textContent) return; 
    //se o jogo ão estiver ativo ou a célula já estiver preenchida, não vai acontecer nada quando eu clicar(return)

    celula.textContent = jogadorAtual;
    //caso o contrário, define a célula clicada como o jogador atual (x ou o)
    verificarResultado(); //chama a função para verificar se alguém ganhou empatou

    if (jogoAtivo) { //se o jogo estiver ativo(true)
        document.getElementById('iniciar').style.display = 'none'; //escondendo o botão de iniciar
        if (jogadorAtual === 'X') { //se o jogador atual for o X
            jogadorAtual = 'O'; //a próxima jogada será com o jogador O 
        } else {
            jogadorAtual = 'X'; //caso o contrário, mudo para o jogador X
        }
    } // aqui estou basicamente alternando os jogadores quando o tabuleiro for clicado
}

function mostrarMensagem(mensagem) { //função de mostrar a mensagem de vitória ou empate
    const elementoMensagem = document.querySelector('.mensagem'); 
    //localizo o elemento no html usando a classe e armazeno dentro de uma varíavel
    elementoMensagem.textContent = mensagem;
    //defino o conteúdo dessa varíavel(ou seja, o texto) como a mensagem que deverá aparecer
    elementoMensagem.style.display = 'block'; //defino o display como block para que a mensagem apareça
}


function verificarResultado() {
    //verificando o resultado do jogo com base nas posições do tabuleiro, assumindo o mesmo como uma grade 3x3
    const combinacoesVencedoras = [ /**um array de sub-arrays, ou seja, cada elemento desse array também será um array
        representando cada linha do tabuleiro, ou mais especificamente, as combinações baseadas na posição de cada célula
        que podem gerar um vencedor.*/
        [0, 1, 2], // Linha superior 
        [3, 4, 5], // Linha do meio
        [6, 7, 8], // Linha inferior
        [0, 3, 6], // Coluna esquerda
        [1, 4, 7], // Coluna do meio
        [2, 5, 8], // Coluna direita
        [0, 4, 8], // Diagonal principal
        [2, 4, 6]  // Diagonal secundária
    ];


    //iniciando a verificação para checar se alguém ganhou
    for (let i = 0; i < combinacoesVencedoras.length; i++) { //estou percorrendo todas as combinações possíveis
        const [a, b, c] = combinacoesVencedoras[i];
        /**aqui estou armazenando o valor das células e verificando o indíce delas no array das 
         * combinações. Em 'combinaçõesVencedoras' os arrays são de 3 números, portanto, estou pegando cada um desses 
         * números e armazenando nas variáveis 'a,b,c'
         * Estou desestruturando esse array e colocando os 3 valores de cada sub-array dentro de uma variável. Se o indice
         * for 0, ele vai desestruturar o primeiro sub array. E assim por diante.
         * Destruturação é extrair valores de um array e atribuí-los de forma mais fácil
         */
        const conteudoA = celulas[a].textContent;
        const conteudoB = celulas[b].textContent;
        const conteudoC = celulas[c].textContent;
        /**aqui estou verificando o que está escrito em cada célula. 'celulas' é a lista com todas as células do
         * tabuleiro, nesse caso estou dizendo que o contéudo é igual ao indice de acordo com as outras varíaveis que eu
         * criei [a,b,c]
         */ 

        if (conteudoA && conteudoA === conteudoB && conteudoA === conteudoC) {
            /**aqui estou verificando primeiro se 'conteudoA' está vazio, depois comparando o conteudoA com o conteudo B
             * e posteriormente com o conteúdo C. Para que um jogador ganhe, as 3 células devem estar preenchidas e com 
             * o mesmo conteúdo
             */
            mostrarMensagem('Jogador ' + conteudoA + ' ganhou!');
            //mensagem que deve me mostrar qual jogador ganhou, concatenando a string com o conteudoA
            jogoAtivo = false; //desativando o jogo para que nenhuma outra célula possa ser clicada
            document.getElementById('limparTabuleiro').style.display = 'block'; 
            //mostrando o botão para limpar o tabuleiro
            return; //encerrando a função
        }
    }

    //verificando se teve empate ou não
    let empate = true;
    for (let i = 0; i < celulas.length; i++) { //esse loop é reponsável por percorrer cada uma das células do tabuleiro
        if (celulas[i].textContent === '') { // se alguma célula ainda estiver vazia(sem contéudo)
            empate = false; //o jogo ainda está acontecendo, logo, não tem como ter empate. Defino empate como 'false'
        }
    }

    if (empate) { /**agora, se as células estiverem todas preenchidas e nenhum jogador conseguiu uma combinação vencedora,
        empate é 'true' */
        mostrarMensagem('Empate!'); //mostra a mensagem de empate
        jogoAtivo = false; //desativo o jogo
        document.getElementById('limparTabuleiro').style.display = 'block'; //exibo o botão de limpar tabuleiro
    }
}

//função de reiniciar o jogo
function reiniciarJogo() { 
    for (let i = 0; i < celulas.length; i++) { //estou usando o loop novamente para percorrer as células
        celulas[i].textContent = ''; //limpando o conteúdo de cada célula usando o indice e definindo como vazio
    }
    jogadorAtual = 'X'; //volto a definir o jogador inicial como X
    jogoAtivo = true; //defino o jogo como ativo novamente
    document.querySelector('.mensagem').style.display = 'none'; //escondo a mensagem do vencedor
    document.getElementById('limparTabuleiro').style.display = 'none'; //escondo o botão de limpar o tabuleiro
    document.getElementById('iniciar').style.display = 'block'; //mostro o botão de iniciar o jogo
}

