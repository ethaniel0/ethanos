import * as React from 'react';
import { useState, useEffect } from 'react'
import AppDrawer from './AppDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import CommandLine from './CommandLine';
import FileApp from './FileApp';

function getTime(){
  let d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let half = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  return hours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + half
}
function getDay(){
  let d = new Date();
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let week = days[d.getDay()];
  let day = d.getDate();
  let month = d.getMonth() + 1;
  
  return week + ' ' + month + '/' + day;
}

export default function Taskbar(){
  const [time, setTime] = useState(getTime());
  const [day, setDay] = useState(getDay());
  const [tray, showTray] = useState(false);
  const [pinnedApps, setPinnedApps] = useState([
    '/E/Applications/Welcome.app',
    '/E/Applications/Present.app',
    '/E/Applications/Terminal.app'
  ]);
  const [drawerApps, setDrawerApps] = useState([
    '/E/Applications/Present.app',
    '/E/Applications/Terminal.app',
    '/E/Applications/Notepad.app',
    '/E/Applications/WaffleHacks2022Clue2.app',
    '/E/Applications/FaceAPI.app',
  ]);
  const [mobileDock, setmobileDock] = useState([
    '/E/Applications/Present.app',
    '/E/User/Desktop/mail.lnk',
    '/E/User/Desktop/devpost.lnk',
    '/E/User/Desktop/github.lnk',
  ]);

  const cmd = new CommandLine();

  useEffect(() => {
    let timeTimer = setInterval(() => setTime(getTime()), 1000);
    let dayTimer = setInterval(() => setDay(getDay()), 1000);

    return function cleanup() {
      clearInterval(timeTimer);
      clearInterval(dayTimer);
    };
  }, []);
  

  return (
    <>
      <div id='apptray' className='absolute w-48 p-2 left-2 rounded-lg grid grid-cols-3 gap-2 overflow-y-scroll' style={{bottom: tray ? '4.5rem' : '-15rem'}}>
          {drawerApps.map((path: string, index: number) => {
              let app = cmd.cwd.getFile(path);
              if (typeof app === 'object') return null;
              app = new app();
              return <img key={`apptray-${index}`} src={app.icon} alt="" className='w-12 h-12' onClick={() => cmd.command('open ' + path)} />
            })}

      </div>
      <div id='taskbar' className='relative flex justify-center mb-4 md:mb-0 md:justify-between h-16' style={{zIndex: 100000}}>
          {/* apps */}
          <div className='apps hidden grow md:flex items-center px-2 justify-start border-r-2 border-white'>
              <AppDrawer tray={tray} showTray={showTray} />
              {pinnedApps.map((path: string, index: number) => {
                let app = cmd.cwd.getFile(path);
                if (typeof app === 'object') return null;
                app = new app();
                let name = path.split('/').pop().split('.')[0];
                return <img title={name} key={`taskbar-${index}`} src={app.icon} alt={name + " app"} className='w-12 h-12 ml-2' onClick={() => cmd.command('open ' + path)} />
              })}
              
          </div>
          <div className='apps2 md:hidden grow h-full flex items-center px-2 justify-around border-r-2 border-white'>
              {mobileDock.map((path: string, index: number) => {
                let app = cmd.cwd.getFile(path);
                if (typeof app === 'object') return null;
                if (typeof app === 'string') return <FileApp key={`taskbar-${index}`} path={path} name={app} index={index} />;
                else if (typeof app === 'function') app = new app();
                return <img key={`taskbar-${index}`} src={app.icon2 ? app.icon2 : app.icon} alt="" className='w-12 h-12 ml-2' onClick={() => cmd.command('open ' + path)} />
              })}
              
          </div>

          {/* info */}
          <div className='info hidden md:flex w-48 h-full text-white justify-around items-center' style={{background: 'rgb(90, 90, 90)'}}>
            {/* sound */}
            <FontAwesomeIcon icon={faVolumeUp} className='text-xl' />
            {/* time */}
            <div className='flex flex-col text-center'>
              <span className='text-lg' style={{marginBottom: '-5px'}}>{time}</span>
              <span className='text-base'>{day}</span>
            </div>
          </div>
      </div>
    </>
  );
  
}