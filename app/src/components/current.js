import React from 'react';
import {Image} from "react-bootstrap";
import icons from "../icons";
import Wind from "./wind";
import MinMax from "./minMax";

const Current = ({today, temp, futureDays}) => {
    const{icon, wind, curTemp, description } = today;
    return (
        <div className="current_wrapper">
            <Image src={icons[`${icon}`].default} alt="weather icon"/>
            <div className='temp_wrapper'>
                <Wind speed={wind.speed}/>
                <h2 className="temp">{curTemp}
                    <span>{temp !== 'metric' ? '\u2109' : '\u2103'}</span>
                </h2>
                <p className='description'>{description}</p>
                <MinMax state={futureDays.current[0]} temp={temp}/>
            </div>
        </div>
    );
};

export default Current;