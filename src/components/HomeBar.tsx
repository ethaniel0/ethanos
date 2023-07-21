import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { twMerge } from 'tailwind-merge';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import Processes from './Processes';

interface HomeBarProps {
  className?: string;
}

const HomeBar = ({className}: HomeBarProps) => {
  function closeLastWindow(){
    Processes.removeWindow(Processes.windows[Processes.windows.length - 1].key);
  }
  return (
    <div id='homebar' className={twMerge('bg-black h-12 w-full text-white flex justify-around items-center' , className)} style={{zIndex: 10000}}>
      <FontAwesomeIcon className='text-white text-3xl' icon={faHouse} onClick={closeLastWindow} />
    </div>
  )
}

export default HomeBar