

// it will fetch the data from api
async function call_API(data) {


	let city_name = document.getElementById('city_name').value;
	if (data) {
		city_name = data
	}

	try {

		let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fc980f3d11a74d0da4260214231507&q=${city_name}&days=10&aqi=yes&alerts=yes`);
		let json = await res.json()
		console.log(json)
		set_all_data_to_html(json)

	} catch (error) {
		alert('Enter Valid City Name !')
	}
}

// this will set the data in HTML document
function set_all_data_to_html(json) {

	let name = document.getElementById('name');
	let temp = document.getElementById('temp');
	let state = document.getElementById('state');
	let country = document.getElementById('country');
	let weather_status = document.getElementById('weather_status');
	let image_container = document.getElementById('image_container');
	let date = document.getElementById('date');
	let time = document.getElementById('time');

	image_container.src = json.current.condition.icon

	name.innerText = json.location.name
	temp.innerText = json.current.temp_c + '°C'
	state.innerText = json.location.region
	country.innerText = json.location.country
	weather_status.innerText = json.current.condition.text
	date.innerText = json.location.localtime.slice(0, 10)
	time.innerText = json.location.localtime.slice(10, 16)




}

// this will fetch user current location
function get_User_location() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(data_rec, set_bydefault);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}

}


// if user current location not available this function will set bydefault location
function set_bydefault() {
	let latitude = 18.98
	let longitude = 72.83
	let data = latitude + ',' + longitude
	call_API(data)
}


// this will set current user location latitude and longitude 
function data_rec(pos) {

	let latitude = pos.coords.latitude;
	let longitude = pos.coords.longitude;
	let data = latitude + ',' + longitude

	call_API(data)

}
