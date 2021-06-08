import React from 'react';
import {Image} from "react-bootstrap";
import icons from "../icons";
import Wind from "./wind";
import MinMax from "./minMax";

const Current = ({now, temp, state, updateTemp}) => {
    const{icon, wind, curTemp, description } = now;
    return (
        <div className="current_data_wrapper">
            <Image src={icons[`${icon}`].default} alt="weather icon"/>
            <div className='temp_wrapper'>
                <Wind deg={wind.deg}/>
                <h2 className="temp">{curTemp}
                    <span>{temp !== 'metric' ? '\u2109' : '\u2103'}</span>
                </h2>
                <p className='description'>{description}</p>
                <MinMax state={state.current[0]} temp={temp}/>
            </div>
        </div>
    );
};

export default Current;