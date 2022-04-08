import * as React from 'react';
// import bkg from '../assets/bkg.png';
import { useState } from 'react';
import Taskbar from './Taskbar';
import Processes from './Processes';
import Window from './Window';
import Application from './Application';



export default function Desktop(){
  const [windows, setWindows]: [React.ReactElement<Window, any>[], Function] = useState([])

  const selector = useState([-1, -1])

  Processes.addWindow = function(app: Application) {
    let key = Math.round(Math.random()*1e15) + '';
    let window = <Window app={app} key={key} code={key} />
    let copy = [...windows];
    copy.push(window);
    setWindows(copy);
  }
  Processes.removeWindow = function(code: string) {
    let copy = windows.filter(w => w.key !== code);
    setWindows(copy);
  }

  return (
    <div id='desktop' className='relative flex flex-col w-screen h-screen bg-cover bg-center' style={{backgroundImage: 'url(/assets/bkg.png)'}}>
      <Taskbar quickTasks={[]} />
      <div style={{width: '100%', flexGrow: 1,  position: 'relative'}}>

        {windows.map((appl, index) => (appl))}
      </div>
    </div>
  );
  
}