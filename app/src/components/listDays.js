import React from 'react';
import {Image} from "react-bootstrap";
import icons from "../icons";
import {convert, weekWeather} from "../location";
import MinMax from "./minMax";

const ListDays = ({day, temp, today, index, week, setSelected}) => {
    const {long, weekday} = convert(today.lang, day.dt);

    const getDay = async (select, long, weekday) => {
        setSelected({
            rez: await weekWeather(week.list, select),
            dayDate: {long, weekday}
        })
    }

    return (
        <div style={{width: 20 + '%'}} className='day' onClick={() => getDay(index, long, weekday)}>
            {index ? <div><p>{weekday}</p>
                    <p>{long}</p></div>:
                <div><p className='today'>Today</p></div>
            }
            <Image src={icons[`${day.weather[0].icon}`].default} alt="weather icon"/>
            <MinMax temp={temp} state={day}/>
        </div>
    );
};

export default ListDays;