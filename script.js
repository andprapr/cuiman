const video = document.getElementById('myVideo');
const videoContainer = document.getElementById('videoContainer');
const luckyMessage = document.getElementById('luckyMessage');
const dragonImage = document.getElementById('dragonImage');
let messageShown = false;
let dragonShown = false;

// Preload dragon image
const preloadDragon = new Image();
preloadDragon.src = "https://nikah2000.my.id/gambar/naga.png";

// Check video time and show elements at specific times
video.addEventListener('timeupdate', function() {
    // Show dragon at 8 seconds
    if (video.currentTime >= 8 && video.currentTime < 11 && !dragonShown) {
        dragonImage.classList.add('show');
        dragonShown = true;
        
        // Hide dragon after 5 seconds
        setTimeout(() => {
            dragonImage.classList.remove('show');
        }, 5000);
    }

    // Show message at 10 seconds
    if (video.currentTime >= 10 && video.currentTime < 13 && !messageShown) {
        luckyMessage.classList.add('show');
        messageShown = true;

        // Hide message after 5 seconds
        setTimeout(() => {
            luckyMessage.classList.remove('show');
        }, 5000);
    }

    // Reset flags if video is replayed
    if (video.currentTime < 5) {
        if (messageShown) messageShown = false;
        if (dragonShown) dragonShown = false;
    }
});

// Function to handle video size changes
function handleVideoSizeChange() {
    // Get the natural video dimensions
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    if (videoWidth && videoHeight) {
        // Calculate the aspect ratio
        const aspectRatio = videoWidth / videoHeight;

        // Get the available space
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;

        // Calculate the optimal size to fit the screen while maintaining aspect ratio
        let width, height;

        if (maxWidth / aspectRatio <= maxHeight) {
            // Width is the limiting factor
            width = maxWidth;
            height = width / aspectRatio;
        } else {
            // Height is the limiting factor
            height = maxHeight;
            width = height * aspectRatio;
        }

        // Set the video size
        video.style.width = `${width}px`;
        video.style.height = `${height}px`;

        // Adjust dragon image size based on video dimensions
        const minDimension = Math.min(width, height);
        dragonImage.style.maxWidth = `${minDimension * 0.5}px`;
        dragonImage.style.maxHeight = `${minDimension * 0.5}px`;

        // Adjust message font size based on video dimensions
        luckyMessage.style.fontSize = `${Math.max(16, minDimension * 0.05)}px`;
        luckyMessage.style.padding = `${Math.max(8, minDimension * 0.02)}px ${Math.max(12, minDimension * 0.03)}px`;
    }
}

// Handle dragon image loading error
dragonImage.onerror = function() {
    console.error('Dragon image failed to load');
    // Create a fallback SVG dragon
    const svgDragon = `
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,20 C130,20 150,40 150,70 C150,90 130,100 120,110 C140,120 160,140 160,160 C160,180 140,190 120,190 C100,190 90,180 80,170 C70,180 60,190 40,190 C20,190 10,170 10,150 C10,130 30,120 50,110 C40,100 30,90 30,70 C30,40 70,20 100,20 Z" fill="orange" stroke="red" stroke-width="3"/>
            <circle cx="70" cy="60" r="5" fill="black"/>
            <circle cx="130" cy="60" r="5" fill="black"/>
            <path d="M80,90 C90,100 110,100 120,90" fill="none" stroke="black" stroke-width="3"/>
        </svg>
    `;
    
    // Replace the img with the SVG
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svgDragon;
    const svgElement = tempDiv.firstChild;
    svgElement.classList.add('dragon-image');
    dragonImage.parentNode.replaceChild(svgElement, dragonImage);
    
    // Update the reference
    dragonImage = svgElement;
};

// Handle video loading error
video.addEventListener('error', function(e) {
    console.error('Video failed to load', e);

    // Try to use the second source if available
    if (video.querySelector('source:nth-child(2)') && 
        video.query
