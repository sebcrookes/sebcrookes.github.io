/* ======= particles.js - this file provides the particle effect background for my portfolio website. ======= */

document.addEventListener("DOMContentLoaded", () => {
    const particleCanvas = document.querySelector("#particle-canvas");
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    const density = 0.0004; // Particles per pixel
    const numParticles = particleCanvas.width * particleCanvas.height * density;

    const context = particleCanvas.getContext("2d");

    const particles = [];

    for (let i = 0; i < numParticles; i++) {
        let velX = (Math.random() * 30) - 15;
        let velY = (Math.random() * 30) - 15;
        let frequency = Math.random() * 0.5;
        let radius = Math.random() * 2;
        particles.push(new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, velX, velY, radius, frequency));
    }

    var lastFrame = Date.now();

    function animate() {
        let last = lastFrame;
        lastFrame = Date.now();
        let dt = lastFrame - last;

        requestAnimationFrame(animate);

        if (dt >= 1000) { // Keeps the particles in same position after a long break (e.g. changed tabs), stopping particles from leaving viewport
            return;
        }

        let nextSection = document.getElementById("about-section");

        particleCanvas.width = window.innerWidth;
        
        if (nextSection !== null) {
            particleCanvas.height = Math.max(window.innerHeight, nextSection.getBoundingClientRect().top - document.body.getBoundingClientRect().top);
        } else {
            particleCanvas.height = window.innerHeight;
        }

        context.clearRect(0, 0, window.innerWidth, window.innerHeight);

        particles.forEach((particle) => {
            particle.update(dt / 1000, particleCanvas);
            particle.render(context);
        });
    }

    animate();
});

class Particle {
    constructor(posX, posY, velX, velY, size, frequency) {
        this.posX = posX;
        this.posY = posY;

        this.velX = velX;
        this.velY = velY;

        this.size = size;
        this.frequency = frequency;

        this.alpha = Math.round(Math.random() * 0xFF);
        this.decreasingAlpha = true; // All particles begin by having a decreasing alpha value
    }

    update(dt, particleCanvas) {
        // Increasing/decreasing the alpha
        let alphaModifier = this.frequency * dt * 0xFF * 4;
        this.alpha += this.decreasingAlpha ? -alphaModifier : alphaModifier;

        // Reversing the direction of alpha change when the max/min value is reached
        if (this.alpha <= 0) {
            this.alpha = 0;
            this.decreasingAlpha = false;
        }

        if (this.alpha >= 0xFF) {
            this.alpha = 0xFF;
            this.decreasingAlpha = true;
        }

        // Updating the position of the particle
        this.posX += this.velX * dt;
        this.posY += this.velY * dt;

        // Reversing the particle's direction if it is now outside the bounds of the container
        if (this.posX + this.size >= particleCanvas.width || this.posX - this.size <= 0) {
            this.velX = -this.velX;
        }
        if (this.posY + this.size >= particleCanvas.height || this.posY - this.size <= 0) {
            this.velY = -this.velY;
        }
    }

    render(context) {
        context.beginPath();
        context.fillStyle = '#FFFFFF';
        context.globalAlpha = Math.floor(this.alpha) / 255;

        context.arc(this.posX, this.posY, this.size, 0, Math.PI * 2);
        context.fill();
    }
}
