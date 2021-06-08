export function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

export function getLanguage() {
    return navigator.language.slice(0, 2);
}

export function weekWeather(rez, index) {
    let four =  rez.reduce((arr, el) => ((arr[el.dt_txt.split(' ')[0]] = arr[el.dt_txt.split(' ')[0]] || []).push(el), arr), {});
    let clip = Object.values(four).splice(1, 4);
    return clip[index]
}

export function convert(locales, milliseconds, utcSeconds) {
    let options = {
        weekday: {
            weekday: 'long',
        },
        day: {
            day: '2-digit',
            month: 'long'
        },
        hour: {
            minute: 'numeric',
            hour: 'numeric'
        }
    };

    if (milliseconds) {
        let date = new Date(milliseconds * 1000);
        return (new Intl.DateTimeFormat(locales, options.day).format(date));
    } else if (utcSeconds) {
        let date = new Date(utcSeconds * 1000);
        return (new Intl.DateTimeFormat(locales, options.hour).format(date));
    } else {
        let currentDate = new Date();
        let weekday = (new Intl.DateTimeFormat(locales, options.weekday).format(currentDate));
        let day = (new Intl.DateTimeFormat(locales, options.day).format(currentDate));
        return {weekday, day}
    }
}



