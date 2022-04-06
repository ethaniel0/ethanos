import * as React from 'react';
// import bkg from '../assets/bkg.png';
import { useState } from 'react';
import Taskbar from './Taskbar';
import Processes from './Processes';
import Window from './Window';
import Application from './Application';



export default function Desktop(){
  const [windows, setWindows]: [Application[], Function] = useState([])

  Processes.addWindow = function(app: Application) {
    let copy = [...windows];
    copy.push(app);
    setWindows(copy);
  }
  Processes.removeWindow = function(app: Application) {
    let copy = windows.filter(w => w !== app);
    setWindows(copy);
  }


  return (
    <div id='desktop' className='relative flex flex-col w-screen h-screen bg-cover bg-center' style={{backgroundImage: 'url(/assets/bkg.png)'}}>
      <Taskbar quickTasks={[]} />
      <div style={{width: '100%', flexGrow: 1,  position: 'relative'}}>

        {windows.map((appl, index) => {
          return <Window key={index} app={appl} />
          })}
      </div>
    </div>
  );
  
}