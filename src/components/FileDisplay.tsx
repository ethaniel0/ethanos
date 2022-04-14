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
    <div onClick={click} className='text-center text-white font-bold flex flex-col items-center my-2 mr-2' style={{fontSize: '0.8rem', textShadow: '0 0.5px 2px black'}}>
        <img src={image} alt="" className='w-16 h-16' />
        <span>{name}</span>
    </div>
  )
}

export default FileDisplay