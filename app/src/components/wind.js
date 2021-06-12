import React from 'react';

const Wind = ({speed}) => {
    return (
        <div className='wind'>
            <p>Wind speed: {speed} <span> m/s </span></p>
        </div>
    );
};

export default Wind;