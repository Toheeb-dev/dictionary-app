(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

 
})()
// searchIco.addEventListener('click', search);
const search =async(e)=>{
  e.preventDefault();
  wordSearch.innerHTML = ""
  error.innerHTML = ""
  let wordText = word.value
  loading.style.display = 'block';
let link = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + wordText)

.then(data => {
  return data.json();
  })
  .then(data => {
    loading.style.display = 'none';
    const responseDiv = document.getElementById('wordSearch');
    const word = data[0].word;
    const phonetics = data[0].phonetics.map(phonetic => phonetic.text);
    const phonaudio = data[0].phonetics.map(phonetic => phonetic.audio);
    console.log(phonaudio);
    const definitions = data[0].meanings.map(meaning => ({
      partOfSpeech: meaning.partOfSpeech,
      definition: meaning.definitions[0].definition,
      synonyms: meaning.definitions[0].synonyms,
      antonyms: meaning.definitions[0].antonyms,
      example: meaning.definitions[0].example,
    }));
    let existAudio = phonaudio.filter((item, index, array)=>item != "")
    let realaudio = existAudio[0]
    console.log(realaudio);
    if (!realaudio) {
    error.textContent = "No voice available for " + word
      realaudio = "Amber (Female).mp3";
    }
    const html = `
    <div class="d-flex  justify-content-between">
    <h2>${word}</h2>
    
    <audio id="player" src=${realaudio}></audio>
          <i onclick="document.getElementById('player').play()" class="fa-regular fa-circle-play"></i>
          <i onclick="changeMark()" id="book" class="fa-regular fa-bookmark" style="display:block"></i>
          <i onclick="changeMark()" id="book2" class="fas fa-bookmark" style="display:none"></i>
        </div>
      <div class="phonetics">
        <p><strong>Phonetics:</strong></p>
        ${phonetics.map(phonetic => `
          <p>${phonetic}</p>
        `).join('')}
      </div>
      ${definitions.map(definition => `
        <div class="definitions">
          <div class="part-of-speech">
            <p><strong>Part of speech:</strong> ${definition.partOfSpeech}</p>
          </div>
          <div class="definition">
            <p><strong>Definition:</strong> ${definition.definition}</p>
            ${definition.synonyms && definition.synonyms.length > 0 ? `
              <div class="synonyms">
                <p><strong>Synonyms:</strong> ${definition.synonyms.join(', ')}</p>
              </div>
            ` : ''}
            ${definition.antonyms && definition.antonyms.length > 0 ? `
              <div class="antonyms">
                <p><strong>Antonyms:</strong> ${definition.antonyms.join(', ')}</p>
              </div>
            ` : ''}
            ${definition.example ? `
              <div class="example">
                <p><strong>Example:</strong> ${definition.example}</p>
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    `;

    responseDiv.innerHTML = html;
  }).catch(err => {
    if (err) {
      wordSearch.innerHTML = `<i><p class="text-center fw-bold">We are sorry, word not found! Try another one...</p></i>`
    }
  });;
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

const changeMark =()=>{
  let book = document.getElementById('book');
  let book2 = document.getElementById('book2');
  // console.log(changeMark);
  
  if (book.style.display == "block") {
    book.style.display = "none";
    book2.style.display = "block";
    book2.style.color = "blue";
  } else if (book.style.display == "none") {
    book.style.display = "block";
    book2.style.display = "none";
    book2.style.color = "black";
  }
  
  


  
}

