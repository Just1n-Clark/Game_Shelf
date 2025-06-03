import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout';
import Home from './pages/Home';
import About from './pages/About';
import Settings from './pages/Settings';
import Search from './pages/Search';
import Library from './pages/Library';
import NotFound from './pages/NotFound';

import './App.css';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='settings' element={<Settings />} />
                <Route path="search" element={<Search />} />
                <Route path='library' element={<Library />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App;
