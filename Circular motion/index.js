const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let possibleColors = ['#802922','#ffd561', '#962B09'];
const mouse = 
{
    x: canvas.width / 2,
    y: canvas.height / 2
}

window.addEventListener("mousemove", event =>
{
    mouse.x = event.x;
    mouse.y = event.y;
}
)

window.addEventListener("resize", () =>
{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

function generateColor()
{
    return possibleColors[Math.floor(Math.random() * 3)];
}

class Particle
{
    constructor(x, y, radius, color)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.06;
        this.delayMousePosition = 0.1;
        this.distanceFromCenter = Math.random() * 80 + 70;
        this.lastMouse =
        {
            x: mouse.x,
            y: mouse.y
        }
    }
    draw = () =>
    {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(this.lastParticle.x, this.lastParticle.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    }
    update = () =>
    {
        this.lastParticle = 
        {
            x: this.x,
            y: this.y
        }
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * this.delayMousePosition;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * this.delayMousePosition;        
        this.x = this.lastMouse.x + (Math.cos(this.radians)) * this.distanceFromCenter;
        this.y = this.lastMouse.y - (Math.sin(this.radians)) * this.distanceFromCenter; 
        this.radians += this.velocity;
        this.draw();
    }
}

let particles;

function init()
{
    particles = [];
    for(let i = 0; i < 50; i++)
    {
        let color = generateColor();
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, 5, color));
    }
}
init();
console.log(particles);

function animate()
{
    c.fillStyle = 'rgb(38, 38, 38, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.update());
    requestAnimationFrame(animate);
}
animate();