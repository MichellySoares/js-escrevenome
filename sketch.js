// Variáveis para as raquetes
let raqueteEsquerda;
let raqueteDireita;

// Variável para a bola
let bola;

// Configuração inicial
function setup() {
  createCanvas(800, 400);
  
  // Inicializa as raquetes
  raqueteEsquerda = new Raquete(true);
  raqueteDireita = new Raquete(false);
  
  // Inicializa a bola
  bola = new Bola();
}

// Função para desenhar a tela a cada frame
function draw() {
  background(0);
  
  // Atualiza e desenha as raquetes
  raqueteEsquerda.show();
  raqueteEsquerda.move();
  
  raqueteDireita.show();
  raqueteDireita.move();
  
  // Atualiza e desenha a bola
  bola.show();
  bola.move();
  bola.checkCollision(raqueteEsquerda);
  bola.checkCollision(raqueteDireita);
}

// Classe para a raquete
class Raquete {
  constructor(isLeft) {
    this.isLeft = isLeft;
    this.width = 20;
    this.height = 100;
    this.x = isLeft ? 10 : width - 30;
    this.y = height / 2 - this.height / 2;
    this.ySpeed = 0;
  }
  
  show() {
    fill(255);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }
  
  move() {
    if (this.isLeft) {
      // Controle da raquete esquerda pelo jogador
      if (keyIsDown(87)) { // W key
        this.y -= 5;
      }
      if (keyIsDown(83)) { // S key
        this.y += 5;
      }
      this.y = constrain(this.y, 0, height - this.height);
    } else {
      // Movimento automático da raquete direita
      if (this.y < bola.y - this.height / 2) {
        this.y += 4;
      }
      if (this.y > bola.y - this.height / 2) {
        this.y -= 4;
      }
      this.y = constrain(this.y, 0, height - this.height);
    }
  }
}

// Classe para a bola
class Bola {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 10;
    this.xSpeed = random(5, 7) * (random() > 0.5 ? 1 : -1);
    this.ySpeed = random(2, 5) * (random() > 0.5 ? 1 : -1);
  }
  
  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }
  
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    // Colisão com o topo e o fundo
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
    
    // Colisão com as bordas esquerda e direita
    if (this.x < 0) {
      this.xSpeed *= -1;
      this.reset();
    }
    if (this.x > width) {
      this.xSpeed *= -1;
      this.reset();
    }
  }
  
  checkCollision(raquete) {
    if (this.x - this.radius < raquete.x + raquete.width &&
        this.x + this.radius > raquete.x &&
        this.y - this.radius < raquete.y + raquete.height &&
        this.y + this.radius > raquete.y) {
      this.xSpeed *= -1;
    }
  }
  
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random(5, 7) * (random() > 0.5 ? 1 : -1);
    this.ySpeed = random(2, 5) * (random() > 0.5 ? 1 : -1);
  }
}

