import * as React from 'react';
import { useState, useEffect, useRef, useContext, createContext, useCallback, useMemo } from 'react';
import Application from './Application';
import Processes from './Processes';
import Draggable from "react-draggable";
import Resizeable from './reusables/Resizeable';
import WindowNavbar from './reusables/WindowNavbar';
import { BottomBarContext } from './Desktop';

interface AppProps {
  app: Application,
  windowCode: string,
  startFullScreen?: boolean
}

export const WindowContext = createContext({
  close: () => {},
});

export default function Window({app, windowCode, startFullScreen}: AppProps){
  if (!startFullScreen) startFullScreen = false;

  const [isFullScreen, setFullScreen] = useState(startFullScreen);
  const [closing, setClosing] = useState(false);
  const [isDragging, setDragging] = useState(false);

  let [coords, setCoords] = useState({x: app.spawnPoint[0], y: app.spawnPoint[1]});
  let [firstRender, setFirstRender] = useState<boolean>(true);

  let bottomBarHeight = useContext(BottomBarContext);

  if (bottomBarHeight === 0) bottomBarHeight = 64;

  const ref = useRef(null);
  let minWidth = app.minWidth || 200;
  let minHeight = app.minHeight || 200;
  
  const code = windowCode;
  
  function stopProp(e: any){
    e.cancelbubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  const xyMove = useCallback((x: number, y: number) => { setCoords({x: x ?? coords.x, y: y ?? coords.y}); }, [coords]);

  const fullScreen = useCallback(() =>  setFullScreen(fs => !fs), []);

  const onDrag = useCallback((e: any, data: any) => {
    setCoords({x: data.x, y: Math.max(0, data.y)});
  }, []);

  const windowClick = useCallback((e: any) => {
    stopProp(e);
    Processes.bringWindowToFront(code);
  }, [code]);

  const closeWindow = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      Processes.removeWindow(code);
    }, 500);
  }, [code])

  const Applet = useMemo(() => app.code(), [app]);

  useEffect(() => {
    function handleResize() {
      let width = window.innerWidth;
      if (width > 0 && width <= 768) setFullScreen(true);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    setTimeout(() => setFirstRender(false), 500); 
  }, []);

  return (
    <WindowContext.Provider value={{close: closeWindow}}>
      <Draggable 
        nodeRef={ref}
        bounds='' 
        handle='.navbar' 
        disabled={isFullScreen} 
        onDrag={onDrag} 
        onStart={() => setDragging(true)} 
        onStop={() => setDragging(false)}
        position={isFullScreen ? {x: 0, y: 0} : coords} 
        onMouseDown={windowClick}
      >
        <div ref={ref} className={'window' + (isFullScreen ? ' no-drag flex-grow w-screen h-full' : '') + (closing ? ' closing' : '') + (firstRender ? ' animate' : '')} onClick={windowClick}>
          <Resizeable 
            width={app.defaultSize[0]} 
            height={app.defaultSize[1]} 
            forceSize={isFullScreen} 
            move={xyMove} 
            minWidth={minWidth} 
            minHeight={minHeight}
            isNonInteractive={isDragging}
            style={isFullScreen ? {border: 'none', width: '100%', height: `calc(100% - ${bottomBarHeight}px)`} : {border: '1px solid #B4B4B4'}}
          >
            <div className='w-full h-full flex flex-col'>

              <WindowNavbar fullscreen={fullScreen} close={closeWindow} menu={app.menu} />

              {/* window body */}
              <div className="@container overflow-hidden" style={{width: '100%', flexGrow: 1}}>
                {Applet}
              </div>

            </div>
          </Resizeable>
        </div>
      </Draggable>
    </WindowContext.Provider>
  );
  
}