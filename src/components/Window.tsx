import * as React from 'react';
import { useState } from 'react';
import Application from './Application';

interface AppProps {
  app: Application
}

interface Coords {
  x: number,
  y: number
}

export default function Window(props: AppProps){
  const [coords, setCoords]: [Coords, Function] = useState({x: 100, y: 100});
  
  let app = props.app;

  let windowStyles = {
    position: 'absolute',
    top: coords.y,
    left: coords.x,
    width: app.defaultSize[0],
    height: app.defaultSize[1],
    backgroundColor: '#fff',
    border: '1px solid #000',
    borderRadius: '5px',
    boxShadow: '0px 0px 5px #000',
    overflow: 'hidden',
    zIndex: 1
  }
  

  return (
    <div className='window' style={windowStyles as any}>
      <nav className='flex justify-between items-center px-2 h-6 bg-gray-200'>
        <div>This is a navbar</div>
        <div></div>
      </nav>
      <div style={{width: '100%', height: '100%'}}>
        {app.code()}
      </div>
    </div>
  );
  
}