import * as React from 'react';
import { useState } from 'react';
export default function Window(props) {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    let app = props.app;
    return (React.createElement("div", null,
        React.createElement("nav", { className: 'flex justify-between', style: { width: app.defaultSize[0], height: app.defaultSize[1] } },
            React.createElement("div", null),
            React.createElement("div", null))));
}
