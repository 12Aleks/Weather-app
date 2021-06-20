import React from 'react';
import {Image} from "react-bootstrap";
import icons from "../icons";
import MinMax from "./minMax";
import {useTranslation} from "react-i18next";

const Current = ({today, temp, listDays}) => {
    const {t} = useTranslation();
    const{icon, wind, curTemp, description } = today;
    return (
        <div className="current_wrapper">
            <div className='img_wrapper'>
                <Image src={icons[`${icon}`].default} alt="weather icon"/>
                <div className='min_max'>
                    <p>{t('Sunrise')}: {today.sunrise}</p>
                    <p>{t('Sunset')}: {today.sunset}</p>
                </div>
            </div>
            <div className='temp_wrapper'>
                <div className='wind'>
                    <p>{t('Wind')}: {wind.speed} <span>{temp !== 'metric' ?`${t('H')}`:  `${t('M')}`}</span></p>
                </div>
                <h2 className="temp">{curTemp}
                    <span>{temp !== 'metric' ? '\u2109' : '\u2103'}</span>
                </h2>
                <p className='description'>{description}</p>
                <MinMax state={listDays.current[0]} temp={temp} t={t}/>
            </div>
        </div>
    );
};

export default Current;