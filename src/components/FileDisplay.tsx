import * as React from 'react';
import { useState, useEffect } from 'react';
import Directory from './Directory';
import CommandLine from './CommandLine';

interface AppProps {
    name: string;
    path: string;
    pos: any;
    folder?: string;
    mobile?: boolean;
}

const FileDisplay = ({path, name, pos, mobile}: AppProps) => {
  let cmd = new CommandLine(path);
  function click(){
    console.log('name:', name);
    cmd.command(`open ${name}`);
  }
  let [image, setImage] = useState('');
  let [url, setURL]: [string, Function] = useState('');

  useEffect(() => {
    async function loadFiles(path: string, second: boolean){
      
      let dir = new Directory('/');
      let fs: any = {};
      let file = dir.getFile(path);
      if (typeof file === 'function'){
        let app = new file();
        return setImage(mobile ? app.icon2 ? app.icon2 : app.icon : app.icon);
      }
      let resp = await fetch(file);
      let json = await resp.json();

      if (json.onsite){
        loadFiles(json.url, true);
      }
      else {
        setImage(mobile ? json.icon2 ? json.icon2 : json.icon : json.icon);
        if (json.url){
          setURL(json.url);
        }
      }
    }
    loadFiles(path + '/' + name, false);
  }, []);

  function stopProp(e: any){
    e.stopPropagation();
    e.cancelBubble = true;
  }

  let left = pos ? pos[0] > 0 ? `${pos[0]*6}rem` : `calc(100vw - ${Math.abs(pos[0]*6)}rem)` : '';
  let top = pos ? pos[1] > 0 ? `${pos[1]*6}rem` : `calc(100vh - ${Math.abs(pos[1]*6)}rem)` : '';
  return (
    <div onClick={click} className={'text-center text-white font-bold flex flex-col items-center my-2 mr-2 select-none' + (pos ? ' absolute' : '')} style={{fontSize: '0.8rem', textShadow: '0 0.5px 2px black', left: left, top: top}}>
        {
          url !== '' ? 
          <a href={url} target='_blank' onClick={stopProp}><img src={image} alt="" className='w-16 h-16 select-none' /></a>
          :
          <img src={image} alt="" className='w-16 h-16 select-none' />
        }
        <span>{name}</span>
    </div>
  )
}

export default FileDisplay