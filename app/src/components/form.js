import React, { useState} from 'react';
import {Form, Button} from "react-bootstrap";
import {convert} from "../location";

const KEY = process.env.REACT_APP_KEY

const Forms = ({temp, setState, setCity, setLoading}) => {
    const [value, setValue] = useState('');

    const getCityWeather = async (value, temp) => {
        setLoading(true)
        try {
            if (value) {
                const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=${temp}&appid=${KEY}`)
                let rez = await data.json();
                setState({
                    city: rez.name,
                    country: rez.sys.country,
                    temp: rez.main.temp,
                    wind: rez.wind.speed.value,
                    windUnit: rez.wind.speed.unit,
                    windName: rez.wind.speed.name,
                    windDirection: rez.wind.direction,
                    clouds: rez.clouds.value,
                    icon: rez.weather[0].icon,
                    sunrise: convert(rez.sys.sunrise),
                    sunset: convert(rez.sys.sunset)
                })
                console.log(rez)
                setCity('')
            }

        } catch (e) {
            console.log('Error', e)
        }
    }

    function updateValue(e){
        e.preventDefault()
        setValue(e.target.value)
    }

    function submitForm(){
        getCityWeather(value, temp)
        setValue('')
    }

    return (
        <div className='content'>
            <Form.Control
                type="text"
                value={value}
                placeholder="Enter city"
                onChange={updateValue}
            />
            <div className="button_wrapper">
                <Button variant="primary" onClick={() => submitForm()}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default Forms;
