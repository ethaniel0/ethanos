import * as React from 'react';

export default function AppDrawer({showTray, tray}: any){
  return (
    <div className='relative'>
        <img src="/assets/appdrawer.svg" alt="" className='w-12 h-12' onClick={() => showTray(!tray)} />
    </div>
  );
  
}