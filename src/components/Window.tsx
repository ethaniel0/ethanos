import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Application from './Application';
import Processes from './Processes';
import Draggable from "react-draggable";
import { faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';

interface AppProps {
  app: Application,
  code: string
}

export default function Window(props: AppProps){

  let app = props.app;
  let ref = useRef(null);
  let minWidth = app.minWidth || 200;
  let minHeight = app.minHeight || 200;
  const size = app.defaultSize;
  const [isFullScreen, setFullScreen]: [boolean, Function] = useState(false);
  const [windowStyles, setwindowStyles]: [any, Function] = useState({
    position: 'absolute',
    width: size[0],
    height: size[1],
    backgroundColor: '#fff',
    border: '1px solid #B4B4B4',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
    borderRadius: '5px',
    overflow: 'hidden',
    zIndex: 1,
    boxSizing: 'border-box'
  });
  const [code, setCode] = useState(props.code);
  const [screen, setScreen]: [number[], Function] = useState([0, 0]);

  let [coords, setCoords] = useState({x: app.spawnPoint[0], y: app.spawnPoint[1]});

  function fullScreen(){
    let copy = {...windowStyles};
    if (isFullScreen){
      copy.width = size[0];
      copy.height = size[1];
      copy.border = '1px solid #C4C4C4';
      setFullScreen(false);
    }
    else {
      copy.width = '100%';
      copy.height = '100%';
      copy.border = 'none';
      setFullScreen(true);
    }
    setwindowStyles(copy);
  }
  
  function stopProp(e: any){
    e.cancelbubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  function onDrag(e: any, data: any){
    setCoords({x: data.x, y: Math.max(0, data.y)});
  }

  function getNum(s: string){
    let allowed = '1234567890';
    let c = '';
    for (let i = 0; i < s.length; i++){
      if (allowed.includes(s.charAt(i))) c += s.charAt(i);
      else break; 
    }
    return parseInt(c);
  }

  function shiftTop(e: any, data: any){
    let copy = {...windowStyles};
    
    let curHeight = getNum(copy.height);
    let y = coords.y;
    let dy = data.y;
    y = Math.min(Math.max(y + dy, 0), y + curHeight - minHeight);
    let newHeight = curHeight + (coords.y - y);
    copy.height = newHeight + 'px';

    setwindowStyles(copy);
    setCoords({x: coords.x, y: y});
  }
  function shiftBottom(e: any, data: any){
    let copy = {...windowStyles};
    
    let curHeight = getNum(copy.height);
    let newHeight = Math.max(minHeight, curHeight + data.deltaY);
    copy.height = newHeight + 'px';
    setwindowStyles(copy);
  }
  function shiftLeft(e: any, data: any){
    let copy = {...windowStyles};
    
    let curWidth = getNum(copy.width);
    let x = coords.x;
    let dx = data.x;
    x = Math.min(Math.max(x + dx, 0), x + curWidth - minWidth);
    let newWidth = curWidth + (coords.x - x);
    copy.width = newWidth + 'px';

    setwindowStyles(copy);
    setCoords({x: x, y: coords.y});
  }
  function shiftRight(e: any, data: any){
    let copy = {...windowStyles};
    
    let curWidth = getNum(copy.width);
    let newWidth = Math.max(minWidth, curWidth + data.deltaX);
    copy.width = newWidth + 'px';
    setwindowStyles(copy);
  }
  function shiftTopLeft(e: any, data: any){
    let copy = {...windowStyles};
    
    let curHeight = getNum(copy.height);
    let y = coords.y;
    let dy = data.y;
    y = Math.min(Math.max(y + dy, 0), y + curHeight - minHeight);
    let newHeight = curHeight + (coords.y - y);
    copy.height = newHeight + 'px';

    let curWidth = getNum(copy.width);
    let x = coords.x;
    let dx = data.x;
    x = Math.min(Math.max(x + dx, 0), x + curWidth - minWidth);
    let newWidth = curWidth + (coords.x - x);
    copy.width = newWidth + 'px';

    setwindowStyles(copy);
    setCoords({x: x, y: y});
  }
  function shiftTopRight(e: any, data: any){
    let copy = {...windowStyles};
    
    let curHeight = getNum(copy.height);
    let y = coords.y;
    let dy = data.y;
    y = Math.min(Math.max(y + dy, 0), y + curHeight - minHeight);
    let newHeight = curHeight + (coords.y - y);
    copy.height = newHeight + 'px';

    let curWidth = getNum(copy.width);
    let newWidth = Math.max(minWidth, curWidth + data.deltaX);
    copy.width = newWidth + 'px';

    setwindowStyles(copy);
    setCoords({x: coords.x, y: y});
  }
  function shiftBottomLeft(e: any, data: any){
    let copy = {...windowStyles};
    
    let curHeight = getNum(copy.height);
    let newHeight = Math.max(minHeight, curHeight + data.deltaY);
    copy.height = newHeight + 'px';

    let curWidth = getNum(copy.width);
    let x = coords.x;
    let dx = data.x;
    x = Math.min(Math.max(x + dx, 0), x + curWidth - minWidth);
    let newWidth = curWidth + (coords.x - x);
    copy.width = newWidth + 'px';

    setwindowStyles(copy);
    setCoords({x: x, y: coords.y});
  }
  function shiftBottomRight(e: any, data: any){
    let copy = {...windowStyles};
    
    let curHeight = getNum(copy.height);
    let newHeight = Math.max(minHeight, curHeight + data.deltaY);
    copy.height = newHeight + 'px';

    let curWidth = getNum(copy.width);
    let newWidth = Math.max(minWidth, curWidth + data.deltaX);
    copy.width = newWidth + 'px';

    setwindowStyles(copy);
  }

  function windowClick(e: any){
    stopProp(e);
    Processes.bringWindowToFront(code);
  }

  function closeWindow(){
    console.log('removing', code);
    Processes.removeWindow(code)
  }

  useEffect(() => {
    function handleResize() {
      setScreen([window.innerWidth, window.innerHeight]);
    }
    setScreen([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <Draggable bounds='' handle='.navbar' disabled={screen[0] <= 768} onDrag={onDrag} position={screen[0] > 768 ? coords : {x: 0, y: 0}} onMouseDown={windowClick}>
        <div ref={ref} onClick={windowClick} className={'window  ' + (isFullScreen ? ' no-drag' : '')} style={windowStyles as any}>
          <nav className='navbar flex justify-end md:justify-between items-center px-2 md:h-6' style={{backgroundColor: '#c5c5c4'}}>
            <div className='md:flex gap-4 hidden'>
              {
                Object.keys(app.menu).map(key => (
                  <span className='cursor-pointer'>{key}</span>
                ) )
              }
            </div>
            <div className='flex'>
              <div onClick={fullScreen} className='window-circle bg-green-600 hidden md:block'></div>
              <div className='window-circle bg-yellow-500 hidden md:block'></div>
              <div onClick={closeWindow} className='window-circle bg-red-600 justify-center items-center hidden md:block'></div>
            </div>
          </nav>
          <div style={{width: '100%', height: '100%', overflow: 'scroll'}}>
            {app.code(isFullScreen ? [window.innerWidth, ref.current.clientHeight] : [getNum(windowStyles.width), getNum(windowStyles.height)], closeWindow)}
          </div>
          {/* top */}
          <Draggable onDrag={shiftTop} position={{x: 0, y: 0}}>
            <div className='resize-area top'></div>
          </Draggable>
          {/* left */}
          <Draggable onDrag={shiftLeft} position={{x: 0, y: 0}}>
            <div className='resize-area left'></div>
          </Draggable>
          {/* bottom */}
          <Draggable onDrag={shiftBottom} position={{x: 0, y: 0}}>
            <div className='resize-area bottom'></div>
          </Draggable>
          {/* right */}
          <Draggable onDrag={shiftRight} position={{x: 0, y: 0}}>
            <div className='resize-area right'></div>
          </Draggable>
          {/* top right */}
          <Draggable onDrag={shiftTopRight} position={{x: 0, y: 0}}>
            <div className='resize-area tr'></div>
          </Draggable>
          {/* top left */}
          <Draggable onDrag={shiftTopLeft} position={{x: 0, y: 0}}>
            <div className='resize-area tl'></div>
          </Draggable>
          {/* bottom right */}
          <Draggable onDrag={shiftBottomRight} position={{x: 0, y: 0}}>
            <div className='resize-area br'></div>
          </Draggable>
          {/* bottom left */}
          <Draggable onDrag={shiftBottomLeft} position={{x: 0, y: 0}}>
            <div className='resize-area bl'></div>
          </Draggable>
        </div>
    </Draggable>
  );
  
}