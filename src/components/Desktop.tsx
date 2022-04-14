import * as React from 'react';
// import bkg from '../assets/bkg.png';
import { useState, useEffect } from 'react';
import Taskbar from './Taskbar';
import Processes from './Processes';
import Window from './Window';
import Application from './Application';
import Directory from './Directory';
import FileDisplay from './FileDisplay';

interface File {
    name: string;
    icon: string;
    size: string;
    [key: string]: any;
}

export default function Desktop(){
  const [windows, setWindows]: [React.ReactElement<Window, any>[], Function] = useState([])
  const [files, setFiles]: [any, Function] = useState([])

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

  // load files with useeffect
  useEffect(() => {
    async function loadFiles(){
      let dir = new Directory('/E/User/Desktop');
      let fs: any = {};
      for (let file of dir.getFiles()){
        console.log(dir.getFile(file));
        let resp = await fetch(dir.getFile(file));
        let json = await resp.json();
        fs[file] = json;
      }
      setFiles(fs);
    }
    loadFiles();
  }, [])


  return (
    <div id='desktop' className='relative flex flex-col w-screen h-screen bg-cover bg-center overflow-hidden' style={{backgroundImage: 'url(/assets/bkg.png)'}}>
      <Taskbar quickTasks={[]} />
      <div style={{width: '100%', flexGrow: 1,  position: 'relative'}}>

        
        <div className='absolute l-0 t-0 w-full h-full'>
          {windows.map((appl) => appl)}
        </div>

        <div className='p-6 flex flex-col flex-wrap absolute'>
          {Object.keys(files).map((name, ind) => {
            let file = files[name];
            return <FileDisplay key={ind} path='/E/User/Desktop' image={file.icon} name={name} />
          })}
        </div>
        
        
      </div>
    </div>
  );
  
}