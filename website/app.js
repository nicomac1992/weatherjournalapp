/* Global Variables */

//baseUrl and apiKey from openweathermap API
// Create a new date instance dynamically with JS
let d = new Date();
//let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "918665df5090230637c4ad28111e1a0b";
let apiURL =
    "http://api.openweathermap.org/data/2.5/weather?zip=33175,us&appid=918665df5090230637c4ad28111e1a0b";
console.log(apiURL);
// Event listener
document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    const newZip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    // Calling the API
    getWeather(baseURL, newZip, apiKey)
        //New syntax
        .then(function(data) {
            console.log(data);
            // Adding data to POST request
            postData("/add", {
                date: d,
                temperature: data.main.temp,
                content: feelings,
            });
            updateUI();
        });
}
const getWeather = async(baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + ",us" + "&APPID=" + key);
    console.log(res);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

//POST route

const postData = async(url = "", data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async() => {
    const request = await fetch("/all");
    try {
        const gettingData = await request.json();
        (document.getElementById("date").innerHTML = gettingData[0].date),
        (document.getElementById("temp").innerHTML = gettingData[0].temp),
        (document.getElementById("content").innerHTML = gettingData[0].content);
    } catch (error) {
        console.log("error", error);
    }
};