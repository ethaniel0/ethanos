import * as React from 'react';
import AppDrawer from './AppDrawer';
export default function Taskbar(props) {
    let { quickTasks, apps } = props;
    return (React.createElement("div", { className: 'relative flex justify-between px-1 h-12 top-2' },
        React.createElement("div", { className: 'h-full rounded-xl' + (quickTasks ? ' mx-1' : ''), style: { background: 'rgb(0, 0, 0, 0.6)' } }),
        React.createElement("div", { className: 'grow rounded-xl h-full mx-1 flex items-center px-2 justify-start', style: { background: 'rgb(0, 0, 0, 0.6)' } },
            React.createElement(AppDrawer, null)),
        React.createElement("div", { className: 'w-48 rounded-xl h-full mx-1', style: { background: 'rgb(0, 0, 0, 0.6)' } })));
}
