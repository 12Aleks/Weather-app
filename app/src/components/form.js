import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";
import {convert} from "../location";

const KEY = process.env.REACT_APP_KEY;

const Forms = ({temp, setState, setCity, lang}) => {
    const [value, setValue] = useState('');

    const getCityWeather = async (value, temp) => {

        try {
            if (value) {
                let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=${lang}&units=${temp}&appid=${KEY}`;
                let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=${lang}&units=${temp}&appid=${KEY}`;
                let apiUrl3 = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=${lang}&units=${temp}&appid=${KEY}`;
                const [currentData, futureData, rez] = await Promise.all([
                    fetch(apiUrl1).then(response => response.json()),
                    fetch(apiUrl2).then(response => response.json()),
                    fetch(apiUrl3).then(response => response.json()),
                ]);
                setState({
                    city: currentData.name,
                    country: currentData.sys.country,
                    curTemp: Math.ceil(currentData.main.temp),
                    icon: currentData.weather[0].icon,
                    description: currentData.weather[0].description,
                    sunrise: await convert(currentData.sys.country, 0, currentData.sys.sunrise),
                    sunset: await convert(currentData.sys.country, 0, currentData.sys.sunset),
                    wind: currentData.wind,
                });
                setCity('')
            }

        } catch (e) {
            console.log('Error', e)
        }
    };

    function updateValue(e) {
        e.preventDefault();
        setValue(e.target.value)
    }

    function submitForm() {
        getCityWeather(value, temp);
        setValue('')
    }

    return (
        <div className='form'>
            <Form.Control
                type="text"
                value={value}
                placeholder="Enter city"
                onChange={updateValue}
            />

            <Button variant="primary" onClick={() => submitForm()}>
                Submit
            </Button>
        </div>
    );
};

export default Forms;