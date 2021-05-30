import React, {useContext, useState} from 'react';
import {Form, Button} from "react-bootstrap";
import Context from "../context";

const Forms = ({submit}) => {
    const {city} = useContext(Context)


    return (
        <Form onSubmit={submit}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name='city' value={city}  placeholder="Enter city" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default Forms;