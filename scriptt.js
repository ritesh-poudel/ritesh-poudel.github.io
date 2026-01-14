document.addEventListener('DOMContentLoaded', function() {
    const gifContainer = document.getElementById('gif-background');
    const techGifs = [
        'https://media.giphy.com/media/3o7abAHdYvZdBNnGZq/giphy.gif', // Coding
        'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', // Digital
        'https://media.giphy.com/media/l0HlN3jO6pJ6R5rI4/giphy.gif', // Tech pattern
        'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif', // Binary code
        'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', // Circuit
        'https://media.giphy.com/media/3o7TKsQ8gTp3WqXq1q/giphy.gif', // Matrix
        'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif', // Data flow
        'https://media.giphy.com/media/l0HlN3jO6pJ6R5rI4/giphy.gif'  // Tech glow
    ];
    
    // Create floating GIF particles
    function createGifParticle() {
        const gifIndex = Math.floor(Math.random() * techGifs.length);
        const particle = document.createElement('div');
        particle.className = 'gif-particle';
        
        const size = Math.random() * 150 + 50; // 50px to 200px
        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size);
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Create img element for GIF
        const img = document.createElement('img');
        img.src = techGifs[gifIndex];
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '50%';
        
        particle.appendChild(img);
        gifContainer.appendChild(particle);
        
        // Add floating animation
        animateParticle(particle);
    }
    
    // Animate particle
    function animateParticle(particle) {
        const duration = Math.random() * 20000 + 15000; // 15-35 seconds
        const xDistance = Math.random() * 200 - 100; // -100px to 100px
        const yDistance = Math.random() * 200 - 100; // -100px to 100px
        
        particle.style.transition = `transform ${duration}ms linear`;
        particle.style.transform = `translate(${xDistance}px, ${yDistance}px)`;
        
        // Restart animation
        setTimeout(() => {
            particle.style.transform = 'translate(0, 0)';
            setTimeout(() => animateParticle(particle), 1000);
        }, duration);
    }
    
    // Create initial particles
    for (let i = 0; i < 6; i++) {
        setTimeout(() => createGifParticle(), i * 500);
    }
    
    // Add more particles on click
    document.addEventListener('click', (e) => {
        if (e.target.closest('.gif-particle')) return;
        createGifParticle();
    });
    
    // Responsive adjustments
    function adjustParticles() {
        const particles = document.querySelectorAll('.gif-particle');
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            if (rect.left + rect.width < 0 || rect.top + rect.height < 0 ||
                rect.left > window.innerWidth || rect.top > window.innerHeight) {
                particle.remove();
                createGifParticle();
            }
        });
    }
    
    // Periodic cleanup and adjustment
    setInterval(adjustParticles, 5000);
    
    // Add floating effect to cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateY = (x / rect.width - 0.5) * 10;
            const rotateX = (0.5 - y / rect.height) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Add typing effect to header
    const headerText = "Welcome to My Portfolio";
    const headerElement = document.querySelector('.header h1');
    let i = 0;
    
    function typeWriter() {
        if (i < headerText.length) {
            headerElement.textContent += headerText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after 1 second
    setTimeout(() => {
        headerElement.textContent = '';
        typeWriter();
    }, 1000);
});
