import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react'
import Processes from './Processes';

const HomeBar = () => {
  function closeLastWindow(){
    Processes.removeWindow(Processes.windows[Processes.windows.length - 1].key);
  }
  return (
    <div id='homebar' className='bg-black h-12 w-full text-white flex justify-around items-center' style={{zIndex: 10000}}>
      <FontAwesomeIcon className='text-white text-3xl' icon={faHouse} onClick={closeLastWindow} />
    </div>
  )
}

export default HomeBar