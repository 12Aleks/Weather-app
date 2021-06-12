import React from 'react';

const TempStandard = ({temp, handleClick}) => {
    return (
        <div>

            <div onClick={handleClick} className="ToggleSwitch">
                <div
                    className={temp !== 'metric' ? 'knob active' : 'knob'}>
                    {temp !== 'metric' ? `\u2109` : '\u2103'}
                </div>
            </div>
        </div>
    );
};

export default TempStandard;