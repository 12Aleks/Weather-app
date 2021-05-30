import React from 'react';
import Info from "./componets/info";
import Weather from "./componets/weather";
import {Container, Col} from "react-bootstrap";
import CityForm from "./componets/form";

const KEY = process.env.REACT_APP_API_KEY

class App extends React.Component {

    gettingWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value
        let api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`)
        let data = await api_url.json()
        console.log(data)
    }

    render() {
        return (
            <Container>
                <Col>
                    <Info/>
                    <CityForm weatherMethod={this.gettingWeather}/>
                    <Weather />
                </Col>
            </Container>

        );
    }
}

export default App;
