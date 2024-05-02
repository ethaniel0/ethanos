import * as React from 'react';
import { MouseEventHandler } from 'react';

interface MenuItem {
    name: string,
    options: string[]
}

interface WindowNavbarProps {
    fullscreen: MouseEventHandler<HTMLElement>,
    close: MouseEventHandler<HTMLElement>,
    style?: any,
    menu: MenuItem[]
}

const WindowNavbar = ({ fullscreen, close, style, menu }: WindowNavbarProps) => {
  return (
    <nav onDoubleClick={fullscreen} className='navbar flex justify-end md:justify-between items-center px-2 md:h-6' style={{backgroundColor: '#c5c5c4', ...style}}>
        <div className='md:flex gap-4 hidden'>
        {
            Object.keys(menu).map(key => (
              <span key={key} className='cursor-pointer'>{key}</span>
            ))
        }
        </div>
        <div className='flex'>
        <div onClick={fullscreen} className='window-circle bg-green-600 hidden md:block'></div>
        <div className='window-circle bg-yellow-500 hidden md:block'></div>
        <div onClick={close} className='window-circle bg-red-600 justify-center items-center hidden md:block'></div>
        </div>
    </nav>
  )
}

export default WindowNavbar