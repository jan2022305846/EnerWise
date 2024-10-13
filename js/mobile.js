function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
      section.style.display = 'none';
  });
  
  // Show the selected section and apply flexbox styles
  const selectedSection = document.getElementById(sectionId);
  selectedSection.style.display = 'flex';
  selectedSection.style.flexFlow = 'wrap';
  selectedSection.style.justifyContent = 'center';
}



document.addEventListener('DOMContentLoaded', () => {
  // Splash Logic
  const frame1 = document.getElementById('frame1');
  const frame2 = document.getElementById('frame2');
  const proceedButton = document.getElementById('proceedButton');

  // Display frame 1 for 3 seconds, then switch to frame 2
  if (frame1 && frame2 && proceedButton) {
      setTimeout(() => {
          frame1.style.display = 'none';
          frame2.style.display = 'block';
          frame2.style.opacity = 1;
      }, 3000); // 3-second delay

      // Redirect to the login screen on button click
      proceedButton.addEventListener('click', () => {
          window.location.href = 'log-in.html'; // Change 'log-in.html' to your actual login page path
      });
  }
});

//LOGIN
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
          event.preventDefault(); // Prevent the default form submission behavior
          
          // Redirect to Mobile.html regardless of the credentials
          window.location.href = 'Mobile.html';
      });
  }
});


//BOOKMARKING
document.addEventListener('DOMContentLoaded', () => {
  const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
  const savedTipsContainer = document.getElementById('saved-tips-container');
  const emptyCard = document.getElementById('empty');
  const customAlert = document.getElementById('custom-alert');
  const alertMessage = document.getElementById('alert-message');

  bookmarkButtons.forEach(button => {
      button.addEventListener('click', () => {
          const card = button.closest('.card');
          const tipId = card.getAttribute('data-tip-id');
          const savedTips = JSON.parse(localStorage.getItem('savedTips')) || [];

          // Toggle saved state
          if (savedTips.includes(tipId)) {
              // Remove from saved tips
              const index = savedTips.indexOf(tipId);
              savedTips.splice(index, 1);
              button.classList.remove('saved'); // Change style if needed
              button.innerHTML = '&#9733;'; // Change icon if needed
          } else {
              // Add to saved tips
              savedTips.push(tipId);
              button.classList.add('saved'); // Change style if needed
              button.innerHTML = '&#9734;'; // Change icon if needed
              
              // Show custom alert message
              showAlert("Tip Saved Successfully");
          }

          // Save to localStorage
          localStorage.setItem('savedTips', JSON.stringify(savedTips));

          // Update the saved tips display
          displaySavedTips();
      });
  });

  // Function to display saved tips
  function displaySavedTips() {
      const savedTips = JSON.parse(localStorage.getItem('savedTips')) || [];
      const cards = document.querySelectorAll('.card');

      // Clear previous saved tips display
      savedTipsContainer.innerHTML = '';

      // Check if there are saved tips
      if (savedTips.length === 0) {
          emptyCard.style.display = 'block'; // Show empty card
      } else {
          emptyCard.style.display = 'none'; // Hide empty card

          // Loop through saved tips and create display elements
          savedTips.forEach(tipId => {
              const card = Array.from(cards).find(card => card.getAttribute('data-tip-id') === tipId);
              if (card) {
                  const clonedCard = card.cloneNode(true);
                  // Optionally, you can remove the bookmark button from the displayed tip
                  const bookmarkButton = clonedCard.querySelector('.bookmark-btn');
                  bookmarkButton.style.display = 'none'; // Hide bookmark button
                  savedTipsContainer.appendChild(clonedCard);
              }
          });
      }
  }

    // Function to show custom alert
  function showAlert(message) {
    alertMessage.textContent = message;
    customAlert.style.display = 'flex'; // Show alert

    // Automatically hide the alert after 3 seconds
    setTimeout(() => {
        customAlert.style.display = 'none'; // Hide alert
    }, 1500); 
  }

  // Initial display of saved tips on page load
  displaySavedTips();
});

