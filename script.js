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
    if (!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    if (isTouchScreendevice()) {
        ctx.lineTo(clientX, clientY);
        ctx.stroke();
        lastX = clientX;
        lastY = clientY;
    } else {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
    }
    
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

canvas.addEventListener("mousemove", draw)
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})
canvas.addEventListener("mouseup", () => isDrawing = false)
canvas.addEventListener("mouseout", () => isDrawing = false)

//canvas on mobile
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    isDrawing = true;
    draw(clientX, clientY);
}, false)

canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    isDrawing = false;
}, false);

canvas.addEventListener("touchcancel", (e) => {
    e.preventDefault();
    isDrawing = false;
}, false);

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
    draw(clientX, clientY)
}, false)

//detect touch screen devices
function isTouchScreendevice() {
    return ( 'ontouchstart' in window ) ||
    ( navigator.maxTouchPoints > 0 ) ||
    ( navigator.msMaxTouchPoints > 0 );      
};

