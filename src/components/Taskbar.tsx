import * as React from 'react';
import { useState, lazy } from 'react'
import Application from './Application';
import AppDrawer from './AppDrawer';
import AppList from './AppList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

interface TaskbarProps {
  quickTasks: string[];
  apps: Application[]
}

function importApp(app: string){
  return lazy(() =>
    import(`../apps/${app}/${app}`).catch(() => null)
  )
}

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

export default function Taskbar(props: TaskbarProps){
  let {quickTasks, apps} = props;
  const [time, setTime] = useState(getTime());
  const [day, setDay] = useState(getDay());
  setInterval(() => setTime(getTime()), 1000);
  setInterval(() => setDay(getDay()), 1000);

  return (
    <div className='relative flex justify-between px-1 h-12 top-2'>
        {/* quick actions */}
        <div className={'h-full rounded-xl' + (quickTasks ? ' mx-1' : '')} style={{background: 'rgb(0, 0, 0, 0.6)'}}></div>
        {/* apps */}
        <div className='grow rounded-xl h-full mx-1 flex items-center px-2 justify-start' style={{background: 'rgb(0, 0, 0, 0.6)'}}>
            <AppDrawer />
            {AppList.map(async (app: string) => {
              let App = await importApp(app);
              <img src={(App as unknown as Application).icon} alt="" />
            })}
        </div>
        {/* info */}
        <div className='w-48 rounded-xl h-full mx-1 text-white flex justify-around items-center' style={{background: 'rgb(0, 0, 0, 0.6)'}}>
          {/* sound */}
          <FontAwesomeIcon icon={faVolumeUp} className='text-xl' />
          {/* time */}
          <div className='flex flex-col text-center'>
            <span className='text-lg' style={{marginBottom: '-5px'}}>{time}</span>
            <span className='text-base'>{day}</span>
          </div>
        </div>
    </div>
  );
  
}