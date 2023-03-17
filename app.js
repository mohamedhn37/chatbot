let conversation = document.querySelector('.conversation');
let userInput = document.querySelector('#userInput');
let sendButton = document.querySelector('#sendButton');
let closeOpenButton = document.querySelector('#closeopen')
let inpt1 = document.querySelector('#input1')
let inpt2 = document.querySelector('#input2')
let body = document.querySelector("body");


function addGradient() {
  let gradient = `linear-gradient(to right, ${inpt1.value}, ${inpt2.value})`;
  body.style.background = gradient;
}
inpt1.addEventListener("input", addGradient);
inpt2.addEventListener("input", addGradient);

closeOpenButton.addEventListener('click',()=>{
    if (conversation.style.display === "none") {
        conversation.style.display = "block";
        closeOpenButton.innerText = "Fermer";
        closeOpenButton.style.backgroundColor = "red";
      } else {
        conversation.style.display = "none";
        closeOpenButton.innerText = "Ouvrir";
        closeOpenButton.style.backgroundColor = "green";
      }
})
let responses = {};

// Récupérer les réponses du fichier JSON

fetch('responses.json')
  .then(response => response.json())
  .then(data => {
    responses = data;
  }).catch(error => console.error(error));
sendButton.addEventListener('click', () => {
  let userMessage = userInput.value.trim();
  
  if (userMessage !== '') {
    conversation.innerHTML += `<p class="user-message">${userMessage}</p>`;
    let chatbotResponse = responses[userMessage.toLowerCase()] || "I'm sorry, I don't understand that.";
    conversation.innerHTML += `<p class="chatbot-message">${chatbotResponse}</p>`;
    userInput.value = '';
    conversation.scrollTop = conversation.scrollHeight;
  }
});
