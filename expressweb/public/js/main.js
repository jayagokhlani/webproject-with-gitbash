const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide= document.querySelector('.middle_layer');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = `plz write city name before searching`;
        datahide.classList.add('data_hide');
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=0547f641e7553b36877d834804f289a8`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            temp_status.innerText=arrData[0].weather[0].main;

            const tempMood = arrData[0].weather[0].main;

            //condition to check sunny or cloudy

            if (tempMood == "clouds") {
                temp_status.innerText =
                    "<span class='material-symbols-outlined' style:'color: #f1f2f6;'>cloud</span>";
            }
            else if (tempMood == "clear") {
                temp_status.innerText =
                    "<span class='material-symbols-outlined' style:'color: #ecc68;'>clear_day</span>";
            }
            else if (tempMood == "rain") {
                temp_status.innerText =
                    "<span class='material-symbols-outlined'style:'color: #a4b0be;'>rainy</span>";
            }
            else if (tempMood == "haze") {
                temp_status.innerText =
                    "<span class='material-symbols-outlined'>dehaze</span>"
            }
        
            else {
                temp_status.innerHTML =
                    "<span class='material-symbols-outlined' style:'color: #ecc68;'>clear_day</span>";
            }
            datahide.classList.remove('data_hide');
        }
        catch {
        city_name.innerText = `plz enter proper city name`;
        datahide.classList.add('data_hide');
    }
}


}

submitBtn.addEventListener('click', getInfo);