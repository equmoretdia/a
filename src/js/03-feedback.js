var throttle = require('lodash.throttle');

const feedbackForm = document.querySelector('.feedback-form');
// const inputEmail = document.querySelector('.feedback-form input');
// const inputMessage = document.querySelector('.feedback-form textarea');
// const submitButton = document.querySelector('.feedback-form button');
let savedData = null;

const feedbackFormData = {
  Email: '',
  Message: '',
};

function setItem() {
  feedbackFormData['Email'] = feedbackForm.elements.email.value;
  feedbackFormData['Message'] = feedbackForm.elements.message.value;
  console.log(feedbackFormData);
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackFormData));
}

const throttledSetItem = throttle(setItem, 1000);

function getItem() {
  savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const loadedData = JSON.parse(savedData);
    console.log(loadedData);
    feedbackForm.elements.email.value = loadedData['Email'];
    feedbackForm.elements.message.value = loadedData['Message'];
    feedbackFormData['Email'] = feedbackForm.elements.email.value;
    feedbackFormData['Message'] = feedbackForm.elements.message.value;
  }
}

function removeItem(event) {
  event.preventDefault();
  if (
    feedbackForm.elements.email.value === '' ||
    feedbackForm.elements.message.value.trim() === ''
  ) {
    alert('Please fill in all the fields!');
  } else {
    localStorage.removeItem('feedback-form-state');
    console.log(feedbackFormData);
    feedbackForm.reset();
  }
}

getItem();

feedbackForm.addEventListener('input', throttledSetItem);
feedbackForm.addEventListener('submit', removeItem);
