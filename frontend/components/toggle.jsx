import React, { useState } from 'react';
import Switch from '@mui/material/Switch';

const Toggle = ({ onChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
    }

    return (
        <div>
            <Switch
                checked={isChecked}
                onChange={handleToggle}
            />
        </div>
    );
}

export default Toggle;