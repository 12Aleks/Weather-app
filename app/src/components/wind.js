import React from 'react';

const Wind = ({deg}) => {
    return (
        <div className='wind'>
            <p>Wind:  <span style={{transform: `rotateZ(${deg}deg)`, position: 'absolute'}}>&#129041;</span></p>
        </div>
    );
};

export default Wind;
