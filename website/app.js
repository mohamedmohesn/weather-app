/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=fb5491201e78fb36b472d10d8f3e1381&units=metric';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', perform);
/* Function called by event listener */
function perform(e){ 
    const Citynamekey = document.getElementById('City name').value; 
    const youFeeling =  document.getElementById('feelings').value;
     getdata(baseURL,Citynamekey, apiKey)
    .then(function(temps){
        // Add data
        console.log(temps);
    postData('/add', {temperature:temps, date:newDate , userResponse:youFeeling});
    retrieveData();
    })
   
  }
/* Function to GET Web API Data*/
 const getdata = async  (baseURL,zip, Key)=>{
    const res = await fetch(baseURL+zip+Key)
    try {
        const data = await res.json();
        const temps = data.main.temp
        return temps;
    }  catch(error) {
        // appropriately handle the error
        console.log("error", error);
      }
}
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    // console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

/* Function to GET Project Data */
const retrieveData = async () =>{
    const req = await fetch('/all');
    try {
    // Transform into JSON
    const allInfo = await req.json()
    console.log(allInfo)
    // Write updated data to DOM elements
    document.getElementById('date').innerHTML = 'date: '+ allInfo.date;
    document.getElementById('temp').innerHTML = 'temp: '+ Math.round(allInfo.temperature)+ ' degrees';
    document.getElementById('content').innerHTML = 'feels: '+ allInfo.userResponse;

    
    }
    catch(error) {
      console.log('error', error);
      // appropriately handle the error
    }
   }