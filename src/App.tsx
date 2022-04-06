import * as React from 'react'
import { useState } from 'react'
import './App.css'
import Desktop from './components/Desktop'
import Processes from './components/Processes';
import Window from './components/Window';
import Application from './components/Application';

export default function App() {
  // render desktop and taskbar
  const [windows, setWindows]: [Application[], Function] = useState([])

  Processes.addWindow = function(app: Application) {
    let copy = [...windows];
    copy.push(app);
    setWindows(copy);
  }
  Processes.removeWindow = function(app: Application) {
    let copy = windows.filter(w => w === app);
    setWindows(copy);
  }

  console.log(windows);

  return (
    <main>
      <Desktop />
      {windows.map((appl, index) => {
        console.log('appl', appl)
        return <Window key={index} app={appl} />
        })}
    </main>
  )
}