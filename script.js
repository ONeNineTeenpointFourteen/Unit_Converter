document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("conversionCategory");

    const conversions = {
        temperature: {
            celsius: { kelvin: value => value + 273.15, fahrenheit: value => value * 9 / 5 + 32 },
            kelvin: { celsius: value => value - 273.15, fahrenheit: value => (value - 273.15) * 9 / 5 + 32 },
            fahrenheit: { celsius: value => (value - 32) * 5 / 9, kelvin: value => (value - 32) * 5 / 9 + 273.15 }
        },
        area: {
            sqMeter: { sqKilometer: value => value / 1e6 },
            sqKilometer: { sqMeter: value => value * 1e6 }
        },
        weight: {
            gram: { kilogram: value => value / 1e3 },
            kilogram: { gram: value => value * 1e3 }
        },
        length: {
            meter: { kilometer: value => value / 1e3 },
            kilometer: { meter: value => value * 1e3 }
        },
        time: {
            second: { minute: value => value / 60, hour: value => value / 3600 },
            minute: { second: value => value * 60, hour: value => value / 60 },
            hour: { second: value => value * 3600, minute: value => value * 60 }
        }
    };

    categorySelect.addEventListener("change", function() {
        document.querySelectorAll('.conversion').forEach(el => el.style.display = 'none');
        const selectedCategory = categorySelect.value;
        if (selectedCategory) {
            document.getElementById(selectedCategory).style.display = 'block';
        }
    });

    Object.keys(conversions).forEach(category => {
        const convertBtn = document.getElementById(`${category}ConvertBtn`);
        convertBtn.addEventListener("click", () => {
            const input = document.getElementById(`${category}Input`).value;
            const fromUnit = document.getElementById(`from${capitalize(category)}Unit`).value;
            const toUnit = document.getElementById(`to${capitalize(category)}Unit`).value;
            if (fromUnit !== toUnit) {
                const conversionFunction = conversions[category][fromUnit][toUnit];
                const result = conversionFunction(parseFloat(input));
                document.getElementById(`${category}Result`).textContent = `${result} ${toUnit}`;
            } else {
                document.getElementById(`${category}Result`).textContent = input;
            }
        });
    });

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Background animation
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }
        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function handleParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            if (particlesArray[i].size <= 0.3) {
                particlesArray.splice(i, 1);
                particlesArray.push(new Particle());
                i--;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    }

    init();
    animate();
});
