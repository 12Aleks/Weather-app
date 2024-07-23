
const Temp = ({temp, handleClick}) => {
    return (
        <div onClick={handleClick} className="ToggleSwitch">
            <div
                className={temp !== 'metric' ? 'knob active' : 'knob'}>
                {temp !== 'metric' ? `\u2109`: '\u2103'}
            </div>
        </div>
    );
};

export default Temp;
