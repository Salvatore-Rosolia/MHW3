/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const api_endpoint = 'https://animechan.vercel.app/api/quotes/';
const numResults = 10;

const spotify_endpoint = 'https://api.spotify.com/v1/search?type=album&q=';
const clientId = 'da037c1347be478a98befb7d3f355af2';
const clientSecret =  'db8cd06d9f394c12a4c7b555464899f9';
let token;

function onJson2(json) {
    const results2 = document.querySelector('#results2');
    console.log(json);
    results2.innerHTML='';
    const results = json.albums.items;
    let num_results = results.length;
    if(num_results > 10) {
        num_results = 10;
    }
    for(let i=0 ; i<num_results ; i++) {
    const album_data = results[i];
    const cover = album_data.images[0].url;
    const title = album_data.name;
    const artist = album_data.artists[0].name;
    const contenitore = document.createElement('div');
    contenitore.classList.add('album');
    const image = document.createElement('img');
    image.classList.add('album__image')
    image.src = cover;
    const link = document.createElement('a');
    const titolo = document.createElement('h1');
    titolo.textContent = title;
    const nome = document.createElement('span');
    nome.textContent = 'Autore: ' + artist;
    const box_text = document.createElement('div');
    box_text.classList.add('album__copy');
    contenitore.appendChild(image);
    contenitore.appendChild(box_text);
    link.appendChild(titolo);
    box_text.appendChild(link);
    box_text.appendChild(nome);
    link.setAttribute('href',album_data.external_urls.spotify);
    results2.appendChild(contenitore);
    }
}

function onResponse2(response) {
    return response.json();
}

function search2(event) {
    event.preventDefault();

    const imput_spotify = document.querySelector('#content2').value;
     
    if(imput_spotify) {
        const imput = encodeURIComponent(imput_spotify);
        console.log('Eseguo ricerca di: ' + imput);

        fetch(spotify_endpoint + imput,
            {
                
                headers:
                {
                  'Authorization': 'Bearer ' + token
                }
              }).then(onResponse2).then(onJson2);
    } else {
        elert("Inserisci il testo per cui vuoi effettuare la richiesta");
    }
}

function onTokenJson(json) {
    token = json.access_token;
}

function onTokenResponse(response) {
    return response.json();
}

fetch("https://accounts.spotify.com/api/token",
{
  method:"post", 
  body: 'grant_type=client_credentials', 
  headers:
  {
    'Content-Type':'application/x-www-form-urlencoded',
    'Authorization':'Basic ' + btoa(clientId + ':' + clientSecret)
  }
}).then(onTokenResponse).then(onTokenJson);

const form_spotify = document.querySelector('#form_music');
form_spotify.addEventListener('submit', search2);

function onJson_titolo(json) {
    console.log('JSON titolo ricevuto');
    console.log(json);
    const showcase1= document.querySelector('#results1');
    showcase1.innerHTML = '';
    const results = json;
    for(let result of results) {
        console.log(result + 'questo è un risultato');
    }
    if(results.length == 0) {
        const error = document.createElement('h1');
        const messagge =document.createTextNode("Non ci sono risultati!");
        error.appenchild(messagge);
        showcase1.appendChild(error);
    }
    for(result of results) {
        
        console.log(result);
        const quote =result.quote;
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const box = document.createElement('div');
        const name = document.createElement('h3');
        name.textContent = result.character;
        const citation = document.createElement('p');
        citation.textContent= '"' + quote + '"';
        cell.appendChild(name);
        cell.appendChild(citation);
        showcase1.appendChild(cell);
    }
}

function onJson_personaggio(json) {
    console.log('JSON titolo ricevuto');
    console.log(json);
    const showcase1= document.querySelector('#results1');
    showcase1.innerHTML = '';
    const results = json;
    for(result of results) {
        console.log(result + 'questo è un risultato');
    }

    if(results.length == 0) {
        const error = document.createElement('h1');
        const messagge =document.createTextNode("Non ci sono risultati!");
        error.appenchild(messagge);
        showcase1.appendChild(error);
    }

    for(result of results) {
        console.log(result);
        const quote =result.quote;
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const box = document.createElement('div');
        const name = document.createElement('h3');
        name.textContent = result.character;
        const citation = document.createElement('p');
        citation.textContent= quote;
        cell.appendChild(name);
        cell.appendChild(citation);
        showcase1.appendChild(cell);
    }
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
function search(event){
    event.preventDefault();

    const clue = document.querySelector('#content').value;
   
    if(content) {
        const text =encodeURIComponent(clue);
        console.log('Eseguo ricerca di: ' + text);

        const choise = document.querySelector('#tipo').value;
        console.log('Ricerco elementi del tipo: ' + choise);

        if(choise ==='titolo') {
            titolo_request = api_endpoint + 'anime?title=' + text + '&per_page=' + numResults;
            fetch(titolo_request).then(onResponse).then(onJson_titolo);
        }
        else if(choise === 'nome_personaggio') {
            personaggio_request = api_endpoint + 'character?name=' + text + '&per_page=' + numResults;
            fetch(personaggio_request).then(onResponse).then(onJson_personaggio);
        }
    } else {
        elert("Inserisci il testo per cui vuoi effettuare la richiesta");
    }
}

const form = document.querySelector('form');
form.addEventListener('submit', search);

const risposte = {};
const elements = document.querySelectorAll('.choice-grid div');
const risultato  = document.querySelector('#risultato');

for(const element of elements) {
    element.addEventListener('click', press);
}

function press(event) {
    let selected = event.currentTarget;
    selected.classList.remove('cornice');
    selected.classList.add('selezione');
    selected.classList.remove('opaco');
    selected.querySelector('.checkbox').src = 'images/checked.png';

    for(const ele of elements) {
        if(selected.dataset.questionId == ele.dataset.questionId && selected.dataset.choiceId != ele.dataset.choiceId) {
            ele.classList.add('opaco');
            ele.querySelector('.checkbox').src = 'images/unchecked.png';
            ele.classList.remove('selezione');
        }
    }
    sel_value(selected);
}

function pressReset(event){
    risultato.classList.remove('dec');
    risultato.classList.add('hidden');

     for (const conta in risposte) {

        delete risposte[conta];
    }

    for(const ele of elements){
        ele.addEventListener('click',press);
        ele.classList.remove('opaco');
        ele.querySelector(".checkbox").src='./images/unchecked.png';
        ele.classList.remove('selezione'); 
    }
}

function sel_value(selected){
    risposte[selected.dataset.questionId]=selected.dataset.choiceId;
    console.log(risposte);
    let i=0;
    for(let ris in risposte)
        i++;
    console.log(i)
    if(i==3){
        for(const elem of elements){
            elem.removeEventListener('click',press); 
        console.log('end');
        
        let risult;
        if(risposte['one']===risposte['two'] || risposte['one']===risposte['three']){
            risult = risposte['one'];
        } else if(risposte['two']===risposte['three']){
            risult = risposte['two'];
        } else { risult = risposte['one']; }
        
        console.log(risultato);

        const title=RESULTS_MAP[risult].title;
        const contents=RESULTS_MAP[risult].contents;
        console.log(title);
        console.log(contents);
        risultato.querySelector("h1").textContent=title;
        risultato.querySelector("p").textContent=contents;
        risultato.classList.remove('hidden');
        risultato.classList.add('dec');
        
        const resetta = document.querySelector('.button');
        resetta.addEventListener('click', pressReset);
        }
    }
}
