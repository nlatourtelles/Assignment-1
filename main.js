var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};

// function MushroomDude(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 189, 230, 5, 0.10, 14, true, 1);
//     this.x = 0;
//     this.y = 0;
//     this.speed = 100;
//     this.game = game;
//     this.ctx = game.ctx;
// }

// MushroomDude.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
// }

// MushroomDude.prototype.update = function () {
//     if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
//         this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
// }


// // inheritance 
// function Cheetah(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 512, 256, 2, 0.05, 8, true, 0.5);
//     this.speed = 350;
//     this.ctx = game.ctx;
//     Entity.call(this, game, 0, 250);
// }

// Cheetah.prototype = new Entity();
// Cheetah.prototype.constructor = Cheetah;

// Cheetah.prototype.update = function () {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     Entity.prototype.update.call(this);
// }

// Cheetah.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     Entity.prototype.draw.call(this);
// }

function Lost(game, bodySprite, headSprite){
    this.body = new Animation(bodySprite, 31, 25, 157, .15, 5, true, 2);
    this.head = new Animation(headSprite, 40 , 35, 320, .3, 8 , true, 2);


    this.speed = 100;
    this.x = 75;
    this.y = 75;
    this.game = game;
    this.ctx = game.ctx;
}

Lost.prototype.update = function() {
 
    if (this.x >=1241 &&  this.y < 650)  {
        this.y += this.game.clockTick * this.speed;
    } else if (this.y >= 650 && this.x > 75 ) {
        this.x -= this.game.clockTick * this.speed;
    } else if (this.x <=75 && this.y > 75) {
        this.y -= this.game.clockTick * this.speed;
    } else if (this.y <= 75 && this.x <= 1241) {
        this.x += this.game.clockTick * this.speed;
    }
    if (this.y > 800) this.y = -230;
    // Entity.prototype.update.call(this);
    // this.x += this.game.clockTick * this.speed;
    // this.y += this.game.clockTick * this.speed;
    // if (this.x > 800) this.x = -230;
}

Lost.prototype.draw = function () {
    if (this.x >=1241 &&  this.y < 650)  {
        this.body.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        this.head.drawFrame(this.game.clockTick, this.ctx, this.x, this.y-40);
    } else if (this.y >= 650 && this.x > 75) {
        this.body.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        this.head.drawFrame(this.game.clockTick, this.ctx, this.x-10, this.y-37);
    } else if (this.x <=75 && this.y >75) {
        this.body.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        this.head.drawFrame(this.game.clockTick, this.ctx, this.x-10, this.y-37);
    } else if (this.y <= 75 && this.x <= 1241) {
        this.body.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        this.head.drawFrame(this.game.clockTick, this.ctx, this.x-6, this.y-37);
    }
        // this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // this.upDown.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // this.head.drawFrame(this.game.clockTick, this.ctx, this.x-6, this.y-35);
}

function Issac(game, walkRightSprite, walkLeftSprite,headSprite, walkUpSprite, walkDownSprite) {
    this.animation = new Animation(walkRightSprite, 32, 30, 343, 0.15, 10 ,true, 2);
    this.walkLeft = new Animation(walkLeftSprite, 32, 30, 320, 0.15, 10 ,true, 2);
    // this.walkLeft = new Animation(walkLeftSprite, 20, 17, 205, 0.15, 10 ,true, 2);
    this.head = new Animation(headSprite, 40, 38, 320, .3, 8, true, 2);
    this.walkUp = new Animation(walkUpSprite, 32, 21, 320, .15, 10, true, 2);
    this.walkDown = new Animation(walkDownSprite, 32, 21, 320, .15, 10, true, 2);
    this.speed = 100;
    this.x = 200;
    this.y = 75;
    this.game = game;
    this.ctx = game.ctx;
}

// Issac.prototype = new Entity();
// Issac.prototype.constructor = Issac;

Issac.prototype.update = function() {
 
    if (this.x >=1241 &&  this.y < 650)  {
        this.y += this.game.clockTick * this.speed;
    } else if (this.y >= 650 && this.x > 75 ) {
        this.x -= this.game.clockTick * this.speed;
    } else if (this.x <=75 && this.y > 75) {
        this.y -= this.game.clockTick * this.speed;
    } else if (this.y <= 75 && this.x <= 1241) {
        this.x += this.game.clockTick * this.speed;
    }
    if (this.y > 800) this.y = -230;
    // Entity.prototype.update.call(this);
    // this.x += this.game.clockTick * this.speed;
    // this.y += this.game.clockTick * this.speed;
    // if (this.x > 800) this.x = -230;
}

Issac.prototype.draw = function () {
    if (this.x >=1241 &&  this.y < 650)  {
        this.walkDown.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        this.head.drawFrame(this.game.clockTick, this.ctx, this.x-6, this.y-38);
    } else if (this.y >= 650 && this.x > 75) {
        this.walkLeft.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        this.head.drawFrame(this.game.clockTick, this.ctx, this.x-10, this.y-35);
    } else if (this.x <=75 && this.y >75) {
        this.walkUp.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        this.head.drawFrame(this.game.clockTick, this.ctx, this.x-6, this.y-38);
    } else if (this.y <= 75 && this.x <= 1241) {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        this.head.drawFrame(this.game.clockTick, this.ctx, this.x-6, this.y-35);
    }
        // this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // this.upDown.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
        // this.head.drawFrame(this.game.clockTick, this.ctx, this.x-6, this.y-35);
}

// function IssacHead(game, spritesheet) {
//     this.animation = new Animation(spritesheet, 28, 25, 28, 60, 1, true, 2);
//     this.speed = 100;
//     this.x = 252;
//     this.y = 223;
//     this.game = game;
//     this.ctx = game.ctx;
// }

// IssacHead.prototype.update = function() {
//     this.x += this.game.clockTick * this.speed;
//     if (this.x > 800) this.x = -230;
//     // Entity.prototype.update.call(this);
// }

// IssacHead.prototype.draw = function () {
//     this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
//     // Entity.prototype.draw.call(this);
// }

// AM.queueDownload("./img/RobotUnicorn.png");
// AM.queueDownload("./img/guy.jpg");
// AM.queueDownload("./img/mushroomdude.png");
// AM.queueDownload("./img/runningcat.png");
AM.queueDownload("./img/floor.png");
AM.queueDownload("./img/walkRight.png");
AM.queueDownload("./img/walkLeft.png");
AM.queueDownload("./img/FullHeadSprite.png");
AM.queueDownload("./img/WalkUp.png");
AM.queueDownload("./img/WalkDown.png");
AM.queueDownload("./img/lostHead.png");
AM.queueDownload("./img/lostBody.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/floor.png")));
    gameEngine.addEntity(new Issac(gameEngine, AM.getAsset("./img/walkRight.png"), AM.getAsset("./img/walkLeft.png"),
    AM.getAsset("./img/FullHeadSprite.png"), AM.getAsset("./img/WalkUp.png"), AM.getAsset("./img/WalkDown.png")));
    gameEngine.addEntity(new Lost(gameEngine, AM.getAsset("./img/lostBody.png"), AM.getAsset("./img/lostHead.png")));

    console.log("All Done!");
});