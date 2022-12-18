let apiBaseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=7b27ad7581f4b2696bb7742a8b207053&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// function to fetch data from the API
const getDataFromAPI = async(apiBaseURL, zipCode, apiKey)=>
{
    const response = await fetch(apiBaseURL+zipCode+apiKey);
    try{
        const newData = await response.json();
        return newData;
    }
    catch(error){
        console.log(error);
    }
}

// adding an event listener to the button to get the data fro the browser and sebding it to the server
document.getElementById('generate').addEventListener('click', function (event)
{
    event.preventDefault();

    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;

    getDataFromAPI(apiBaseURL, zipCode, apiKey)

    .then (function(returnedData)
    {
        postFunction('/add',{date : newDate, temp : returnedData.main.temp, feel : feelings})

    }).then(function(returnedData)
    {
        retrieveData() 
    })
})

//function to add the data fetched from API to the server
const postFunction = async (url = '', data = {}) =>
{
    const response = await fetch(url, 
    {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        date : data.date,
        temp : data.temp,
        feel : data.feel
    }), 

  });
    try 
    {
      const newData = await response.json();
      return newData

    }catch(error) 
    {
      console.log("error", error);
    }
} 

// writing the result to the html page after fetching it from the server
const retrieveData = async () =>
{
    const request = await fetch('/all');
    try {
    const allData = await request.json()
    document.getElementById('temp').innerHTML = 'Tempreture : ' + Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML ='Feelings : ' + allData.feel;
    document.getElementById("date").innerHTML ='Date : '+ allData.date;
    }
    catch(error) {
      console.log("error", error);
    }
}