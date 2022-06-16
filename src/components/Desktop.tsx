import * as React from 'react';
// import bkg from '../assets/bkg.png';
import { useState, useEffect, useRef } from 'react';
import Taskbar from './Taskbar';
import Processes from './Processes';
import Window from './Window';
import Application from './Application';
import Directory from './Directory';
import FileDisplay from './FileDisplay';
import { faMinimize } from '@fortawesome/free-solid-svg-icons';
import HomeBar from './HomeBar';

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
  const [files, setFiles]: [any, Function] = useState((new Directory('/E/User/Desktop')).getFiles())
  const [apps, setApps]: [any, Function] = useState((new Directory('/E/User/Homescreen')).getFiles())
  const [sstart, setSStart]: [any, Function] = useState([-1, -1]);
  const [send, setSEnd]: [any, Function] = useState([-1, -1]);
  const [windowWidth, setWindowWidth]: [number, Function] = useState(1);
  const [skew, setSkew]: [number, Function] = useState(12);
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

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
      setSkew(12*window.innerWidth / window.innerHeight);
      document.getElementById('desktop').style.height = window.innerHeight + 'px';
    }
    setWindowWidth(window.innerWidth);
    setSkew(12*window.innerWidth / window.innerHeight);
    window.addEventListener('resize', handleResize);
    document.getElementById('desktop').style.height = window.innerHeight + 'px';
  })


  return (
    <div id='desktop' onMouseDown={setSelect} onMouseMove={setDrag} onMouseUp={clearSelect} className='relative flex flex-col w-screen h-screen bg-cover bg-center overflow-hidden' style={{backgroundImage: 'url(/assets/bkg.png)'}}>
      {/* background */}
      <div className='absolute top-0 left-0 w-full h-full  bg-cover' style={{backgroundImage: 'url(/assets/bkg.png)', fontFamily: 'Quicksand'}}>
        <div id='desktop-black' className='absolute right-0 bg-neutral-900'>
          <div id='bkg-table' className='grid grid-cols-2 grid-rows-3 absolute right-0 w-full h-4/5 md:w-10/12'>
            <div className='order-1 md:hidden'></div>
            <span id='bkg-hi' className='text-white font-bold self-end text-6xl order-3 md:order-none' style={{left: '40vw', top: '20vh', paddingLeft: '20%'}}>Hi, I'm Ethan</span>
            
            <img id='bkg-face' src="/assets/face.png" alt="" className='row-span-3 justify-self-center self-center p-4 md:p-0 order-2 md:order-none' style={{maxHeight: '60vh', maxWidth: '100%', right: '6vw', top: '3vh'}} />
            

            <div className='backg-desc row-span-2 text-white self-center relative order-4 col-span-2 text-center md:text-left md:order-none md:col-auto' style={{left: '-6%', transform: `skew(-${skew}deg)`}}>
              <span className='text-5xl mt-4 block' style={{transform: `skew(${skew}deg)`}}>I'm a:</span>
                <span className='text-5xl block'>
                  <span style={{color: '#FA6666', display: 'inline-block', transform: `skew(${skew}deg)`}}>coder</span><span style={{display: 'inline-block', transform: `skew(${skew}deg)`}}>,</span> <span style={{color: '#FFC671',  display: 'inline-block', transform: `skew(${skew}deg)`}}>engineer</span><span style={{display: 'inline-block', transform: `skew(${skew}deg)`}}>,&nbsp;</span>
                  <span  style={{color: '#FA66AD', display: 'inline-block', transform: `skew(${skew}deg)`}}>designer</span><span style={{display: 'inline-block', transform: `skew(${skew}deg)`}}>,</span> <span style={{display: 'inline-block', transform: `skew(${skew}deg)`}}>and</span> <br />
                  <span  style={{color: '#69E4CE', display: 'inline-block', transform: `skew(${skew}deg)`}}>master of puns</span>
              </span>
            </div>
          </div>
          <div className='text-white absolute hidden md:block text-4xl w-full' style={{bottom: 'min(15%, 10vw)', paddingLeft: '8%', paddingRight: '6%'}}>
            <span>← Check out my stuff</span>
          </div>
          
        </div>
      </div>

      {/* apps */}
      <div ref={desktop} style={{width: '100%', flexGrow: 1,  position: 'relative'}}>
        
        <div className='absolute l-0 t-0 w-full h-full'>
          {windows.map((appl) => appl)}
        </div>

        <div className='p-6 hidden md:flex flex-col flex-wrap absolute'>
          {files.map((name: string, ind: number) => {
            // let file = files[name];
            return <FileDisplay key={ind} path='/E/User/Desktop' name={name} pos={fileLayout[name]} />
          })}
        </div>

        <div className='p-6 grid w-full md:hidden grid-cols-4 absolute'>
          {apps.map((name: string, ind: number) => {
            return <FileDisplay key={ind} path='/E/User/Homescreen' name={name} pos={fileLayout[name]} mobile={true} />
          })}
        </div>
        
        {sstart[0] !== send[0] &&  
          <div id='desktop-select' className='absolute hidden md:block bg-[rgba(59,130,246,0.4)] border-[1px] border-blue-800' style={{top: Math.min(sstart[1], send[1]), left: Math.min(sstart[0], send[0]), width: Math.abs(sstart[0] - send[0]), height: Math.abs(sstart[1] - send[1])}}></div>
        }
      </div>
      
      {/* taskbar */}
      {
        windowWidth > 768 ? <Taskbar /> : windows.length == 0 ? <Taskbar /> : <HomeBar />
      }
      
    </div>
  );
  
}