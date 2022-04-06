import * as React from 'react';
import { useState } from 'react';
import Application from './Application';
import Processes from './Processes';

interface AppProps {
  app: Application
}

interface Coords {
  x: number,
  y: number
}

export default function Window(props: AppProps){

  let app = props.app;

  const [coords, setCoords]: [Coords, Function] = useState({x: 100, y: 100});
  const [size, setSize]: [string[], Function] = useState(app.defaultSize);
  const [isFullScreen, setFullScreen]: [boolean, Function] = useState(false);
  const [windowStyles, setwindowStyles]: [any, Function] = useState({
    position: 'absolute',
    top: coords.y,
    left: coords.x,
    width: size[0],
    height: size[1],
    backgroundColor: '#fff',
    border: '1px solid #C4C4C4',
    borderRadius: '5px',
    overflow: 'hidden',
    zIndex: 1,
    boxSizing: 'border-box'
  });

  let circleStyles = {
    width: '0.8rem',
    height: '0.8rem',
    borderRadius: '50%',
    marginLeft: '0.5rem',
  }

  function fullScreen(){
    let copy = {...windowStyles};
    if (isFullScreen){
      copy.width = size[0];
      copy.height = size[1];
      copy.top = coords.y;
      copy.left = coords.x;
      copy.border = '1px solid #C4C4C4';
      setFullScreen(false);
    }
    else {
      copy.width = '100%';
      copy.height = '100%';
      copy.top = 0;
      copy.left = 0;
      copy.border = 'none';
      setFullScreen(true);
    }
    setwindowStyles(copy);
  }
  
  function stopProp(e: any){
    e.cancelbubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  return (
    <div onClick={stopProp} className='window' style={windowStyles as any}>
      <nav className='flex justify-between items-center px-2 h-6' style={{backgroundColor: '#c5c5c4'}}>
        <div>File &nbsp;&nbsp; Edit &nbsp;&nbsp; View</div>
        <div className='flex'>
          <div onClick={fullScreen} className='bg-green-600' style={circleStyles}></div>
          <div className='bg-yellow-500' style={circleStyles}></div>
          <div onClick={() => Processes.removeWindow(app)} className='bg-red-600' style={circleStyles}></div>
        </div>
      </nav>
      <div style={{width: '100%', height: '100%'}}>
        {app.code}
      </div>
    </div>
  );
  
}