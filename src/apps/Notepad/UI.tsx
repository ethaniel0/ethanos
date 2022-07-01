import * as React from 'react';
import { useState, useEffect } from 'react';

const UI = ({ filePath }: any) => {
  const [text, setText] = useState('');

  useEffect(() => {
    async function loadFile() {
        let resp = await fetch(filePath);
        let json = await resp.text();
        setText(json);
    }
   if(filePath) loadFile();
  }, [filePath]);

  function typeText(e: any){
    setText(e.target.value);
  }

  return (
    <div className='w-full h-full'>
      <textarea name="input" cols={30} rows={10} className='w-full h-full overflow-scroll outline-none px-1' style={{resize: 'none'}} value={text} onChange={typeText}></textarea>
    </div>
  )
}

export default UI