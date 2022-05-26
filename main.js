const canvas = document.getElementById('canvas');

//made canvas size to max viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 'context' is shorten to 'ctx'
const ctx = canvas.getContext('2d');


// we want to move the object and to move a object, we need to increment the x and y and clear the previous so it can have the illusion that it is moving forward when it really is not.

let colorArray = [
    '#facc15',
    '#a3e635',
    '#38bdf8',
    '#e879f9',
    '#fb7185']

let circleArray = [];
function initialize() {
    circleArray = [];
    for(let i = 0; i < 600; i++) {
        let radius = Math.round(Math.random() * 20) + 5;
        let x = Math.round(Math.random() * (innerWidth - (2 * radius))) + radius;
        let y = Math.round(Math.random() * (innerHeight - (2 * radius))) + radius;
        let dx = Math.round(Math.random() * 5) + 1;
        let dy = Math.round(Math.random() * 5) + 1;
        let circle = new Circle(x, y, dx, dy, radius);
        circleArray.push(circle);
    }
}

let maxRadius = 60;
let minRadius = 2;
let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    initialize();
})

window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse.x, mouse.y);
})

initialize();
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.value = this.radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];


    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius , 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();

    }
    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;

        if(this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        if(Math.abs(mouse.x - this.x) < 100 && Math.abs(mouse.y - this.y) < 100) {
            if(this.radius <= maxRadius){
                this.radius += 1;
        }
        } else if(this.radius > this.value) {
            this.radius -= minRadius;

        }


        this.draw();
    }

}


animate();
function animate() {
    console.log('it\'s working')
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(animate);

    for(let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }


}



