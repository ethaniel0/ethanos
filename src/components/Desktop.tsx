import * as React from 'react';
// import bkg from '../assets/bkg.png';
import Taskbar from './Taskbar';



export default function Desktop(){
  return (
    <div id='desktop' className='relative w-screen h-screen bg-cover bg-center' style={{backgroundImage: 'url(/assets/bkg.png)'}}>
      <Taskbar quickTasks={[]} />

    </div>
  );
  
}