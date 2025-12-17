const canvas = document.getElementById("ether-bg");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Mouse tracking
let mouse = { x: w / 2, y: h / 2 };
window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Scroll tracking
let scrollY = 0;
window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
});

// Color interpolation helper
function lerp(a, b, t) {
    return a + (b - a) * t;
}

// Particle class
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
        // Base drifting
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse parallax
        this.x += (mouse.x - w / 2) * 0.0005;
        this.y += (mouse.y - h / 2) * 0.0005;

        // Scroll reaction (particles drift upward/downward)
        this.y += scrollY * 0.0008;

        // Reset if out of bounds
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
            this.reset();
        }
    }

    draw() {
        // Color shift based on scroll
        // t = how far down the page you are (0 → 1)
        let t = Math.min(scrollY / 800, 1);

        // Blue → Pink transition
        let r = lerp(0, 255, t);
        let g = lerp(200, 111, t);
        let b = lerp(255, 216, t);
        let a = lerp(0.6, 0.2, t);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.shadowBlur = 12;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
const particles = [];
for (let i = 0; i < 120; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p) => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

animate();