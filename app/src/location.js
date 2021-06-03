export function getLocation(){
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

export function realTime(locales){
    let data = new Intl.DateTimeFormat(locales, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
}


