import React, {useContext} from 'react';
import {Image} from "react-bootstrap";
import MinMax from "./minMax";
import icons from "../icons";
import {convert, weekWeather} from "../location";
import {useTranslation} from "react-i18next";

import {observer} from "mobx-react-lite";
import {Context} from "../index";

const ListDays = observer(({day, index, setSelected}) => {
    const {data} = useContext(Context);
    const {t} = useTranslation();

    const {long, weekday} = convert(data.today.lang, day.dt);
    const getDay = async (select, long, weekday) => {
        setSelected({
            rez: await weekWeather(data.week.list, select),
            dayDate: {long, weekday}
        })
    };

    return (
        <div style={{width: 20 + '%'}} className='day' onClick={() => getDay(index, long, weekday)}>
            {index ? <div><p>{weekday}</p>
                    <p>{long}</p></div>:
                <div><p className='today'>{t('Today')}</p></div>
            }
            <Image src={icons[`${day.weather[0].icon}`].default} alt="weather icon"/>
            <MinMax  state={day}/>
        </div>
    );
});

export default ListDays;
