const API_KEY = '9e3ee067165abca7ac846b9d2af00414';
//7ea38955d61db8cda00f1b7e8b8fa59c
const URL = 'http://api.openweathermap.org/data/2.5/';


const button = document.getElementById("sendButton");
const main = document.getElementById("dato");
const inputElement = document.getElementById("search");
 
button.addEventListener("click", ()=>{
  searchClima(inputElement.value);
});


function searchClima(wordToSearch){
    const fetchPromise = fetch(`${URL}weather?q=${wordToSearch},&APPID=${API_KEY}`);
    
    fetchPromise.then(response =>{
        console.log('result', response);
        return response.json();
    }).then(result => {

      madeGrid(result);
    }).catch(error =>{
      console.log('algo salio mal', error);
    });
}

function madeGrid(result){
  const nombre = result.name;
  console.log('nombre',nombre);
  //------Temperatura-------
  const temp = Math.round(result.main.temp - 273.15);
  //console.log('temperatura',temp);

  //-------Temperatura Maxima-------
  const temp_max = Math.round(result.main.temp_max - 273.15);
  //console.log('temperatura Maxima', temp_max);
  
  //-------Temperatura Minima-------
  const temp_min = Math.round(result.main.temp_min - 273.15);
  //console.log('temperatura Minima', temp_min);

  //-------Humedad-------
  const humidity = result.main.humidity;  
 
  //-------Sensacion Termica-------
  const feels_like = result.main.feels_like;

  //-------Precion-------
  const pressure = result.main.pressure;
   
  //------Velocidad del Viento------
  let speed = result.wind.speed;
  console.log('La Velocidad es de: ', speed);
  //--------------Clima------------
  let clima = result.weather.map(img => img.main);
  let cielo = 0;
  console.log(clima);

    if(clima == 'Clear'){
      clima = 'sol';
    }else if(clima == 'Clouds'){
      clima = 'nube';
    }
  
    if(clima == 'sol'){
      cielo = 'Despejado';
    }else{
      cielo = 'nublado';
    }

  dato.innerHTML =
  `
  <div class=" ${clima} row container border mx-auto pb-4">
  <section class=" col-md-7 mx-auto mt-4 pb-3">
      <p class="text-center">${nombre}</p>
      <div class=" text-center">
          <img class="align-top mr-4 " src="img/${clima}_Pc.png" alt="${clima}">
          <p class="ml-4 d-inline-block grados">${temp}°</p>
      </div>
      <p class="text-center">${temp_min}°/${temp_max}° Sensacíon Térmica ${feels_like}°</p>
      <p class="text-center">${cielo}</p>
      <div class="detalle detalle-${clima} rounded pl-2 ">
          <p>Humedad: ${humidity}%</p>
          <p>Precion: ${pressure} hPa</p>
          <p>Velocidad del viento: ${speed} km/h</p>
      </div>
  </section>
</div>
  `
}
