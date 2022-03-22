import * as React from 'react';
import './App.css';
import Desktop from './components/Desktop';
export default function App() {
    // render desktop and taskbar
    return (React.createElement("main", null,
        React.createElement(Desktop, null)));
}
