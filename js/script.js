const input = document.getElementById('box');
const button = document.getElementById('button');
const errorMessage = document.getElementById('error_message');
const box = document.querySelector('.container');
const display = document.querySelector('.display');


button.addEventListener('click', () => {
  const inputValue = input.value;
  if(inputValue !== ""){
    const apiUrl = `https://restcountries.com/v3.1/name/${inputValue}?fullText=true`;
    getInfo(apiUrl);
  }else{
    errorMessage.style.display = "block";
    errorMessage.innerHTML = "Empty value can't be searched!";
  }

});


async function getInfo(apiUrl){
  try{
    const res = await fetch(apiUrl);
    const data = await res.json();
    const dataObj = data[0];
    pushInfo(dataObj);
  }catch{
    checkInput();
  }

  
}


function pushInfo(dataObj){
  errorMessage.style.display = "none";
  display.style.display = "block";
  
  display.innerHTML = `


  <img src = "${dataObj.flags.svg}" alt = 'image' class="img-flag">
  <h2>${dataObj.name.common}</h2>

  <div class="text">
        <h4>Capital: <span>${dataObj.capital}</span></h4>        
        <h4>Continents: <span>${dataObj.continents[0]}</span></h4>
        <h4>Population: <span>${dataObj.population}</span></h4>     
        <h4>Currency: <span>${Object.keys(dataObj.currencies)[0]}</span></h4>
        <h4>Common language: <span>${Object.values(dataObj.languages)[0]}</span></h4>

  </div> `;
}

function checkInput(){
  display.style.display = "none";
  errorMessage.style.display = "block";
  errorMessage.innerHTML = "Enter a valid country name!";
}