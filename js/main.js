const API_KEY_MAPS = '';//Inserte su API de google maps aqui
const URL_MAPS = 'https://www.google.com/maps/embed/v1/place';

const API_KEY = '';//Inserte su API aqui
const URL = 'http://api.openweathermap.org/data/2.5/';


const button = document.getElementById("sendButton");
const main = document.getElementById("dato");
const inputElement = document.getElementById("search");
const mapa = document.getElementById("mapa");
 
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
  localStorage.getItem("nombre");
  const mapa = `${URL_MAPS}?key=${API_KEY_MAPS}&q=${nombre}`;
  console.log(mapa);
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
  const feels_like = Math.round(result.main.feels_like -273.15);

  //-------Precion-------
  const pressure = result.main.pressure;
   
  //------Velocidad del Viento------
  let speed = result.wind.speed;
  //console.log('La Velocidad es de: ', speed);

  //--------------icono------------
  
  let icono = result.weather.map(ico => ico.icon);
  //console.log('icono',icono);
  
  //--------------Clima------------
  let cielo = result.weather.map(img => img.description);
  //console.log('cielo',cielo);
 
  let clima = result.weather.map(cli => cli.main);
  //console.log('clima',clima);
    
    if(clima == 'Clear'){
        clima = 'sol';
      }else{
        clima = 'nube';
      }

  dato.innerHTML =
  `
<div class="${clima} contenedor">
        <section class="">
            <p class="centrar">${nombre}</p>
            <div class="contenedor2 detalle-${clima}">
                  <img src="http://openweathermap.org/img/wn/${icono}@2x.png" alt="${cielo}">  
                <p>${temp}°</p>
            </div>
            
            
            <div class="detalle ${clima}">
                  <div>
                    <p>Temperatura minima ${temp_min}°</p>
                    <p>Temperatura maxima ${temp_max}°</p>
                    <p>Sensacíon Térmica ${feels_like}°</p>
           
                
                    <p>Humedad: ${humidity}%</p>
                    <p>Precion: ${pressure} hPa</p>
                    <p>Vel. del viento: ${speed} km/h</p>
                  </div>
            </div>
            <div class="mapa">
                <iframe
                width="250"
                height="250"
                frameborder="0" style="border:0" shape="circle"
                src="${mapa}" allowfullscreen>
                </iframe>
            </div>
        </section>
    </div>
  `
}
