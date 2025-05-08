import React, { useState } from 'react';

const Toggle = ({ onChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
    }

    return (
        <div>
            <button onClick={handleToggle}>
                {isChecked ? 'ON' : 'OFF'}
            </button>
        </div>
    );
}

export default Toggle;