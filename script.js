//get the canvas element
const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");

//set the width and height of canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 10;
//ctx.globalCompositeOperation = "multiply"

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
    if(!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(clientX, clientY);
    ctx.stroke();
    lastX = clientX;
    lastY = clientY;
    // lastX=e.offsetX;
    // lastY=e.offsetY;
    hue++;
    if (hue >= 360) {
        hue = 0;
    }
    
    if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if(direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }

}

// canvas.addEventListener("mousemove", draw)
// canvas.addEventListener("mousedown", (e) => {
//     isDrawing = true;
//     lastX = e.offsetX;
//     lastY = e.offsetY;
// })
// canvas.addEventListener("mouseup", () => isDrawing = false)
// canvas.addEventListener("mouseout", () => isDrawing = false)

//canvas on mobile
canvas.addEventListener("touchstart", (e) => {
    console.log(e.touches)
    e.preventDefault();
    isDrawing = true;
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
    // isDrawing = true;
    draw(clientX, clientY)
}, false)

canvas.addEventListener("touchend", (e) => {
    // console.log(e);
    e.preventDefault();
    let deltaX;
    let deltaY;
    deltaX = e.changedTouches[0].clientX - clientX;
    deltaY = e.changedTouches[0].clientY - clientY;
    isDrawing = false;
}, false);

canvas.addEventListener("touchmove", (e) => {
    console.log(e)
    e.preventDefault();
    let clientX = e.touches[0].clientX;
    let clientY = e.touches[0].clientY;
    isDrawing = true;
    draw(clientX, clientY)
}, false)
