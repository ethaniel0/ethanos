import * as React from 'react'
import CommandLine from './CommandLine';

interface AppProps {
    image: string;
    name: string;
    path: string;
    pos: any;
}

const FileDisplay = ({path, image, name, pos}: AppProps) => {
  let cmd = new CommandLine(path);
  function click(){
    cmd.command(`open ${name}`);
  }
  let left = pos ? pos[0] > 0 ? `${pos[0]*6}rem` : `calc(100vw - ${Math.abs(pos[0]*6)}rem)` : '';
  let top = pos ? pos[1] > 0 ? `${pos[1]*6}rem` : `calc(100vh - ${Math.abs(pos[1]*6)}rem)` : '';
  return (
    <div onClick={click} className={'text-center text-white font-bold flex flex-col items-center my-2 mr-2 select-none' + (pos ? ' absolute' : '')} style={{fontSize: '0.8rem', textShadow: '0 0.5px 2px black', left: left, top: top}}>
        <img src={image} alt="" className='w-16 h-16 select-none' />
        <span>{name}</span>
    </div>
  )
}

export default FileDisplay