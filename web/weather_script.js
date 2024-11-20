// get the weather through AJAX GET call
function getWeather(){
    var request = new XMLHttpRequest();
    var hpath = "https://api.openweathermap.org/data/2.5/weather?lat=35.85556&lon=14.43639&appid=775bc76446357e7027aea01a21bbb95f";
    
    var jsonWeather;
    request.open ("GET", hpath, false);
    request.send();
    jsonWeather = JSON.parse(request.responseText);
    console.log(jsonWeather);

    showWeather(jsonWeather);

}

function showWeather(jsonWeather){
    var divWeather = document.getElementById("divWeather");
    
    // store the understandable version of the time inside a variable
    var currentTime = convertEpochToHumanTime(jsonWeather);

    divWeather.innerHTML += "<h4> Last Updated: "+currentTime+"</h3>";
    divWeather.innerHTML += "<img src=\"http://openweathermap.org/img/wn/"+jsonWeather.weather[0].icon+"@2x.png\">";
    divWeather.innerHTML += "<h3 style=\"text-decoration: none;\">"+jsonWeather.weather[0].main+"</h3>";
    divWeather.innerHTML += "<h3 style=\"text-decoration: none;\">Temperature: "+(jsonWeather.main.temp-273.15).toFixed(2)+"<sup>o</sup>C/"+(((9*(jsonWeather.main.temp-273.15))/5)+32)+"<sup>o</sup>F</h3>";
    divWeather.innerHTML += "<h3 style=\"text-decoration: none;\">Humidity: "+jsonWeather.main.humidity+"%</h3>";
    //divWeather.innerHTML += "<h3 style=\"text-decoration: none;\">UV: "+jsonWeather.current.uv+"</h3>";
    divWeather.innerHTML += "<h3 style=\"text-decoration: none;\">Wind: "+(jsonWeather.wind.speed*3.6).toFixed(2)+" km/hr ("+(jsonWeather.wind.speed*2.237).toFixed(2)+" miles/hr)</h3>";
}

// convert epoch time to human time
function convertEpochToHumanTime(jsonWeather){
    var myDate = new Date((jsonWeather.dt)*1000);
    return myDate.toLocaleString();
}

