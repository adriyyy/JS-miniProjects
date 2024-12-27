const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
resize();

function resize()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

let gravity = 1; 
let friction = 0.9;

const mouse =
{
    x: undefined,
    y: undefined
}

window.addEventListener("resize", event =>
{
    resize();    
    init();
}
)

window.addEventListener("mousemove", event =>
{
    mouse.x = event.x;
    mouse.y = event.y;
}
)

window.addEventListener("click", event =>
{
    init()
;}
)

function randomise(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomiseColor()
{
    const possibleColors = ['#146152','#44803F','#B4CF66','#FFEC5C','#FF5A33'];
    return possibleColors[randomise(0, possibleColors.length - 1)];
}

function Ball(x, y, radius, dy, dx, color)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dy = dy;
    this.dx = dx;
    this.color = color;
    this.draw = () =>
    {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.lineWidth = 2;
        c.strokeStyle = '#4a2125';
        c.stroke();
        c.closePath();
    }
    this.update = () =>
    {
        if(this.y + this.radius + this.dy > innerHeight) this.dy = -this.dy * friction;
        else this.dy += gravity;
        if(this.x + this.radius > innerWidth || this.x - radius < 0) this.dx = -this.dx;
        this.y += this.dy;
        this.x += this.dx;
        this.draw();        
    }

}

let ballArray;

function init()
{
    ballArray = [];
    for(let i = 0; i < 300; i++)
    {  
        let radius = randomise(16, 30);
        let dy = randomise(-2, 2);
        let dx = randomise(-2, 2);
        let x = randomise(radius, innerWidth - radius);
        let y = randomise(radius, innerHeight - radius);
        let color = randomiseColor();
        ballArray.push(new Ball(x, y, radius, dy, dx, color))
    }
}

function text()
{
    c.fillStyle = '#801a13';
    c.font = 'bold 40px Permanent Marker';
    c.strokeStyle = 'rgb(241, 246, 183)';
    c.strokeText('TAP', mouse.x, mouse.y);
    c.fillText('TAP', mouse.x, mouse.y);
}

init();

function animate()
{
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < ballArray.length; i++)
    {
        ballArray[i].update();
    }
    text();
    requestAnimationFrame(animate);
}

animate();
