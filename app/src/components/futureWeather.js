import React from 'react';
import {Image} from "react-bootstrap";
import icons from "../icons";
import {realDay} from "../location";

const FutureWeather = ({country, day}) => {
    const dayFuture = realDay(country, day.dt);
    console.log(day)
    return (
        <div style={{width: 25 + '%'}} className='day'>
            <p>{dayFuture}</p>
            <Image src={icons[`${day.weather[0].icon}`].default} alt="weather icon"/>
            <p>{day.temp.min}</p>
            <p>{day.temp.max}</p>
        </div>
    );
};

export default FutureWeather;