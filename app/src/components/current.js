import {useContext} from 'react';
import Image from "react-bootstrap/Image";
import icons from "../icons";
import MinMax from "./minMax";
import {useTranslation} from "react-i18next";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Current = observer(() => {
    const {data} = useContext(Context);
    const {t} = useTranslation();
    const{icon, wind, curTemp, description } = data.today;

    return (
        <div className="current_wrapper">
            <div className='img_wrapper'>
                <Image src={icons[`${icon}`]} alt="weather icon"/>
                <div className='min_max'>
                    <p>{t('Sunrise')}: {data.today.sunrise}</p>
                    <p>{t('Sunset')}: {data.today.sunset}</p>
                </div>
            </div>
            <div className='temp_wrapper'>
                <div className='wind'>
                    <p>{t('Wind')}: {wind.speed} <span>{data.temp !== 'metric' ?`${t('H')}`:  `${t('M')}`}</span></p>
                </div>
                <h2 className="temp">{curTemp}
                    <span>{data.temp !== 'metric' ? '\u2109' : '\u2103'}</span>
                </h2>
                <p className='description'>{description}</p>
                <MinMax state={data.listDays.current[0]} />
            </div>
        </div>
    );
});

export default Current;
