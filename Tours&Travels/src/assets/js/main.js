// Google Sheets script URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbx382voETxDeAf9vv_lFWU7zZKYQ7jtI2zenX7wdE0jplqUeDrHNa-9NBChRL48_ENa/exec';

document.addEventListener('DOMContentLoaded', function() {
    const getInTouchBtn = document.getElementById('get-in-touch-btn');
    const formPopup = document.getElementById('form-popup');
    const closeBtn = document.querySelector('.close-btn');
    const customForm = document.querySelector('form[name="contact-form"]');

    function toggleModal(show) {
        formPopup.style.display = show ? 'block' : 'none';
        document.body.classList.toggle('modal-open', show);
    }

    getInTouchBtn?.addEventListener('click', () => toggleModal(true));
    closeBtn?.addEventListener('click', () => toggleModal(false));

    window.addEventListener('click', (event) => {
        if (event.target === formPopup) toggleModal(false);
    });

    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        fetch(scriptURL, { method: 'POST', body: new FormData(this) })
          .then(() => {
            showCustomAlert("Thank you! Your form is submitted successfully. We will contact you shortly");
            toggleModal(false);
            this.reset();
          })
          .catch(error => {
            console.error('Error!', error.message);
            showCustomAlert("An error occurred. Please try again.");
          });
      });
      
      function showCustomAlert(message) {
        const alertElement = document.getElementById('custom-alert');
        const messageElement = document.getElementById('custom-alert-message');
        const closeButton = document.getElementById('custom-alert-close');
        
        messageElement.textContent = message;
        alertElement.style.display = 'flex';
        
        closeButton.onclick = function() {
          alertElement.style.display = 'none';
        };
        
        // Close alert when clicking outside of it
        alertElement.onclick = function(event) {
          if (event.target === alertElement) {
            alertElement.style.display = 'none';
          }
        };
      }

    // Fade in elements on scroll
    function fadeInOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const { top, bottom } = element.getBoundingClientRect();
            if (top < window.innerHeight && bottom >= 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', fadeInOnScroll);
    window.addEventListener('load', fadeInOnScroll);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to top functionality
    const backToTopButton = document.getElementById("back-to-top");

    function toggleBackToTopButton() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        backToTopButton.style.display = scrollTop > 20 ? "block" : "none";
    }

    window.addEventListener('scroll', toggleBackToTopButton);

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Preloader functionality
    window.addEventListener('load', function() {
        document.getElementById('preloader').style.display = 'none';
    });
});