import React from 'react';
import {Spinner} from "react-bootstrap";

const Loader = () => {
    return (
        <div>
            <div id="frame_circle">
                <div className="circle"></div>
                <div className="innerCircle"></div>
            </div>
            <div id="frame">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </div>
    );
};

export default Loader;
