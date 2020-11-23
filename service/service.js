import {API_KEY,URL,URL_DAILY} from '../variables/variables';

//fetches data with city name
function getCityDataFromAPI(city){

    return fetch(URL+"q="+city+"&appid="+API_KEY+"&units=metric")

}

//fetchees location lat, long data
function getLocationDataFromAPI(latitude,longitude){

    return fetch(URL+"lat="+latitude+"&lon="+longitude+"&appid="+API_KEY+"&units=metric")

}

//fetches daily data
function getDailyDataFromAPI(latitude,longitude){

    return fetch(URL_DAILY+"lat="+latitude+"&lon="+longitude+"&exclude=hourly,minutely"+"&appid="+API_KEY+"&units=metric")

}




export{
    getLocationDataFromAPI,
    getCityDataFromAPI,
    getDailyDataFromAPI,
}




