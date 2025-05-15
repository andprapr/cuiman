// Loading animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingBar = document.getElementById('loading-bar');
    const loadingText = document.getElementById('loading-text');
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Simulate loading with specific stops at 10%, 50%, and 100%
    setTimeout(() => {
        loadingBar.style.width = '10%';
        loadingText.textContent = 'Loading... 10%';
    }, 500);
    
    setTimeout(() => {
        loadingBar.style.width = '50%';
        loadingText.textContent = 'Loading... 50%';
    }, 1500);
    
    setTimeout(() => {
        loadingBar.style.width = '100%';
        loadingText.textContent = 'Loading... 100%';
    }, 2500);
    
    // Hide loading screen and show main content
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        mainContent.style.display = 'block';
        
        // Remove loading screen after fade out
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Start creating snowflakes after loading
            startSnowflakes();
        }, 500);
    }, 3000);
});

// Create snowflakes
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Random position and size
    const size = Math.random() * 5 + 3;
    const left = Math.random() * 100;
    const opacity = Math.random() * 0.7 + 0.3;
    const duration = Math.random() * 10 + 5;
    
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${left}%`;
    snowflake.style.opacity = opacity;
    snowflake.style.animationDuration = `${duration}s`;
    
    snowContainer.appendChild(snowflake);
    
    // Remove snowflake after animation completes
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

// Start creating snowflakes
function startSnowflakes() {
    // Adjust snowflake creation based on device
    const isMobile = window.innerWidth < 768;
    const snowflakeInterval = isMobile ? 400 : 200; // Create fewer snowflakes on mobile
    
    // Create snowflakes at intervals
    setInterval(createSnowflakes, snowflakeInterval);
}

// Function to update RTP values
function updateRTP() {
    // RTP for Mahjong Ways 1
    const rtp1 = Math.floor(Math.random() * 20) + 80; // 80-99%
    document.getElementById('rtp1-value').textContent = `${rtp1}%`;
    document.getElementById('rtp1-bar').style.width = `${rtp1}%`;
    
    // RTP for Mahjong Ways 2
    const rtp2 = Math.floor(Math.random() * 20) + 80; // 80-99%
    document.getElementById('rtp2-value').textContent = `${rtp2}%`;
    document.getElementById('rtp2-bar').style.width = `${rtp2}%`;
}

// Update RTP on page load
setTimeout(updateRTP, 3000); // Start
