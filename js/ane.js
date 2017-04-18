var AneObj = function() {
    this.x = [];
    this.len = [];
};

AneObj.prototype.num = 50;

AneObj.prototype.init = function() {
    for (var i = 0; i < this.num; i++) {
        // 海葵数量
        this.x[i] = i * 16 + Math.random() * 20;

        // 海葵高度
        this.len[i] = 200 + Math.random() * 50;
    }
};

AneObj.prototype.draw = function() {
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = 'round';
    ctx2.strokeStyle = '#3b154e';
    for (var i = 0; i < this.num; i++) {
        ctx2.beginPath();
        ctx2.moveTo(this.x[i], cH);
        ctx2.lineTo(this.x[i], cH - this.len[i]);
        ctx2.stroke();
    }
    ctx2.restore();
};
