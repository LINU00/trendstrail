document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000'; 
  
    // Registration Form
    const registrationForm = document.getElementById('signupForm');
    registrationForm.addEventListener('Sign Up', async (event) => {
      event.preventDefault();
      const formData = new FormData(registrationForm);
      await sendData(`${baseUrl}/api/register`, formData);
    });
  
    // Login Form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('Login', async (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      await sendData(`${baseUrl}/api/login`, formData);
    });
  
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('Submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      await sendData(`${baseUrl}/api/contact`, formData);
    });
  
    async function sendData(url, formData) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data.message); // Log the server response
        } else {
          console.error('Request failed');
        }
      } catch (error) {
        console.error('Error during request:', error);
      }
    }
  });
  