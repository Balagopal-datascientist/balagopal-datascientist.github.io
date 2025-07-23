document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Navigation
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide testimonials
    setInterval(() => {
        if (nextBtn) showSlide(currentSlide + 1);
    }, 5000);
    
    // Animate skill bars on scroll
    const skillSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        if (!skillSection) return;
        
        const sectionPos = skillSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if (sectionPos < screenPos) {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('style').match(/width: (\d+)%/)[1];
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 100);
            });
            window.removeEventListener('scroll', animateSkills);
        }
    }
    
    window.addEventListener('scroll', animateSkills);
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            fetch('https://my-api-491141845252.europe-west1.run.app/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, subject, message })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                } else {
                    alert('There was an error submitting your message. Please try again later.');
                }
            })
            .catch(error => {
                alert('There was an error submitting your message. Please try again later.');
            });
        });
    }
    
    // Data Visualization Canvas
    const canvas = document.getElementById('dataCanvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Create a data visualization
        function drawDataVisualization() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Set background
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid lines
            ctx.strokeStyle = 'rgba(67, 97, 238, 0.1)';
            ctx.lineWidth = 1;
            
            const gridSize = 30;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            // Generate random data points
            const dataPoints = [];
            for (let i = 0; i < 50; i++) {
                dataPoints.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 5 + 2,
                    color: `rgba(${Math.floor(Math.random() * 100 + 50)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 155 + 100)}, 0.7)`,
                    speed: Math.random() * 2 + 0.5
                });
            }
            
            // Draw connections between points
            ctx.strokeStyle = 'rgba(67, 97, 238, 0.2)';
            ctx.lineWidth = 0.5;
            
            for (let i = 0; i < dataPoints.length; i++) {
                for (let j = i + 1; j < dataPoints.length; j++) {
                    const dx = dataPoints[i].x - dataPoints[j].x;
                    const dy = dataPoints[i].y - dataPoints[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(dataPoints[i].x, dataPoints[i].y);
                        ctx.lineTo(dataPoints[j].x, dataPoints[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            // Draw data points
            dataPoints.forEach(point => {
                ctx.fillStyle = point.color;
                ctx.beginPath();
                ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
                ctx.fill();
                
                // Update position for animation
                point.x += Math.random() * point.speed - point.speed / 2;
                point.y += Math.random() * point.speed - point.speed / 2;
                
                // Keep within bounds
                if (point.x < 0) point.x = canvas.width;
                if (point.x > canvas.width) point.x = 0;
                if (point.y < 0) point.y = canvas.height;
                if (point.y > canvas.height) point.y = 0;
            });
            
            requestAnimationFrame(drawDataVisualization);
        }
        
        drawDataVisualization();
    }
});