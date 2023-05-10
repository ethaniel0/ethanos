import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Application from './Application';
import Processes from './Processes';
import Draggable from "react-draggable";
import Resizeable from './reusables/Resizeable';
import WindowNavbar from './reusables/WindowNavbar';

interface AppProps {
  app: Application,
  code: string
}

export default function Window(props: AppProps){

  let app = props.app;
  let ref = useRef(null);
  let minWidth = app.minWidth || 200;
  let minHeight = app.minHeight || 200;
  const [isFullScreen, setFullScreen]: [boolean, Function] = useState(false);
  
  const [code, setCode] = useState(props.code);
  const [screen, setScreen]: [number[], Function] = useState([0, 0]);

  let [coords, setCoords] = useState({x: app.spawnPoint[0], y: app.spawnPoint[1]});

  function xyMove(x: number, y: number) {
    if (x == null) x = coords.x;
    if (y == null) y = coords.y;
    setCoords({x, y});
  }

  function fullScreen(){
    setFullScreen(!isFullScreen);
  }
  
  function stopProp(e: any){
    e.cancelbubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  function onDrag(e: any, data: any){
    setCoords({x: data.x, y: Math.max(0, data.y)});
  }

  function windowClick(e: any){
    stopProp(e);
    Processes.bringWindowToFront(code);
  }

  function closeWindow(){
    Processes.removeWindow(code);
  }

  useEffect(() => {
    function handleResize() {
      let width = window.innerWidth;
      let height = window.innerHeight;
      setScreen([width, height]);
      if (width > 0 && width <= 768) setFullScreen(true);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Draggable bounds='' handle='.navbar' disabled={isFullScreen} onDrag={onDrag} position={isFullScreen ? {x: 0, y: 0} : coords} onMouseDown={windowClick}>
      <div ref={ref} className={'window absolute flex flex-col overflow-hidden rounded-md' + (isFullScreen ? ' no-drag flex-grow w-screen h-full' : '')} onClick={windowClick}>
        <Resizeable 
          width={app.defaultSize[0]} 
          height={app.defaultSize[1]} 
          forceSize={isFullScreen} 
          move={xyMove} 
          minWidth={minWidth} 
          minHeight={minHeight}
          style={isFullScreen ? {border: 'none', width: '100%', height: '100%'} : {border: '1px solid #B4B4B4'}}
        >
          <div className='w-full h-full bg-white flex flex-col'>

            <WindowNavbar fullscreen={fullScreen} close={closeWindow} menu={app.menu} />

            {/* window body */}
            <div className="@container overflow-auto" style={{width: '100%', flexGrow: 1}}>
              {app.code(closeWindow)}
            </div>

          </div>
        </Resizeable>
      </div>
    </Draggable>
  );
  
}