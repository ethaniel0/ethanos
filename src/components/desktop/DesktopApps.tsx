import * as React from 'react'
import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import Directory from '../Directory'
import FileDisplay from '../FileDisplay';

var fileLayout: any = {
  "github.lnk": [-4, -2.3],
  "linkedin.lnk": [-3, -2.3],
  "devpost.lnk": [-2, -2.3],
  "mail.lnk": [-1, -2.3]
}

type ReactMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;


const FileView = ({files}: {files: string[]}) => {
  return (
    <div className='p-6 hidden md:flex flex-col flex-wrap absolute'>
      {files.map((name: string, ind: number) => {
        return <FileDisplay key={ind} path='/E/User/Desktop' name={name} pos={fileLayout[name]} />
      })}
    </div>
  );
}


const DesktopApps = () => {
    const [files, _] = useState(new Directory('/E/User/Desktop').getFiles());
    const [sstart, setSStart] = useState([-1, -1]);
    const [send, setSEnd] = useState([-1, -1]);
    let desktop = useRef(null);

    const setSelect = useCallback((e: ReactMouseEvent) => {
      let top = desktop.current.getBoundingClientRect().top;
      setSStart([e.clientX, e.clientY - top]);
      setSEnd([e.clientX, e.clientY - top]);
    }, []);

    const setDrag = useCallback((e: ReactMouseEvent) => {
      if (sstart[0] === -1) return;
      let top = desktop.current.getBoundingClientRect().top;
      setSEnd([e.clientX, e.clientY - top]);
    }, [sstart]);

    
    const clearSelect = useCallback(() => {
      setSStart([-1, -1]);
      setSEnd([-1, -1]);
    }, []);

    const fileview = useMemo(() => <FileView files={files} />, [files]);

    return (
      <div 
        ref={desktop} 
        style={{width: '100%', flexGrow: 1,  position: 'relative'}} 
        className='hidden sm:block' 
        onMouseDown={setSelect} onMouseMove={setDrag} onMouseUp={clearSelect}
      >
        
        {/* files for desktop */}
        {fileview}

        {/* selection box */}
        {sstart[0] !== send[0] &&  
          <div 
            id='desktop-select' 
            className='absolute hidden md:block bg-[rgba(59,130,246,0.4)] border-[1px] border-blue-800' 
            style={{
              top: Math.min(sstart[1], send[1]), 
              left: Math.min(sstart[0], send[0]), 
              width: Math.abs(sstart[0] - send[0]), 
              height: Math.abs(sstart[1] - send[1])
            }}
          ></div>
        }
      </div>
    )
}

export default DesktopApps