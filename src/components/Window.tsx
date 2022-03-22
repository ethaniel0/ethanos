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
  const [coords, setCoords]: [Coords, Function] = useState({x: 0, y: 0});
  let app = props.app;
  

  return (
    <div>
      <nav className='flex justify-between' style={{width: app.defaultSize[0], height: app.defaultSize[1]}}>
        <div></div>
        <div></div>
      </nav>
    </div>
  );
  
}