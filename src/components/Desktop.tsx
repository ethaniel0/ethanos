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

var fileLayout: any = {
  "github.lnk": [-5, -2.3],
  "linkedin.lnk": [-4, -2.3],
  "devpost.lnk": [-3, -2.3],
  "replit.lnk": [-2, -2.3],
  "mail.lnk": [-1, -2.3]
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
      <div className='absolute top-0 left-0 w-full h-full  bg-cover' style={{backgroundImage: 'url(/assets/bkg.png)', fontFamily: 'Quicksand'}}>
        <div id='desktop-black' className='absolute right-0 w-4/5 h-full bg-neutral-900'>
          <div className='grid grid-cols-2 grid-rows-3 absolute right-0 w-10/12 h-4/5'>
            <span className='text-white font-bold self-end text-6xl' style={{left: '40vw', top: '20vh', paddingLeft: '20%'}}>Hi, I'm Ethan</span>
            
            <img src="/assets/face.png" alt="" className='row-span-3 justify-self-center self-center' style={{maxHeight: '60vh', maxWidth: '100%', right: '6vw', top: '3vh'}} />
            
            <div className='row-span-2 text-white self-center relative' style={{left: '-6%'}}>
              <span className='text-5xl mt-4 block' style={{paddingLeft: '10%'}}>I'm also a:</span>
                <span className='text-5xl block'>
                  <span style={{color: '#FA6666', paddingLeft: '6%'}}>coder</span>, <span  style={{color: '#FFC671'}}>engineer</span>,<br />
                  <span  style={{color: '#FA66AD', paddingLeft: '3%'}}>designer</span>, and <br />
                  <span  style={{color: '#69E4CE'}}>master of puns</span>
              </span>
            </div>
          </div>
          <div className='text-white absolute text-4xl w-full flex justify-between' style={{bottom: '15%', paddingLeft: '8%', paddingRight: '6%'}}>
            <span >← Check out my stuff</span>
            <div className='inline-flex ml-4 flex-wrap'>
                {/* <a href="https://github.com/ethaniel0" target='_blank'><img className='h-12 mr-4 mb-4 cursor-pointer' src="/assets/icons/github.svg" alt="" /></a>
                <a href="https://www.linkedin.com/in/ethan-horowitz-163b791ab/" target='_blank'><img className='h-12 mr-4 mb-4 cursor-pointer' src="/assets/icons/linkedin.svg" alt="" /></a>
                <a href="https://devpost.com/ethanhorowitz07?ref_content=user-portfolio" target='_blank'><img className='h-12 mr-4 mb-4 cursor-pointer' src="/assets/icons/devpost.svg" alt="" /></a>
                <a href="https://replit.com/@EthanHorowitz" target='_blank'><img className='h-12 mr-4 mb-4 cursor-pointer' src="/assets/icons/replit.svg" alt="" /></a>
                <a href="mailto:ethan.horowitz@duke.edu"><img className='h-12 mr-4 mb-4 cursor-pointer' src="/assets/icons/mail.svg" alt="" /></a> */}
            </div>
          </div>
          
        </div>
      </div>

      <div ref={desktop} style={{width: '100%', flexGrow: 1,  position: 'relative'}}>
        
        <div className='absolute l-0 t-0 w-full h-full'>
          {windows.map((appl) => appl)}
        </div>

        <div className='p-6 flex flex-col flex-wrap absolute'>
          {Object.keys(files).map((name, ind) => {
            let file = files[name];
            return <FileDisplay key={ind} path='/E/User/Desktop' image={file.icon} name={name} pos={fileLayout[name]} />
          })}
        </div>
        
        {sstart[0] !== send[0] &&  
          <div id='desktop-select' className='absolute bg-[rgba(59,130,246,0.4)] border-[1px] border-blue-800' style={{top: Math.min(sstart[1], send[1]), left: Math.min(sstart[0], send[0]), width: Math.abs(sstart[0] - send[0]), height: Math.abs(sstart[1] - send[1])}}></div>
        }
      </div>
      <Taskbar quickTasks={[]} />
    </div>
  );
  
}