import * as React from 'react';
// import bkg from '../assets/bkg.png';
import { useState, useEffect, useRef } from 'react';
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
  const [sstart, setSStart]: [any, Function] = useState([-1, -1]);
  const [send, setSEnd]: [any, Function] = useState([-1, -1]);
  let desktop = useRef(null);

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
  Processes.setWindows = setWindows;
  Processes.windows = windows;

  // load files with useeffect
  useEffect(() => {
    async function loadFiles(){
      let dir = new Directory('/E/User/Desktop');
      let fs: any = {};
      for (let file of dir.getFiles()){
        let resp = await fetch(dir.getFile(file));
        let json = await resp.json();
        fs[file] = json;
      }
      setFiles(fs);
    }
    loadFiles();
  }, [])

  function setSelect(e: any){
    let top = desktop.current.getBoundingClientRect().top;
    setSStart([e.clientX, e.clientY - top]);
    setSEnd([e.clientX, e.clientY - top]);
  }
  function setDrag(e: any){
    if (sstart[0] === -1) return;
    let top = desktop.current.getBoundingClientRect().top;
    setSEnd([e.clientX, e.clientY - top]);
  }
  function clearSelect(){
    setSStart([-1, -1]);
    setSEnd([-1, -1]);
  }


  return (
    <div id='desktop' onMouseDown={setSelect} onMouseMove={setDrag} onMouseUp={clearSelect} className='relative flex flex-col w-screen h-screen bg-cover bg-center overflow-hidden' style={{backgroundImage: 'url(/assets/bkg.png)'}}>
      <Taskbar quickTasks={[]} />
      <div ref={desktop} style={{width: '100%', flexGrow: 1,  position: 'relative'}}>

        
        <div className='absolute l-0 t-0 w-full h-full' onClick={() => console.log('click desk 3')}>
          {windows.map((appl) => appl)}
        </div>

        <div className='p-6 flex flex-col flex-wrap absolute'>
          {Object.keys(files).map((name, ind) => {
            let file = files[name];
            return <FileDisplay key={ind} path='/E/User/Desktop' image={file.icon} name={name} />
          })}
        </div>
        
        {sstart[0] !== send[0] &&  
          <div id='desktop-select' className='absolute bg-[rgba(59,130,246,0.4)] border-[1px] border-blue-800' style={{top: Math.min(sstart[1], send[1]), left: Math.min(sstart[0], send[0]), width: Math.abs(sstart[0] - send[0]), height: Math.abs(sstart[1] - send[1])}}></div>
        }
      </div>
    </div>
  );
  
}