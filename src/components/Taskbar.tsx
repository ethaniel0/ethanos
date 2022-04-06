import * as React from 'react';
import { useState } from 'react'
import Application from './Application';
import AppDrawer from './AppDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import Processes from './Processes';

// valid applications
import Present from '../apps/Present/Present';
import Terminal from '../apps/Terminal/Terminal';

interface TaskbarProps {
  quickTasks: string[];
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

function makeWindow(app: Application){
  // console.log(app);
  Processes.addWindow(app.newObject());
}

export default function Taskbar(props: TaskbarProps){
  let {quickTasks} = props;
  const [time, setTime] = useState(getTime());
  const [day, setDay] = useState(getDay());
  const [apps, setApps] = useState([new Present() as Application, new Terminal() as Application]);
  setInterval(() => setTime(getTime()), 1000);
  setInterval(() => setDay(getDay()), 1000);

  return (
    <div className='relative flex justify-between px-1 h-12 top-2'>
        {/* quick actions */}
        <div className={'h-full rounded-xl' + (quickTasks ? ' mx-1' : '')} style={{background: 'rgb(0, 0, 0, 0.6)'}}></div>
        {/* apps */}
        <div className='grow rounded-xl h-full mx-1 flex items-center px-2 justify-start' style={{background: 'rgb(0, 0, 0, 0.6)'}}>
            <AppDrawer />
            {apps.map((app: Application, index: number) => {
              return <img key={`taskbar-${index}`} src={app.icon} alt="" className='w-10 h-10 ml-2' onClick={() => makeWindow(app)} />
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