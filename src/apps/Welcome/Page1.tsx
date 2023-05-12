import * as React from 'react';

interface Page1Props {
    toPage: Function;
    active?: boolean;
    animate?: boolean;
}

const Page1 = ({ toPage, active, animate }: Page1Props) => {
  return (
    <div className={'welcome-page welcome-page1 w-full h-full flex flex-col justify-center items-center' + (active ? ' active z-10' : ' z-0') + (animate ? ' animate' : '')}>
        <div className='text-center flex flex-col items-center justify-center'>
            <div className='text-center overflow-hidden px-6'>
                <h1 className='welcome-text text-5xl font-bold text-black'>Welcome to EthanOS</h1>
            </div>
            <hr className="my-6" />
            <div className='text-center overflow-hidden px-6'>
                <span className='desc-text font-light text-2xl block'>My play online operating system &amp; portfolio</span>
            </div>
        </div>

        <span onClick={() => toPage(1)} className='explore-btn absolute right-10 bottom-8 text-3xl font-bold cursor-pointer'>Explore &gt;</span>
    </div>
  )
}

export default Page1