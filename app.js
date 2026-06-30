// --- 1. AMBIENT PARTICLES + 3D BRAND DISPLAY POPUPS ENGINE ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let backgroundParticles = [];
let brandPopups = [];
const particleCount = 50; 

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class BrandAd {
    constructor(mouseX, mouseY) {
        this.x = mouseX;
        this.y = mouseY;
        this.text = "SURMAN CODE HUB"; 
        
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.speedY = -Math.random() * 1.5 - 1; 
        
        this.size = 12; 
        this.maxSize = 26; 
        
        this.opacity = 1;
        this.fadeSpeed = 0.012;
        this.color = Math.random() > 0.5 ? '#22d3ee' : '#c084fc'; 
        this.rotation = (Math.random() - 0.5) * 0.15; 
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size < this.maxSize) this.size += 0.35;
        this.opacity -= this.fadeSpeed;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = `bold ${this.size}px 'JetBrains Mono', monospace`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.textAlign = 'center'; 
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }
}

for (let i = 0; i < particleCount; i++) {
    backgroundParticles.push(new Star());
}

let lastSpawnTime = 0;
window.addEventListener('mousemove', (event) => {
    let now = Date.now();
    if (now - lastSpawnTime > 150) { 
        brandPopups.push(new BrandAd(event.clientX, event.clientY));
        lastSpawnTime = now;
    }
});

function renderPipeline() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    backgroundParticles.forEach(star => {
        star.update();
        star.draw();
    });

    for (let i = 0; i < brandPopups.length; i++) {
        brandPopups[i].update();
        brandPopups[i].draw();
        if (brandPopups[i].opacity <= 0) {
            brandPopups.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(renderPipeline);
}
renderPipeline();

// --- 2. 3D FORM SLIDE SWITCH MECHANICS ---
const loginCard = document.getElementById('login-card');
const signupCard = document.getElementById('signup-card');

function changeForm(target) {
    if (target === 'signup') {
        loginCard.className = 'auth-card hide-now';
        signupCard.className = 'auth-card show-now';
    } else {
        signupCard.className = 'auth-card hide-now';
        loginCard.className = 'auth-card show-now';
    }
}