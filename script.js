// Function to show project info modal overlay
function showProjectInfo() {
    const aboutSection = document.getElementById('about-project');
    aboutSection.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Stop window viewport scrolling
}

// Function to hide project info modal overlay
function hideProjectInfo() {
    const aboutSection = document.getElementById('about-project');
    aboutSection.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable background scrolling
}

// Function to control downloadable game target link
function downloadGame() {
    // Standard setup generation for program initialization tracking
    const link = document.createElement('a');
    link.href = 'PixelDash.exe'; 
    link.download = 'PixelDash.exe';
    
    // Check asset safety status boundary
    if (!fileExists('PixelDash.exe')) {
        alert('Notice: Connect PixelDash.exe into the root path directory folder location context to complete deployment integration.');
    } else {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Dynamic loading visual feedback implementation state
        const btn = document.querySelector('.download-btn');
        const originalText = btn.textContent;
        btn.textContent = 'Initializing Download...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    }
}

// Simulation validation check helper runtime environment wrapper
function fileExists(filePath) {
    return true; 
}

// Smooth scrolling handling mechanics logic operations
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close modal explicitly when interactive cursor window target lands on black spacing
document.getElementById('about-project').addEventListener('click', function(event) {
    // Only dismiss if user clicked the layout background backdrop itself
    if (event.target === this) {
        hideProjectInfo();
    }
});

// Structural viewport IntersectionObserver animation settings
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Stop tracking animated cards once visible
        }
    });
}, observerOptions);

// Track interactive DOM card groupings arrays
document.querySelectorAll('.project-card, .download-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
});