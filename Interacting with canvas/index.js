const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");

window.addEventListener("resize", event =>
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    regenerate();
}
)

let mouse =
{
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove", event =>
{
    mouse.x = event.x;
    mouse.y = event.y;
}
)

const possibleColors = [`#003547`, `#005E54`, `#C2BB00`, `#E1523D`, `#ED8B16`];
let cArray = [];
let maxRadius = 40;

function Circle(x, y, radius, dx, dy, color)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.draw = () =>
    { 
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
    }
        
    this.update = () =>
    {
        if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0) this.dx = -this.dx;
        if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0) this.dy = -this.dy;
        if(Math.abs(this.x - mouse.x) <= 50 && Math.abs(this.y - mouse.y) <= 50 && this.radius < maxRadius) this.radius += 1;
        else if(this.radius > this.minRadius)this.radius -= 1;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function regenerate()
{
    cArray = [];
    for(let i = 0; i < 600; i++)
        {
            let radius = Math.random() * 2 + 1;
            let x = Math.random() * (innerWidth - radius * 2) + radius;
            let y = Math.random() * (innerHeight - radius * 2) + radius;
            let dx = (Math.random() - 0.5) * 3;
            let dy = (Math.random() - 0.5) * 3;
            let color = possibleColors[Math.floor(Math.random() * 5)];
            cArray.push(new Circle(x, y, radius, dx, dy, color));
        }    
}
regenerate();

function animate()
{
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < cArray.length; i++)
    {
        cArray[i].update();
    }
    requestAnimationFrame(animate);
}

animate();