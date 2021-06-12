import React, {useEffect, useState} from 'react';
import {Image} from "react-bootstrap";
import icons from "../icons";
import {convert, weekWeather} from "../location";
import MinMax from "./minMax";

const KEY = process.env.REACT_APP_KEY;

const FutureDay = ({day, temp, today, index,  setSelected}) => {
    const [week, setWeek] = useState(0);

    const {latitude, longitude, lang} = today;
    const dayFuture = convert(lang, day.dt);

    const getWeek = async (temp) => {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=${lang}&units=${temp}&appid=${KEY}`);
        const rez = await data.json();
        setWeek(rez);
    };

    const getDay = async(select) => {
        setSelected({
            rez:  await weekWeather(week.list, select)
        })
    }

    useEffect(() => {
        getWeek(temp)
    }, [temp]);

    return (
        <div style={{width: 25 + '%'}} className='day' onClick={() => getDay(index)}>
            <p>{dayFuture}</p>
            <Image src={icons[`${day.weather[0].icon}`].default} alt="weather icon"/>
            <MinMax temp={temp} state={day}/>
        </div>
    );
};

export default FutureDay;