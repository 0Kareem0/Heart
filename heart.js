document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const commandElement = document.getElementById('command');
    const heartContainer = document.getElementById('heart-container');
    const cursor = document.getElementById('cursor');
    const progressBar = document.getElementById('progress-bar');
    const statusText = document.getElementById('status');
    const visualizer = document.getElementById('visualizer');
    const cityBackground = document.getElementById('city-background');
    const binaryRain = document.getElementById('binary-rain');
    const audioElement = document.getElementById('bg-music');
    
    // Command text
    const command = "./activate --heart --mode=cyberpunk --effects=all";
    
    // Enhanced ASCII heart with more detail
    const heart = [
        "   ██████       ██████   ",
        " ██████████   ██████████ ",
        "████████████ ████████████",
        "████████████ ████████████",
        " ██████████████████████ ",
        "  ███████████████████  ",
        "   █████████████████    ",
        "     █████████████      ",
        "       █████████         ",
        "         █████           ",
        "          ███           ",
        "           █            "
    ];
    
    // Status messages
    const statusMessages = [
        {text: "Booting NEON_HEART system...", emoji: "⚡"},
        {text: "Initializing cyber protocols...", emoji: "🔐"},
        {text: "Loading heart matrix...", emoji: "💾"},
        {text: "Calculating love parameters...", emoji: "🧮"},
        {text: "Activating particle emitters...", emoji: "✨"},
        {text: "Rendering quantum pixels...", emoji: "🖥️"},
        {text: "Applying neon glow effect...", emoji: "💡"},
        {text: "Synchronizing audio...", emoji: "🎵"},
        {text: "Finalizing awesomeness...", emoji: "🚀"},
        {text: "HEART ACTIVATED!", emoji: "💖"}
    ];
    
    // Create cyber city background
    function createCity() {
        const buildingCount = 15;
        const windowColors = ['#05d9e8', '#ff2a6d', '#d300c5', '#00ff9d'];
        
        for (let i = 0; i < buildingCount; i++) {
            const building = document.createElement('div');
            building.className = 'building';
            
            // Random building properties
            const width = 50 + Math.random() * 100;
            const height = 150 + Math.random() * 300;
            const left = Math.random() * 100;
            const right = Math.random() * 100;
            
            building.style.width = `${width}px`;
            building.style.height = `${height}px`;
            building.style.left = `${left}%`;
            
            // Add windows
            const windowCount = Math.floor(width / 20) * Math.floor(height / 40);
            for (let w = 0; w < windowCount; w++) {
                const window = document.createElement('div');
                window.className = 'window';
                
                const windowWidth = 5 + Math.random() * 5;
                const windowHeight = 5 + Math.random() * 5;
                const windowLeft = Math.random() * (width - windowWidth);
                const windowTop = Math.random() * (height - windowHeight);
                
                window.style.width = `${windowWidth}px`;
                window.style.height = `${windowHeight}px`;
                window.style.left = `${windowLeft}px`;
                window.style.top = `${windowTop}px`;
                window.style.backgroundColor = windowColors[Math.floor(Math.random() * windowColors.length)];
                window.style.opacity = 0.3 + Math.random() * 0.7;
                
                // Make some windows blink
                if (Math.random() > 0.7) {
                    window.style.animation = `windowFlicker ${3 + Math.random() * 5}s infinite`;
                }
                
                building.appendChild(window);
            }
            
            cityBackground.appendChild(building);
        }
    }
    
    // Create binary rain effect
    function createBinaryRain() {
        const columns = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'binary-column';
            column.style.left = `${(i * 20) + (Math.random() * 10)}px`;
            column.style.animationDuration = `${5 + Math.random() * 10}s`;
            column.style.animationDelay = `${Math.random() * 5}s`;
            
            // Create binary characters
            let binaryString = '';
            const length = 20 + Math.floor(Math.random() * 30);
            for (let j = 0; j < length; j++) {
                binaryString += Math.random() > 0.5 ? '1' : '0';
            }
            
            column.textContent = binaryString;
            binaryRain.appendChild(column);
        }
    }
    
    // Create audio visualizer bars
    function createVisualizer() {
        const barCount = 30;
        
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${2 + Math.random() * 10}px`;
            visualizer.appendChild(bar);
        }
    }
    
    // Update status text
    function updateStatus(index) {
        if (index < statusMessages.length) {
            const {text, emoji} = statusMessages[index];
            statusText.textContent = `${emoji} ${text}`;
            statusText.setAttribute('data-text', `${emoji} ${text}`);
            
            // Start music at the right moment
            if (index === 7) {
                audioElement.volume = 0.3;
                audioElement.play().catch(e => console.log("Audio play prevented:", e));
                startAudioAnalysis();
            }
            
            setTimeout(() => updateStatus(index + 1), 800 + Math.random() * 400);
        }
    }
    
    // Audio analysis for visualizer
    function startAudioAnalysis() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 64;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        function updateVisualizer() {
            analyser.getByteFrequencyData(dataArray);
            const bars = document.querySelectorAll('.bar');
            
            for (let i = 0; i < bars.length; i++) {
                const value = dataArray[i % bufferLength] / 255;
                const height = value * 40;
                bars[i].style.height = `${Math.max(2, height)}px`;
                bars[i].style.opacity = 0.3 + (value * 0.7);
            }
            
            requestAnimationFrame(updateVisualizer);
        }
        
        updateVisualizer();
    }
    
    // Create a particle at position
    function createParticle(x, y, isHeart = false) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = isHeart ? 
            (8 + Math.random() * 12) : 
            (2 + Math.random() * 6);
        
        const colors = isHeart ? 
            ['#ff2a6d', '#d300c5'] : 
            ['#ff2a6d', '#05d9e8', '#d300c5', '#00ff9d'];
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        particle.style.borderRadius = isHeart ? '0' : '50%';
        
        if (isHeart) {
            particle.innerHTML = '❤️';
            particle.style.fontSize = `${size}px`;
            particle.style.lineHeight = '1';
            particle.style.textShadow = `0 0 ${size}px ${color}`;
            particle.style.background = 'transparent';
            particle.style.width = 'auto';
            particle.style.height = 'auto';
        }
        
        // Set initial position
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        document.body.appendChild(particle);
        
        // Animation properties
        const angle = Math.random() * Math.PI * 2;
        const velocity = isHeart ? 
            (0.5 + Math.random() * 1.5) : 
            (1 + Math.random() * 3);
        
        const life = isHeart ? 
            (3000 + Math.random() * 3000) : 
            (1000 + Math.random() * 1000);
        
        const startTime = Date.now();
        
        function animateParticle() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / life;
            
            if (progress < 1) {
                const moveX = Math.cos(angle) * velocity * elapsed * 0.05;
                const moveY = Math.sin(angle) * velocity * elapsed * 0.05 * (isHeart ? -1 : 1);
                const opacity = 1 - progress;
                const scale = isHeart ? 1 + progress : 1;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
                particle.style.opacity = opacity;
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        requestAnimationFrame(animateParticle);
        return particle;
    }
    
    // Create floating hearts
    function createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = `${10 + Math.random() * 80}vw`;
            heart.style.fontSize = `${20 + Math.random() * 30}px`;
            heart.style.animationDuration = `${4 + Math.random() * 8}s`;
            
            // Random neon color
            const colors = ['#ff2a6d', '#05d9e8', '#d300c5', '#00ff9d'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.color = color;
            heart.style.textShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
            
            document.body.appendChild(heart);
        }, 500);
    }
    
    // Type the command
    function typeCommand(text, index = 0) {
        if (index < text.length) {
            commandElement.textContent += text.charAt(index);
            
            // Random glitch effect
            if (Math.random() > 0.95) {
                commandElement.classList.add('glitch');
                setTimeout(() => commandElement.classList.remove('glitch'), 200);
            }
            
            setTimeout(() => typeCommand(text, index + 1), 50 + Math.random() * 50);
        } else {
            updateStatus(0);
            setTimeout(drawHeart, 800);
        }
    }
    
    // Draw the heart with awesome effects
    function drawHeart(lineIndex = 0, charIndex = 0) {
        if (lineIndex < heart.length) {
            if (charIndex === 0) {
                // Create new line element
                const lineElement = document.createElement('div');
                lineElement.className = 'heart-row';
                lineElement.id = 'heart-line-' + lineIndex;
                heartContainer.appendChild(lineElement);
            }
            
            const lineElement = document.getElementById('heart-line-' + lineIndex);
            const currentLine = heart[lineIndex];
            
            if (charIndex < currentLine.length) {
                lineElement.textContent += currentLine.charAt(charIndex);
                
                // Create particles when character is drawn
                if (currentLine.charAt(charIndex) !== ' ') {
                    const rect = lineElement.getBoundingClientRect();
                    const x = rect.left + charIndex * 18;
                    const y = rect.top + 15;
                    
                    // Regular particles
                    if (Math.random() > 0.7) {
                        createParticle(x, y);
                    }
                    
                    // Occasionally create heart particles
                    if (Math.random() > 0.9) {
                        createParticle(x, y, true);
                    }
                }
                
                // Update progress
                const totalChars = heart.join('').length;
                const typedChars = heart.slice(0, lineIndex).join('').length + charIndex;
                const progress = (typedChars / totalChars) * 100;
                progressBar.style.width = `${progress}%`;
                
                setTimeout(() => drawHeart(lineIndex, charIndex + 1), 20 + Math.random() * 40);
            } else {
                setTimeout(() => drawHeart(lineIndex + 1, 0), 100);
            }
        } else {
            // Heart complete - final effects
            progressBar.style.width = '100%';
            cursor.style.display = 'none';
            
            // Create explosion of particles
            const heartRect = heartContainer.getBoundingClientRect();
            const centerX = heartRect.left + heartRect.width / 2;
            const centerY = heartRect.top + heartRect.height / 2;
            
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    createParticle(
                        centerX + (Math.random() - 0.5) * 200,
                        centerY + (Math.random() - 0.5) * 200,
                        i % 5 === 0 // Every 5th particle is a heart
                    );
                }, i * 20);
            }
            
            // Start floating hearts
            createFloatingHearts();
        }
    }
    
    // Initialize everything
    createCity();
    createBinaryRain();
    createVisualizer();
    
    // Start the animation
    setTimeout(() => typeCommand(command), 500);
    
    // Continuous background particles
    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createParticle(x, y);
    }, 100);
    
    // Mouse interaction - particles follow mouse
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.7) {
            createParticle(e.clientX, e.clientY);
        }
    });
});