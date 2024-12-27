const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

mouse =
{
    x: undefined,
    y: undefined
}
function getDistance(x1, y1, x2, y2)
{
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

window.addEventListener("mousemove", event =>
{
    mouse.x = event.x;
    mouse.y = event.y;
}
)

function Circle(x, y, radius, color)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.draw = () =>
    {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
        c.closePath();
    }
    this.update = () =>
    {
        this.draw();
    }   
}

let circle1 = new Circle(innerWidth / 2, innerHeight / 2, 50, 'black');
let circle2 = new Circle(undefined, undefined, 20, 'red');

function animate()
{
    
    c.clearRect(0, 0, innerWidth, innerHeight);
    circle1.update();
    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle2.update();
    if(getDistance(circle1.x, circle1.y, circle2.x, circle2.y) <= circle1.radius + circle2.radius)
        circle1.color = 'red';
    else circle1.color = 'black';
    requestAnimationFrame(animate);
}

animate();
