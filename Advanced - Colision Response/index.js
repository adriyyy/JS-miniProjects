const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;
let possibleColors = ['#F2668B','#03A688','#025E73'];

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

window.addEventListener("resize", event =>
{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
}
)

function getDistance(x1, y1, x2, y2)
{
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function randomise(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateColor()
{
    return possibleColors[randomise(0, possibleColors.length - 1)];
}

function resolveCollision(circle1, circle2) {
    const xVelocityDiff = circle1.velocity.x - circle2.velocity.x;
    const yVelocityDiff = circle1.velocity.y - circle2.velocity.y;

    const xDist = circle2.x - circle1.x;
    const yDist = circle2.y - circle1.y;

    // Verificăm dacă bilele se deplasează una spre cealaltă
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Calculăm unghiul coliziunii
        const angle = -Math.atan2(circle2.y - circle1.y, circle2.x - circle1.x);

        // Masă (aceeași pentru ambele bile)
        const m1 = circle1.mass;
        const m2 = circle2.mass;

        // Viteza după rotație
        const u1 = rotate(circle1.velocity, angle);
        const u2 = rotate(circle2.velocity, angle);

        // Viteza finală după coliziune (formule de coliziune elastice în 1D)
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y };

        // Viteza finală după rotația inversă
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Aplicăm vitezele calculate
        circle1.velocity.x = vFinal1.x;
        circle1.velocity.y = vFinal1.y;

        circle2.velocity.x = vFinal2.x;
        circle2.velocity.y = vFinal2.y;
    }
}

// Funcție pentru a roti viteza înainte și înapoi în funcție de unghi
function rotate(velocity, angle) {
    return {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
}

function Circle(x, y, radius, color)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;
    this.velocity = 
    {
        x: randomise(-2, 2),
        y: randomise(-2, 2)
    }
    this.draw = () =>
    {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.save();
        c.globalAlpha = this.opacity
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath;
    }
    this.update = () =>
    {
        for(let i = 0; i < balls.length; i++)
        {
            if(this === balls[i]) continue;
            if(getDistance(this.x, this.y, balls[i].x, balls[i].y) < this.radius * 2)
                resolveCollision(this, balls[i]);
        }
        if(getDistance(mouse.x, mouse.y, this.x, this. y) < 120 && this.opacity <= 0.3) this.opacity += 0.02;
        else if(this.opacity > 0.02) this.opacity -= 0.02;
        if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0) this.velocity.x = -this.velocity.x;
        if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0) this.velocity.y = -this.velocity.y;
        this.x += this.velocity.x;
        this.y += this.velocity.y; 
        this.draw();
    }
}

let balls;

function init()
{
    let radius = 20;
    balls = [];

    for(let i = 0; i < innerWidth / 6; i++)
    {
        let x = randomise(radius, innerWidth - radius);
        let y = randomise(radius, innerHeight - radius);
        for(let j = 0; j < balls.length; j++)
        {
            if(getDistance(x, y, balls[j].x, balls[j].y) < radius * 2)
            {
                x = randomise(radius, innerWidth - radius);
                y = randomise(radius, innerHeight - radius);
                j = -1;
            }
        }
        let color = generateColor();
        balls.push(new Circle(x, y, radius, color));
    }
}

init();

function animate()
{
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < balls.length; i++)
    {
        balls[i].update();
    }
    requestAnimationFrame(animate);
}

animate();