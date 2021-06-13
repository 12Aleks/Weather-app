import React from 'react';

const MinMax = ({state, temp}) => {

    return (
        <div className="min_max">
            <p className='min'>Min: {Math.ceil(state.temp.min)} <span>{temp !== 'metric' ? '\u2109' : '\u2103'}</span></p>
            <p className='max'>Max: {Math.ceil(state.temp.max)} <span>{temp !== 'metric' ? '\u2109' : '\u2103'}</span></p>
        </div>
    );
};

export default MinMax;