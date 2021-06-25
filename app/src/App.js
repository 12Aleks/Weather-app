import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {observer} from "mobx-react-lite";
import Current from "./components/current";
import Forms from "./components/form";
import ListDays from "./components/listDays";
import Future from "./components/future";
import {useTranslation} from "react-i18next";

import Background from './assets/background/spring.jpg'

import {convert, getLanguage, getLocation} from "./location";
import {Context} from "./index";


const KEY = process.env.REACT_APP_KEY;
const KEY_S = process.env.REACT_APP_KEY_SECOND;

const App = observer(() => {
    const {data} = useContext(Context);
    const {t} = useTranslation();
    const [loading, setLoading] = useState(true);
    const lang = getLanguage();

    const getLocationsWeather = async (temp, city) => {
        try {
            const {coords} = await getLocation(city);
            let {latitude, longitude} = coords;
            if (latitude && longitude) {
                let apiUrl = `lat=${latitude}&lon=${longitude}&lang=${lang}&units=${temp}&appid=${KEY}`;

                const [currentData, futureData, rez] = await Promise.all([
                    fetch(`https://api.openweathermap.org/data/2.5/weather?${apiUrl}`).then(response => response.json()),
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?${apiUrl}`).then(response => response.json()),
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?${apiUrl}`).then(response => response.json()),
                ]);

                data.setToday({
                    city: currentData.name,
                    country: currentData.sys.country,
                    lang: lang,
                    curTemp: Math.ceil(currentData.main.temp),
                    icon: currentData.weather[0].icon,
                    description: currentData.weather[0].description,
                    sunrise: await convert(currentData.sys.country, 0, currentData.sys.sunrise),
                    sunset: await convert(currentData.sys.country, 0, currentData.sys.sunset),
                    wind: currentData.wind,
                    latitude: latitude,
                    longitude: longitude,
                });

                data.setDay({
                    data: await convert(lang),
                });

                data.setListDays({
                    week: futureData.daily.slice(0, 5),
                    current: futureData.daily.slice(0, 1),
                });

                data.setWeek(rez);
                data.setSelectedDay(null);

                setLoading(false);
            }
        } catch (e) {
            console.log("Error", e)
        }
    };

    const updateTemp = () => {
        data.temp === 'metric' ? data.setTemp('imperial') : data.setTemp('metric');
    };

    useEffect(() => {
        if (!data.city) return getLocationsWeather(data.temp);
        return getLocationsWeather(data.temp, data.city);
    }, [data.temp, data.city]);

    const updateSelected = value => {
        data.setSelectedDay(value);
        data.setDay({
            data: {
                weekday: value.dayDate.weekday,
                day: value.dayDate.long
            },
        })
    };

    const currentDay = async () => {
        data.setSelectedDay(null);
        data.setActive(null);
        data.setDay({
            data: await convert(data.today.lang),
        });
    };

    return (
        <Container fluid style={{backgroundImage: `url(${Background})`}}>
            <Row>
                <Col md={12}>
                    <div className="wrapper">
                        {loading ? <Spinner animation="border" variant="light"/> : <div className='main_wrapper'>
                            <h1>{data.day.data.weekday}, {data.day.data.day}</h1>
                            <div className="main">
                                <div className='data'>
                                    <p>{!data.city ? `${t('Locality')}` : `${t('City')}`}: {data.today.city}, {data.today.country}</p>
                                    {data.city ? <p className='hover' onClick={() => {
                                        getLocationsWeather('metric');
                                        data.setActive(null);
                                        data.setCity('');
                                    }}>{t('Current')}</p> : !data.selectedDay && <Forms />}
                                    {data.selectedDay && <p className='hover' onClick={currentDay}>{t('more')}</p>}
                                </div>
                                {data.selectedDay ?
                                    <Future/> :
                                    <div>
                                        <div onClick={updateTemp} className="ToggleSwitch">
                                            <div
                                                className={data.temp !== 'metric' ? 'knob active' : 'knob'}>
                                                {data.temp !== 'metric' ? `\u2109` : '\u2103'}
                                            </div>
                                        </div>
                                        <Current/>
                                    </div>
                                }
                            </div>
                            <div className="future_wrapper">
                                {
                                    data.listDays.week.map((el, index) => {
                                        return <ListDays key={el.dt}
                                                         day={el}
                                                         index={index}
                                                         setSelected={updateSelected}/>
                                    })
                                }
                            </div>
                        </div>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default App;
