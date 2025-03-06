class Lose extends Phaser.Scene {
    constructor() {
        super({ key: 'Lose' });
    }
    preload() {
        // #01: PRÉ-CARREGA OS ARQUIVOS DO JOGO
        this.load.image('bgLost', 'assets/bg_lost.png');
        this.load.image('alerta', 'assets/alert.png');
    }
    create() {
        // #02: BACKGROUND
        let bg = this.add.image(600, 300, 'bgLost').setScale(4); // cria o background
        bg.setAlpha(0.4); // diminui a opacidade do background

        // #02.1: TÍTULO DA CENA
        this.add.text(480, 150, "Você PERDEU!", { // adiciona texto
            fontFamily: 'Segoe UI', // troca a fonte
            color: "#FFFFFF",  // coloca a cor no branco
            fontSize: 40, // tamanho da fonte
            fontStyle: "bold" // estilo da fonte
        });

        // #02.2: NOTAS
        this.add.image(900, 270, 'alerta').setScale(0.2); // adiciona imagem
        this.add.text(200, 250, "Não encoste em objetos com este símbolo:", { // adiciona texto
            fontFamily: 'Arial', // troca a fonte
            color: "#FFFFFF", // coloca a cor no branco
            fontSize: 35, // tamanho da fonte
        });

        // 02.3: BOTÃO RESTART
        this.restart = this.add.text(600, 380, 'REINICIAR', { // adiciona texto
            fontFamily: 'Segoe UI', // troca a fonte
            fontSize: 30, // tamanho da fonte
            color: '#000000', // coloca a cor no preto
            align: 'center', // alinha o texto no centro
            fixedWidth: 200, // largura do background do botão
            backgroundColor: '#FF0000' // cor do background como vermelho
        }).setPadding(32).setOrigin(0.5).setInteractive(); // regula o espaçamento da caixa do botão com o texto, ponto de origem e deixa interativo.

        const addHoverEffect = (restart) => { // efeito de passar o mouse no botão restart
            restart.on('pointerover', () => { // se mouse esta em cima do botão
                this.tweens.add({ // animação do objeto (nesse caso para escala não subir bruscamente)
                    targets: restart, //objeto para animar
                    scale: 1.2, // progressão da escala
                    duration: 200, // duração
                    ease: 'Power2' // tipo da animação
                });
            });
            restart.on('pointerout', () => restart.setScale(1)); // se mouse sair do botão
        };

        addHoverEffect(this.restart); // adiciona o efeito de passar o mouse

        this.restart.on('pointerdown', () => { // transição de cena ao clicar no botão restart
            this.scene.start('Game');
        });
    }
}