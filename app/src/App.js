import React, {useState} from 'react';
import {Container, Row, Col, Button, Image} from "react-bootstrap";
import GetLocations from "./components/getLocations";
import Forms from "./components/form";
import SunBackground from './assets/Images/sun.jpg'



function App() {
    const [state, setState] = useState({})
    const [temp, setTemp] = useState('metric')
    const [city, setCity] = useState('')
    const [locality, setLocality] =useState(false)

    const updateCity = value => {
        if (value.length > 2) {
            setCity(value)
        }
    }

    const updateState =  value => {
            setState(value);
            setCity('');
    }

    return (
        <Container style={{backgroundImage: `url(${SunBackground})`}}>
            <Row>
                <Col md={12}>
                    <div className='wrapper'>
                        <div className="data">
                            <GetLocations setLocations={updateState}/>
                            <Image src={`${process.env.REACT_APP_URL}assets/icons/${state.icon}.png`}  style={{width: 50, height: 50}}/>
                            {/*<img src={ `${process.env.REACT_APP_URL}/icons/${state.icon}.png`} style={{width: 50, height: 50}} alt=""/>*/}
                            {state.icon}
                            <p>{locality?'City':'Locality'}: {state.city}</p>
                            <p>Sunrise: {state.sunrise}</p>
                            <p>Sunset: {state.sunset}</p>

                        </div>
                        <Forms temp={temp} setState={updateState} setCity={updateCity}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
