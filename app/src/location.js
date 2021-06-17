const KEY = process.env.REACT_APP_KEY;

export async function getLocation(value) {
    if(value){
        let position = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${KEY}`);
        let letLong = await position.json();
        let coords = { latitude: letLong.coord.lat, longitude: letLong.coord.lon};
        return {coords}
    }else{
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    }
}

export function getLanguage() {
    return navigator.language.slice(0, 2);
}

export function weekWeather(rez, index) {
    let four =  rez.reduce((arr, el) => ((arr[el.dt_txt.split(' ')[0]] = arr[el.dt_txt.split(' ')[0]] || []).push(el), arr), {});
    let clip = Object.values(four).splice(0, 5);
    let time =  clip[index].map(el => el.dt_txt.split(' ')[1].match(/^\d\d[-:]\d\d/));
    let temps = clip[index].map(el => Math.ceil(el.main.temp));
    let images = clip[index].map(el => el.weather[0].icon);
    return {temps, images, index, time}
}

export function convert(locales, milliseconds, utcSeconds) {
    if (milliseconds) {
        let date = new Date(milliseconds * 1000);
        let weekday = (new Intl.DateTimeFormat(locales,  {weekday: 'long'}).format(date));
        let long =  (new Intl.DateTimeFormat(locales, { day: '2-digit', month: 'long'}).format(date));
        return {long, weekday}
    } else if (utcSeconds) {
        let date = new Date(utcSeconds * 1000);
        return (new Intl.DateTimeFormat(locales, { minute: 'numeric', hour: 'numeric'}).format(date));
    } else {
        let currentDate = new Date();
        let weekday = (new Intl.DateTimeFormat(locales, {weekday: 'long'}).format(currentDate));
        let day = (new Intl.DateTimeFormat(locales, { day: '2-digit', month: 'long'}).format(currentDate));
        return {weekday, day}
    }
}