/**
 * index.js
 * - All our useful JS goes here, awesome!
 */
 'use strict';
 
   navigator.geolocation.getCurrentPosition(geosuccess,geofailure);
 
   function geosuccess(pos)
   {
		var lat = pos.coords.latitude;
		var long = pos.coords.longitude;

		weatherforecast(lat,long);
		
	}
	
	function geofailure()
	{
		console.log('error');
	}
	
    function weatherforecast(lat, long)
    {
    	if(!lat || !long)
 		var link ='https://fcc-weather-api.glitch.me/api/current?lat=45.4888&lon=-122.8013'
 		
 		else
 		var link =`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`

		$.getJSON(link,function(data){
      	getWeather(data);
		});
	
	}
	
	//Get the current weather info
	function getWeather(data)
	{
		var city = data.name;
		var temperature = Math.round(convert_farhenheit(data.main.temp));
		var desc = data.weather[0].description;
		var icon = data.weather[0].icon;
		$('#city').html(city);
		$('#forecast').html(temperature);
		$('#Desc').html(desc);
		$('#icon').attr('src',icon);
	}
	
	
	//Convert the temperature to farhenheit
	function convert_farhenheit(temp)
	{
		return temp = (temp * 1.8) + 32;
	}

