import React from 'react';
import '../style/background.scss'
import cloud1 from '../assets/cloud/cloud-01.png'
import cloud2 from '../assets/cloud/cloud-02.png'
import cloud3 from '../assets/cloud/cloud-03.png'
import cloud4 from '../assets/cloud/cloud-04.png'

const Background = () => {
    return (
        <div >
            <div className="sun">
                <div className="ray_box">
                    <div className="ray ray1"></div>
                    <div className="ray ray2"></div>
                    <div className="ray ray3"></div>
                    <div className="ray ray4"></div>
                    <div className="ray ray5"></div>
                    <div className="ray ray6"></div>
                    <div className="ray ray7"></div>
                    <div className="ray ray8"></div>
                    <div className="ray ray9"></div>
                    <div className="ray ray10"></div>
                </div>
            </div>
            <div className="cloud">
                <img src={cloud1} alt="" className="cloud1"/>
                <img src={cloud2} alt="" className="cloud2"/>
                <img src={cloud3} alt="" className="cloud3"/>
                <img src={cloud4} alt="" className="cloud4"/>
            </div>
        </div>
    );
};

export default Background;