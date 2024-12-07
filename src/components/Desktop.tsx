import * as React from 'react';
import { useState, useEffect, useRef, createContext } from 'react';
import Taskbar from './Taskbar';
import Processes from './Processes';
import Window from './Window';
import Application from './Application';
import HomeBar from './HomeBar';
import Welcome from '../apps/Welcome/Welcome';
import Background from './desktop/Background';
import DesktopApps from './desktop/DesktopApps';
import MobileApps from './desktop/MobileApps';
import CommandLine from './CommandLine';


export const BottomBarContext = createContext(64);

export default function Desktop(){
  const [windows, setWindows]: [React.ReactElement<Window, any>[], Function] = useState([])
  const [windowWidth, setWindowWidth]: [number, Function] = useState(1);

  const [bottomBarHeight, setBottomBarHeight]: [number, Function] = useState(0);
  const bottomBar = useRef(null);

  Processes.addWindow = function(app: Application, startFullScreen?: boolean) {
    if (!startFullScreen) startFullScreen = false;
    let key = Math.round(Math.random()*1e15) + '';
    let window = <Window app={app} key={key} windowCode={key} startFullScreen={startFullScreen} />
    let copy = [...windows];
    copy.push(window);
    setWindows(copy);
  }
  Processes.removeWindow = function(code: string) {
    let copy = windows.filter(w => w.key !== code);
    setWindows(copy);
  }
  Processes.setWindows = setWindows;
  Processes.windows = windows;

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      document.getElementById('desktop').style.height = window.innerHeight + 'px';
    }
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    document.getElementById('desktop').style.height = window.innerHeight + 'px';

    if(bottomBar.current){
      setBottomBarHeight(bottomBar.current.getBoundingClientRect().height);
    }

    if (!localStorage.getItem("welcome") && window.location.pathname === '/') {
      localStorage.setItem("welcome", "true");
      let start = new Welcome([]);
      Processes.addWindow(start, true);
    }
    
  }, []);

  useEffect(() => {
    // check url for app
    let url = window.location.pathname;
    if (url.startsWith('/')) url = url.substring(1);
    
    let url_parts = url.split('/');
    if (url_parts.length === 0) return;
    let app = url_parts[0];
    let subparts = '"' + url_parts.splice(1).map(part => decodeURIComponent(part)).join(' ') + '"';
    
    // check for app in directory
    let cmd = new CommandLine();
    let command = 'open /E/Applications/' + app + '.app ' + subparts;
    cmd.command(command);
  }, []);


  return (
    <div id='desktop'  className='relative flex flex-col w-screen h-screen bg-cover bg-center overflow-hidden' style={{backgroundImage: 'url(/assets/bkg.png)'}}>
      {/* background */}
      <Background />

      <DesktopApps />
      <MobileApps />
      
      <BottomBarContext.Provider value={bottomBarHeight}>
        {windows.map((appl) => appl)}
      </BottomBarContext.Provider>


      {/* taskbar */}
      {
        windowWidth > 768 ? 
          <div ref={bottomBar}><Taskbar /> </div>
            : windows.length === 0 ? 
              <Taskbar /> 
              : <HomeBar />
      }

    </div>
  );
  
}