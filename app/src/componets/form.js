import React, {Component} from 'react';
import {Form, Col, Button} from "react-bootstrap";

class CityForm extends Component {
    render() {
        return (
            <Form onSubmit={this.props.weatherMethod}>
                <Form.Group  className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                      City
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="city" placeholder="City title"/>
                    </Col>
                    <Button type="submit">Send</Button>
                </Form.Group>
            </Form>
        );
    }
}

export default CityForm;