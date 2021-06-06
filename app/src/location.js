export function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

export function convert(utcSeconds) {
    let date = new Date(utcSeconds * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime
}

export function realDay(locales, milliseconds) {
    let options = {
        weekday: {
            weekday: 'long',
        },
        day: {
            day: '2-digit',
            month: 'long'
        }
    };

    if(milliseconds){
        let date = new Date(milliseconds * 1000);
        return (new Intl.DateTimeFormat(locales, options.day).format(date));
    }else{
        let currentDate = new Date();
        let weekday = (new Intl.DateTimeFormat(locales, options.weekday).format(currentDate));
        let day = (new Intl.DateTimeFormat(locales, options.day).format(currentDate));
        return {weekday, day}
    }
}



