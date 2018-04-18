//时钟开始
function Run() {
    var canvas = document.getElementById('canvas');
    var ct = canvas.getContext('2d');

    //清除画布
    ct.clearRect(0, 0, 150, 150);

    //获取时间
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour + min / 60;
    ct.fillStyle = "white";

    //画表盘
    ct.strokeStyle = "gray";
    ct.lineWidth = 2;
    ct.beginPath();
    ct.arc(75, 75, 70, 0, 360, false);
    ct.closePath();
    ct.stroke();

    //画时针
    ct.save();
    ct.translate(75, 75);
    ct.rotate(hour * 30 * Math.PI / 180);
    ct.beginPath();
    ct.arc(0, -70, 4, 0, 360, false);
    ct.closePath();
    ct.fill();
    ct.restore();

    //画分针
    ct.save();
    ct.translate(75, 75);
    ct.rotate(min * 6 * Math.PI / 180);
    ct.beginPath();
    ct.arc(0, -70, 3, 0, 360, false);
    ct.closePath();
    ct.fill();
    ct.restore();

    //画秒针
    ct.save();
    ct.translate(75, 75);
    ct.rotate(sec * 6 * Math.PI / 180);
    ct.beginPath();
    ct.arc(0, -70, 2, 0, 360, false);
    ct.closePath();
    ct.fill();
    ct.restore();


    //写字
    ct.font = "14px 仿宋";
    ct.fillText("愿无岁月可回头", 15, 64);
    ct.fillText("且以深情共白首", 37, 96);
    ct.fill();
}

//时钟结束