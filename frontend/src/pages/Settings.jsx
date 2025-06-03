import Toggle from '../components/toggle.jsx';
import { useTheme } from '../Hooks/darkMode.jsx';

const Settings = () => {
    const { dark, toggleTheme } = useTheme();

    return (
        <div className='centre-container'>
            <h1>Settings</h1>
            <h3>{dark ? 'Dark Mode' : 'Light mode'}</h3>
            <Toggle onChange={toggleTheme}/>
        </div>
    )
}

export default Settings;