/* globals Chart:false, feather:false */

(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

 
})()

const search =()=>{
  let wordText = word.value
let link = fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + wordText)
.then(data => {
  return data.json();
  })
  .then(meaning => {
  console.log(meaning);
  });
}


// Get DOM elements
const searchInput = document.querySelector('#word');
const startButton = document.getElementById('startIcon');
const resultsList = document.getElementById('info');

// Create SpeechRecognition instance
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.lang = 'en-US';

// Add event listeners
startButton.addEventListener('click', startRecognition);
recognition.addEventListener('result', handleRecognitionResult);

// Start voice recognition
function startRecognition() {
  recognition.start();
}

// Handle voice recognition result
function handleRecognitionResult(event) {
  const transcript = event.results[0][0].transcript;
  searchInput.value = transcript;
  performDictionarySearch(transcript);
}

// Perform dictionary search
function performDictionarySearch(keyword) {
  // Replace this with your actual dictionary API call or custom dictionary logic
  // For demonstration purposes, just displaying the search keyword as a result
  const li = document.createElement('li');
  li.textContent = `Search: ${keyword}`;
  resultsList.appendChild(li);
}
