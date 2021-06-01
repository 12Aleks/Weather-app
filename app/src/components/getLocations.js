import React from 'react';
import {Button} from "react-bootstrap";
import {getLocation , convert} from "../location";
const KEY = process.env.REACT_APP_KEY

const GetLocations = ({setLocations}) => {

    const getLocationsWeather = async (temp) => {
        try {
            const {coords} = await getLocation()
            let {latitude, longitude} = coords;
            if (latitude, longitude) {
                const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${temp}&appid=${KEY}`)
                let rez = await data.json();
                setLocations({
                    city: rez.name,
                    country: rez.sys.country,
                    temp: rez.main.temp,
                    wind: rez.wind.speed.value,
                    windUnit: rez.wind.speed.unit,
                    windName: rez.wind.speed.name,
                    windDirection: rez.wind.direction,
                    clouds: rez.clouds.value,
                    sunrise: await convert(rez.sys.sunrise),
                    sunset: await convert(rez.sys.sunset)
                })
                console.log(rez)
            }
        } catch (e) {
            console.log("Error", e)
        }
    }

    return (
        <div>
            <Button variant="primary" onClick={getLocationsWeather}>
                Submit
            </Button>
        </div>
    );
};

export default GetLocations;