import * as React from 'react'
import CommandLine from './CommandLine';

interface AppProps {
    image: string;
    name: string;
    path: string;
}

const FileDisplay = ({path, image, name}: AppProps) => {
  let cmd = new CommandLine(path);
  function click(){
    console.log('CLICKING');
    cmd.command(`open ${name}`);
  }
  return (
    <div onClick={click} className='w-16 h-16 text-center text-white font-bold' style={{fontSize: '0.8rem', textShadow: '0 0.5px 2px black'}}>
        <img src={image} alt="" />
        <span>{name}</span>
    </div>
  )
}

export default FileDisplay