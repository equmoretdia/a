var throttle = require('lodash.throttle');

const feedbackForm = document.querySelector('.feedback-form');
const savedDataKey = 'feedback-form-state';

const feedbackFormData = {
  Email: '',
  Message: '',
};

function setItem() {
  feedbackFormData.Email = feedbackForm.elements.email.value;
  feedbackFormData.Message = feedbackForm.elements.message.value;
  console.log(feedbackFormData);
  localStorage.setItem(savedDataKey, JSON.stringify(feedbackFormData));
}

const throttledSetItem = throttle(setItem, 1000);

function getItem() {
  const savedData = localStorage.getItem(savedDataKey);
  if (savedData) {
    // const loadedData = JSON.parse(savedData);
    const { Email, Message } = JSON.parse(savedData);
    // console.log(loadedData);
    console.log({ Email, Message });
    // feedbackForm.elements.email.value = loadedData['Email'];
    // feedbackForm.elements.message.value = loadedData['Message'];
    feedbackForm.elements.email.value = Email;
    feedbackForm.elements.message.value = Message;
    feedbackFormData.Email = feedbackForm.elements.email.value;
    feedbackFormData.Message = feedbackForm.elements.message.value;
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
    localStorage.removeItem(savedDataKey);
    console.log(feedbackFormData);
    feedbackForm.reset();
  }
}

getItem();

feedbackForm.addEventListener('input', throttledSetItem);
feedbackForm.addEventListener('submit', removeItem);
