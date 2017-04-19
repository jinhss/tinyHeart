var can1, can2, ctx1, ctx2, lastTime, deltaTime, bgImg = new Image(),
    cW, cH, ane, fruit, mom, mX, mY, baby, data, wave, halo, dust;


// document.onreadystatechange = loadingChange;//当页面加载状态改变的时候执行这个方法.
// function loadingChange()
// {
//     if(document.readyState == "complete"){ //当页面加载状态为完全结束时进入
//         game();
//     }
// }

window.onload = game;

function game() {
    init();

    lastTime = Date.now();


    deltaTime = 0;

    gameLoop();
}

function init() {
    // 找到画布并获得画笔
    can1 = document.getElementById('canvas1'); // fishes,dust,UI,circle
    ctx1 = can1.getContext('2d');

    can2 = document.getElementById('canvas2'); // background,ane,fruits
    ctx2 = can2.getContext('2d');

    can1.addEventListener('mousemove', onMousemove, false);
    can1.addEventListener('click', restartGame, false);

    ctx1.fillStyle = '#fff';
    ctx1.font = "20px Verdana"
    ctx1.textAlign = "center";

    bgImg.src = './images/background.jpg';

    cW = can1.width;
    cH = can1.height;

    ane = new AneObj();
    ane.init();

    fruit = new FruitObj();
    fruit.init();

    mom = new MomObj();
    mom.init();

    mX = cW * 0.5;
    mY = cH * 0.5;

    baby = new BabyObj();
    baby.init();

    data = new DataObj();

    wave = new WaveObj();
    wave.init();

    halo = new HaloObj();
    halo.init();

    dust = new DustObj();
    dust.init();

}

function gameLoop() {
    // fram per second => FPS
    requestAnimFrame(gameLoop);

    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;

    if (deltaTime > 50) deltaTime = 50;

    // 绘制背景
    drawBackground();

    // 绘制海葵
    ane.draw();

    // 检测已出生的果实
    fruitMonitor();

    // 绘制果实
    fruit.draw();

    ctx1.clearRect(0, 0, cW, cH);

    // 绘制鱼妈妈
    mom.draw();

    // 鱼妈妈与果实碰撞检测
    momFruitsCollision();

    // 鱼妈妈与鱼宝宝碰撞检测
    momBabyCollision();

    baby.draw();

    data.draw();

    wave.draw();

    halo.draw();

    dust.draw();
}

function onMousemove(e) {
    if (data.gameOver) return;
    var e = e || event;

    mX = e.offSetX || e.layerX;
    mY = e.offSetY || e.layerY;

}

function restartGame() {
    if (!data.gameOver) return;
    data.gameOver = false;
    baby.babyBodyCount = 0;
    data.fruitNum = 0;
    data.score = 0;
};