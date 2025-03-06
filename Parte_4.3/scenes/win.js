class Win extends Phaser.Scene {
    constructor() {
        super({ key: 'Win' });
    }
    preload() {
        // #01: PRÉ-CARREGA OS ARQUIVOS DO JOGO
        this.load.image('bgWin', 'assets/bg_win.png');
    }
    create() {
        // #02: BACKGROUND
        let bg = this.add.image(600, 300, 'bgWin'); // cria o background
        bg.setAlpha(0.4); // diminui a opacidade do background

        // #02.2: TÍTULO DA CENA
        this.add.text(480, 150, "Você GANHOU!", { // adiciona texto
            fontFamily: 'Segoe UI', // troca a fonte
            color: "#FFFFFF",  // coloca a cor no branco
            fontSize: 40, // tamanho da fonte
            fontStyle: "bold" // estilo da fonte
        });

        // 02.3: BOTÃO REPLAY
        this.replay = this.add.text(600, 380, 'Jogar Denovo', { // adiciona texto
            fontFamily: 'Segoe UI', // troca a fonte
            fontSize: 30, // tamanho da fonte
            color: '#000000', // coloca a cor no preto
            align: 'center', // alinha o texto no centro
            fixedWidth: 280, // largura do background do botão
            backgroundColor: '#BDECB6' // cor do background como vermelho
        }).setPadding(32).setOrigin(0.5).setInteractive(); // regula o espaçamento da caixa do botão com o texto, ponto de origem e deixa interativo.

        const addHoverEffect = (replay) => { // efeito de passar o mouse no botão replay
            replay.on('pointerover', () => { // se mouse esta em cima do botão
                this.tweens.add({ // animação do objeto (nesse caso para escala não subir bruscamente)
                    targets: replay, //objeto para animar
                    scale: 1.2, // progressão da escala
                    duration: 200, // duração
                    ease: 'Power2' // tipo da animação
                });
            });
            replay.on('pointerout', () => replay.setScale(1)); // se mouse sair do botão
        };

        addHoverEffect(this.replay); // adiciona o efeito de passar o mouse

        this.replay.on('pointerdown', () => { // transição de cena ao clicar no botão replay
            this.scene.start('Menu');
        });
    }
}