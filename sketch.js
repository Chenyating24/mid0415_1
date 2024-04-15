let bg = "#FAEBCD";
let creatures = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  angleMode(DEGREES);

	//ears
  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    let d = 50; // 所有生物的大小都一致
    let c = color(random(255), random(255), random(255)); // 隨機 RGB 色彩
    let speedY = random(1, 6); // 上下移動的速度
    let creature = new Creature(x, y, d, c, true, 0, speedY);
    creatures.push(creature);
  }
//without ears
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);
    let d = 50; // 所有生物的大小都一致
    let c = color(random(255), random(255), random(255)); // 隨機 RGB 色彩
    let speedX = random(-2, 2); // 左右移動的速度
    let speedY = random(-2, 2); // 上下移動的速度
    let creature = new Creature(x, y, d, c, false, speedX, speedY);
    creatures.push(creature);
  }
}

function draw() {
  background(bg);

  for (let creature of creatures) {
    creature.update();
    creature.draw();
  }
}

class Creature {
  constructor(x, y, d, c, hasEars, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.c = c;
    this.hasEars = hasEars;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    push();
    translate(this.x + this.d / 2, this.y + this.d / 2);

    // 耳朵
    if (this.hasEars) {
      noStroke(); // 框線設為0
      fill(this.c);
      triangle(-this.d / 4, -this.d / 4, -this.d / 8, -this.d / 2, -this.d / 2, -this.d / 2); // 左上耳朵
      triangle(this.d / 4, -this.d / 4, this.d / 8, -this.d / 2, this.d / 2, -this.d / 2); // 右上耳朵
    }

    // カオ
    noStroke();
    fill(this.c);
    rectMode(CENTER);
    rect(0, 0, this.d, this.d, this.d / 2, this.d / 2, 0, 0);

    // メ
    fill("#000000");
    circle(-this.d / 6, -this.d / 50, this.d / 7.5);
    circle(this.d / 6, -this.d / 50, this.d / 7.5);

    // クチ
    fill(bg);
    ellipse(0, this.d / 7.5, this.d / 2.2, this.d / 3);

    // ハナ
    fill(this.c);
    ellipse(0, this.d / 11, this.d / 5, this.d / 7);

    pop();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.hasEars) {
      if (this.y <= 0 || this.y >= height - this.d) {
        this.speedY *= -1;
      }
    } else {
      if (this.x <= 0 || this.x >= width - this.d) {
        this.speedX *= -1;
      }
      if (this.y <= 0 || this.y >= height - this.d) {
        this.speedY *= -1;
      }
    }

    // 確保生物不會超出畫布
    this.x = constrain(this.x, 0, width - this.d);
    this.y = constrain(this.y, 0, height - this.d);
  }
}
