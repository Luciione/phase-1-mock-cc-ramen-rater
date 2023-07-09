// Base URL for the API
const BASE_URL = 'http://localhost:3000';

// Get DOM elements
const ramenMenu = document.getElementById('ramen-menu');
const ramenDetail = document.getElementById('ramen-detail');
const ratingDisplay = document.getElementById('rating-display');
const commentDisplay = document.getElementById('comment-display');
const newRamenForm = document.getElementById('new-ramen');

// Function to display ramen details
function displayRamenDetails(ramen) {
  document.querySelector('.detail-image').src = ramen.image;
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.restaurant').textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
}

// Function to fetch all ramens from the server
function fetchAllRamens() {
  return fetch(`${BASE_URL}/ramens`)
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to fetch a single ramen by ID from the server
function fetchRamenById(ramenId) {
  return fetch(`${BASE_URL}/ramens/${ramenId}`)
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to display all ramen images in the menu
function displayRamenMenu(ramens) {
  ramens.forEach(ramen => {
    const ramenImage = document.createElement('img');
    ramenImage.src = ramen.image;
    ramenImage.alt = ramen.name;
    ramenImage.dataset.id = ramen.id;
    ramenMenu.appendChild(ramenImage);
  });
}

// Event listener for clicking on ramen images in the menu
ramenMenu.addEventListener('click', function (event) {
  // Check if the clicked element is an image
  if (event.target.tagName === 'IMG') {
    const ramenId = event.target.dataset.id;

    // Fetch the ramen details from the server
    fetchRamenById(ramenId)
      .then(ramen => {
        displayRamenDetails(ramen);
      });
  }
});

// Event listener for submitting the new ramen form
newRamenForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  const nameInput = document.getElementById('new-name');
  const restaurantInput = document.getElementById('new-restaurant');
  const imageInput = document.getElementById('new-image');
  const ratingInput = document.getElementById('new-rating');
  const commentInput = document.getElementById('new-comment');

  // Create a new ramen object
  const newRamen = {
    name: nameInput.value,
    restaurant: restaurantInput.value,
    image: imageInput.value,
    rating: ratingInput.value,
    comment: commentInput.value,
  };

  // Display the new ramen in the menu
  const newRamenImage = document.createElement('img');
  newRamenImage.src = newRamen.image;
  newRamenImage.alt = newRamen.name;
  newRamenImage.dataset.id = Math.floor(Math.random() * 1000); // Assign a random ID for demonstration purposes
  ramenMenu.appendChild(newRamenImage);

  // Clear the form inputs
  nameInput.value = '';
  restaurantInput.value = '';
  imageInput.value = '';
  ratingInput.value = '';
  commentInput.value = '';
});

// Fetch all ramens and display them in the menu when the page loads
fetchAllRamens()
  .then(ramens => {
    displayRamenMenu(ramens);
  });
