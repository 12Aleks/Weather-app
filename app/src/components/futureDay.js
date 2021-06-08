import React, {useEffect, useState} from 'react';
import {Image} from "react-bootstrap";
import icons from "../icons";
import {convert, weekWeather} from "../location";
import MinMax from "./minMax";

const KEY = process.env.REACT_APP_KEY;

const FutureDay = ({ day, temp, now, index}) => {
    const [selectDay, setSelectDay] = useState(0);
    const [futureWeek, setFutureWeek] = useState({});

    const {latitude, longitude, lang } = now;
    const dayFuture = convert(lang, day.dt);


    const getDay = async (selectDay) => {
        if(selectDay){
            const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=${lang}&units=${temp}&appid=${KEY}`);
            const rez = await data.json();
            setFutureWeek({
               rez: await weekWeather(rez.list, selectDay)
            });
        }
    };


    function allDay(index) {
        setSelectDay(index)
    }

    useEffect(() => {
        getDay(selectDay)
    }, [selectDay])

    return (
        <div style={{width: 25 + '%'}} className='day' onClick={() => allDay(index)}>
            <p>{dayFuture}</p>
            <Image src={icons[`${day.weather[0].icon}`].default} alt="weather icon"/>
            <MinMax temp={temp} state={day}/>
        </div>
    );
};

export default FutureDay;
