class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
    }
    preload() {
        // #01: PRÉ-CARREGA OS ARQUIVOS DO JOGO
        this.load.image('bgMenu', 'assets/bg_menu.png');
        this.load.image('playButton', 'assets/play.png');
        this.load.image('alert', 'assets/alert.png');
        this.load.image('star', 'assets/star.png');
    }

    create() {
        // #02: BACKGROUND
        let bg = this.add.image(600, 300, 'bgMenu').setScale(0.2); // cria o background
        bg.setAlpha(0.4); // diminui a opacidade do background

        // #02.1: TÍTULO DO JOGO
        this.add.text(480, 150, "Dog's Game", { // adiciona texto
            fontFamily: 'Segoe UI', // troca a fonte
            color: "#FFFFFF", // coloca a cor no branco
            fontSize: 40, // tamanho da fonte
            fontStyle: "bold" // estilo da fonte
        });

        // #02.2: CONTROLES DO JOGO 
        this.add.text(30, 400, "Controles do jogo:", { // adiciona texto
            fontFamily: 'Segoe UI', // troca a fonte
            color: "#FFFFFF", // coloca a cor no branco
            fontSize: 30, // tamanho da fonte
            fontStyle: "bold" // estilo da fonte
        });

        this.add.text(30, 450, "seta esquerda/A - movimentar para esquerda", { // adiciona texto
            fontFamily: 'Segoe UI', // troca a fonte
            color: "#FFFFFF",  // coloca a cor no branco
            fontSize: 20, // tamanho da fonte
            backgroundColor: '#000000' // fundo preto
        });

        this.add.text(30, 490, "seta direita/D - movimentar para direita", { // adiciona texto
            fontFamily: 'Segoe UI', // troca a fonte
            color: "#FFFFFF",  // coloca a cor no branco
            fontSize: 20, // tamanho da fonte
            backgroundColor: '#000000' // fundo preto
        });

        this.add.text(30, 530, "seta para cima/W - movimentar para cima (pular)", { // adiciona texto
            fontFamily: 'Segoe UI', // troca a fonte
            color: "#FFFFFF",  // coloca a cor no branco
            fontSize: 20, // tamanho da fonte
            backgroundColor: '#000000' // fundo preto
        });

        // #02.3: INSTRUÇÕES DO JOGO 
        this.add.text(700, 400, "Instruções do jogo:", { // adiciona texto
            fontFamily: 'Segoe UI', // troca a fonte
            color: "#FFFFFF", // coloca a cor no branco
            fontSize: 30, // tamanho da fonte
            fontStyle: "bold" // estilo da fonte
        });
        this.add.text(740, 460, "- Não encoste em objetos com este símbolo", { // adiciona texto
            fontFamily: 'Segoe UI', // troca a fonte
            color: "#FFFFFF",  // coloca a cor no branco
            fontSize: 20, // tamanho da fonte
            backgroundColor: '#000000' // fundo preto
        });

        this.add.image(710, 470, 'alert').setScale(0.2); // adiciona a imagem do alerta

        this.add.text(740, 520, "- Encontre sua Dona, ela terá este simbolo", { // adiciona texto e faz uma quebra de linha com '\n'
            fontFamily: 'Segoe UI', // troca a fonte
            color: "#FFFFFF", // coloca a cor no branco
            fontSize: 20, // tamanho da fonte
            backgroundColor: '#000000' // fundo preto
        });
        this.add.image(710, 530, 'star').setScale(0.15); // adiciona a imagem da estrela

        // 02.4: BOTÃO PLAY
        this.start = this.add.image(600, 300, 'playButton').setInteractive();  // cria imagem do botão play e define que é interativo
        const addHoverEffect = (start) => { // adiciona efeito em algo 9nesse caso o objeto (start)
            start.on('pointerover', () => { // se mouse esta em cima do botão fazer o que está abaixo:
                this.tweens.add({ // animação do objeto (nesse caso para escala não subir bruscamente)
                    targets: start, //objeto para animar
                    scale: 1.2, // progressão da escala
                    duration: 200, // duração
                    ease: 'Power2' // tipo da animação
                });
            });
            start.on('pointerout', () => start.setScale(1)); // se mouse sair do botão voltar a escala
        };

        addHoverEffect(this.start); // adiciona o efeito de passar o mouse

        this.start.on('pointerdown', () => { // transição de cena ao clicar no botão play
            this.scene.start('Game');
        });
    }
}