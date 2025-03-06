class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    preload() {
        // #01: PRÉ-CARREGA OS ARQUIVOS DO JOGO
        this.load.image('bg', 'assets/bg_game.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('alert', 'assets/alert.png');
        this.load.image('trash', 'assets/trash.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('safe', 'assets/safePoint.png');
        this.load.image('petisco', 'assets/petisco.png');
        this.load.spritesheet('dog', 'assets/dog.png', { frameWidth: 280, frameHeight: 250 });
        this.load.spritesheet('sonic', 'assets/sonic.png', { frameWidth: 280, frameHeight: 250 });
        this.load.spritesheet('enemy', 'assets/enemy.png', { frameWidth: 280, frameHeight: 385 });
        this.load.spritesheet('rest', 'assets/rest.png', { frameWidth: 280, frameHeight: 250 });
        this.load.spritesheet('dona', 'assets/dona.png', { frameWidth: 128, frameHeight: 256 });
    }

    create() {
        // #02: CONFIGURAÇÕES DO JOGO:
        this.pulos = 0;
        this.physics.world.setBounds(0, 0, 3600, 600); // defini limites personalizados para a borda do mundo
        this.cursors = this.input.keyboard.createCursorKeys(); // armazena as setas do teclado dentro do objeto: 'cursors'
        this.wasd = this.input.keyboard.addKeys({ // cria um objeto para armazenar teclas
            W: Phaser.Input.Keyboard.KeyCodes.W,    // armazena a tecla 'w' (cima)
            A: Phaser.Input.Keyboard.KeyCodes.A,  // armazena a tecla 'a' (esquerda)
            D: Phaser.Input.Keyboard.KeyCodes.D  // armazena a tecla ''d' (direita)'
        });

        // #02.1: CONFIGURAÇÕES BACKGROUND:
        this.add.image(0, 0, 'bg').setOrigin(0, 0); // ADICIONA BACKGROUND

        // #02.2: CONFIGURAÇÕES PERSONAGEM CACHORRO:
        this.dog = this.physics.add.sprite(100, 400, 'dog').setScale(0.5); // cria o cachorro com física e diminui a escala
        this.dog.setCollideWorldBounds(true); // faz o cachorro ter colisão com as bordas do mundo
        this.dog.setFlipX(true); // inverte a imagem do cachorro
        this.dog.body.setSize(200, 120); // diminui o tamanho da hitbox manualmente
        this.dog.body.setOffset(60, 90); // ajusta a posição da hitbox

        this.anims.create({ // adiciona a animação do cachorro correndo
            key: 'run',
            frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 9 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({ // adiciona a animação do cachorro parado
            key: 'breath',
            frames: this.anims.generateFrameNumbers('rest', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: -1
        });

        // #02.3: CONFIGURAÇÕES OBJETO CHÃO:
        this.ground = this.physics.add.staticImage(0, 500, 'ground'); // cria o objeto: 'Chão' e adiciona física de forma estática
        this.ground.setOrigin(0, 0).refreshBody(); // muda a âncora da imagem e atualizo a hitbox para enquadrar

        // #02.4: CONFIGURAÇÕES OBJETO LIXO:
        this.lixo = this.physics.add.staticImage(500, 470, 'trash') // cria o objeto: 'Lixeira' e adiciona física de forma estática.
        this.lixo.setScale(0.12) // diminui a escala da lixeira
        this.lixo.body.setSize(30, 45); // diminui o tamanho da hitbox manualmente
        this.lixo.body.setOffset(235, 230); // ajusta a posição da hitbox

        // #02.5: CONFIGURAÇÕES OBJETO SONIC:
        this.sonic = this.physics.add.sprite(1190, 400, 'sonic').setScale(0.2); // cria o objeto: 'Sonic' e adiciona física
        this.physics.add.collider(this.sonic, this.ground); // colisão do sonic com o chão.
        this.sonic.setFlipX(true); // inverte a imagem do sonic.

        this.anims.create({ // adiciona animação do sonic
            key: 'sonicStop',
            frames: this.anims.generateFrameNumbers('sonic', { start: 0, end: 9 }),
            frameRate: 9,
            repeat: -1
        });
        this.sonic.anims.play('sonicStop', true); // ativa a animação da sonic

        // #02.5: CONFIGURAÇÕES OBJETO INIMIGO:
        this.enemy = this.physics.add.sprite(1500, 400, 'enemy').setScale(0.15); // cria o objeto: 'Inimigo' e adiciona física
        this.physics.add.collider(this.enemy, this.ground); // colisão do inimigo com o chão

        this.anims.create({ // adiciona animação do inimigo correndo
            key: 'enemyRun',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 9 }),
            frameRate: 15,
            repeat: -1
        });
        this.enemy.anims.play('enemyRun', true); // ativa a animação da sonic

        // #02.6: CONFIGURAÇÕES OBJETO DONA:
        this.dona = this.physics.add.sprite(3450, 400, 'dona').setScale(0.5); // cria o objeto: 'Lixeira', adiciona física de forma estática e diminui a escala.
        this.physics.add.collider(this.dona, this.ground); // adiciona colisão da dona com o chão 

        this.anims.create({  // adiciona animação da dona
            key: 'donaWaiting',
            frames: this.anims.generateFrameNumbers('dona', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
        this.dona.anims.play('donaWaiting', true); // ativa a animação da dona

        // #02.7: COLISÃO COM OBJETOS DO MAPA
        this.physics.add.collider(this.dog, this.ground);
        this.objetos = [this.lixo, this.sonic, this.enemy]; // array que armazena todos objetos
        this.physics.add.collider(this.dog, this.objetos, hitobjetos, null, this);
        this.physics.add.collider(this.dog, this.dona, hitDona, null, this);

        // Funções para levar o personagem ao Game Over quando encostar nos objetos
        function hitobjetos(dog, objetos) {
            this.scene.start('Lose');
        }

        // Funções para levar o personagem a tela de venceu quando encostar na Dona
        function hitDona(dog, dona) {
            this.scene.start('Win');
        }

        // #02.8: CONFIGURAÇÕES DO PETISCO
        this.petisco = this.physics.add.staticGroup(); // adicionando física a um grupo chamado petisco
        this.contadorPetisco = 0;

        while (this.contadorPetisco < 6){
            let petisco_X = Phaser.Math.RND.between(800,3340); //sorteia números
            let petisco_x = this.petisco.create(petisco_X, 410, 'petisco'); // ajusta a posição X do petisco conforma o sorteado
            
            this.contadorPetisco ++;
        }

        // #02.9: CONFIGURAÇÕES DO CONTADOR:
        this.score = 0; // variável para armazenar o score
        this.scoreText = this.add.text(16, 16, 'petiscos: ' + this.score, { fontSize: '32px', fill: '#000' }); // texto do contador de petiscos
        this.scoreText.setScrollFactor(0); // fixa o contador na tela. Rolagem = 0, logo não há 'rolagem' do score conforme a camera se movimenta.

        this.physics.add.overlap(this.dog, this.petisco, (dog, petisco) => {
            petisco.destroy()
            this.score += 1; // soma +1 petisco a cada vez que passar em cima do petisco
            this.scoreText.setText('petisco: ' + this.score); // atualiza texto do placar
        });

        // #02.10: CONFIGURAÇÕES DA CÂMERA (campo de visão do jogador)
        this.cameras.main.setBounds(0, 0, 3600, 600); // informo para câmera que o mundo vai de 0,0 até 3600, 600
        this.cameras.main.startFollow(this.dog, true); // camera segue o cachorro

        // #02.8: COMPLEMENTOS (alertas, safepoint e estrela):
        let avisoLixo = this.add.image(1190, 380, 'alert').setOrigin(0.5, 0.5).setScale(0.3); // cria o alerta acima do lixo
        let avisoSonic = this.add.image(500, 380, 'alert').setOrigin(0.5, 0.5).setScale(0.3); // cria o alerta acima do sonic
        this.tweens.add({ // cria a animação da imagem
            targets: [avisoLixo, avisoSonic], // qual objeto vai ser animado
            alpha: 0, // o texto desaparece
            duration: 700, // tempo da animação
            yoyo: true, // volta ao estado original (pisca)
            repeat: -1 // loop infinito
        });
        this.alerta = this.add.image(this.enemy.x, this.enemy.y - 100, 'alert').setOrigin(0.5, 0.5).setScale(0.3); // adiciona alerta acima do inimigo
        this.add.image(3100, 440, 'safe'); // cria a bandeira que indica área segura
        this.add.image(this.dona.x, this.dona.y - 50, 'star').setOrigin(0.5, 0.5).setScale(0.15); // adiciona estrela acima do peronsagem Dona]

    }

    update() {
        // #03: ATUALIZAÇÕES DO JOGO ENQUANTO ESTÁ SENDO RODADO
        // #03.1: ANIMAÇÕES DO CACHORRO
        // detecta se 'seta esquerda' ou 'a' está pressionado e adiciona movimento horizontal
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.dog.setVelocityX(-250);
            this.dog.anims.play('run', true);
            this.dog.setFlipX(false);
            // detecta se 'seta direita' ou 'd 'está pressionado e adiciona movimento horizontal 
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            this.dog.setVelocityX(250);
            this.dog.anims.play('run', true);
            this.dog.setFlipX(true);
            // se nenhuma das setas forem acionadas entrar na animação de 'respiração'
        } else {
            this.dog.setVelocityX(0);
            this.dog.anims.play('breath', true);
            // detecta se 'seta para cima' ou 'w' está pressionada e se toca no chão
        } if ((this.cursors.up.isDown || this.wasd.W.isDown) && this.dog.body.touching.down) {
            this.dog.setVelocityY(-350);
        }

        // #03.1: ANIMAÇÕES DO INIMIGO
        // se o inimigo estiver na posição x >= 3100. Inverter a imagem e deixar a variável ida verdadeira.
        if (this.enemy.x >= 3100) {
            this.enemy.setFlipX(true);
            this.enemy.ida = true;
            // se o inimigo estiver na posição x > 1500 & inimiga ida for verdadeiro a velocidade dele irá diminuir -7 no eixo x.
        } if (this.enemy.x > 1500 && this.enemy.ida === true) {
            this.enemy.x -= 7;
            // se o inimigo estiver na posição <= 1800. Não inverter a imagem e deixar a variável ida falsa.
        } if (this.enemy.x <= 1800) {
            this.enemy.setFlipX(false);
            this.enemy.ida = false;
            // se o inimigo estiver na posição x < 3100 & inimiga ida for falso a velocidade dele irá aumentar +7 no eixo x.
        } if (this.enemy.x < 3100 && this.enemy.ida === false) {
            this.enemy.x += 7;
        }
        // atualiza a posição do alerta acima do inimigo
        this.alerta.setPosition(this.enemy.x, this.enemy.y - 100);
    }
}