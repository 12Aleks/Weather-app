import React from 'react';
import {Image} from "react-bootstrap";
import icons from "../icons";
import {convert} from "../location";
import MinMax from "./minMax";

const FutureWeather = ({lang, day, temp}) => {
    const dayFuture = convert(lang, day.dt);
    // console.log(day)
    return (
        <div style={{width: 25 + '%'}} className='day'>
            <p>{dayFuture}</p>
            <Image src={icons[`${day.weather[0].icon}`].default} alt="weather icon"/>
            <MinMax temp={temp} state={day}/>
        </div>
    );
};

export default FutureWeather;
