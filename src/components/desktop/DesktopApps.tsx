import * as React from 'react'
import { useState } from 'react'
import Directory from '../Directory'
import FileDisplay from '../FileDisplay';

var fileLayout: any = {
  "github.lnk": [-4, -2.3],
  "linkedin.lnk": [-3, -2.3],
  "devpost.lnk": [-2, -2.3],
  "mail.lnk": [-1, -2.3]
}

const DesktopApps = () => {
    const [files, setFiles]: [any, Function] = useState((new Directory('/E/User/Desktop')).getFiles());
    const [sstart, setSStart]: [any, Function] = useState([-1, -1]);
    const [send, setSEnd]: [any, Function] = useState([-1, -1]);
    let desktop = React.useRef(null);

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
      <div ref={desktop} style={{width: '100%', flexGrow: 1,  position: 'relative'}} className='hidden sm:block' onMouseDown={setSelect} onMouseMove={setDrag} onMouseUp={clearSelect}>
        
        {/* files for desktop */}
        <div className='p-6 hidden md:flex flex-col flex-wrap absolute'>
          {files.map((name: string, ind: number) => {
            return <FileDisplay key={ind} path='/E/User/Desktop' name={name} pos={fileLayout[name]} />
          })}
        </div>
        
        {sstart[0] !== send[0] &&  
          <div id='desktop-select' className='absolute hidden md:block bg-[rgba(59,130,246,0.4)] border-[1px] border-blue-800' style={{top: Math.min(sstart[1], send[1]), left: Math.min(sstart[0], send[0]), width: Math.abs(sstart[0] - send[0]), height: Math.abs(sstart[1] - send[1])}}></div>
        }
      </div>
    )
}

export default DesktopApps