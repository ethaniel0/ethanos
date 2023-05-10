import * as React from 'react'
import Directory from '../../components/Directory';
interface AppProps {
    setFile: Function;
}

const LandingPage = ({ setFile }: AppProps) => {
    let cwd = new Directory('/E/User/Desktop');

    return (
        <div className='text-gray-100 flex flex-col items-center' style={{fontFamily: 'UbuntuTitle', backgroundColor: '#242A3E', minHeight: '100%'}}>
            <h1 className='text-5xl text-center pt-4'>Hello World!</h1>
            <h3 className='text-2xl text-center pt-4' style={{fontFamily: 'Quicksand'}}>My skills:</h3>
            <p className='text-lg text-center px-4 flex flex-wrap justify-center' style={{fontFamily: 'Quicksand', maxWidth: '50rem'}}>
                <span className='text-yellow-300'>Python <span className='text-white'>,&nbsp;</span></span>
                <span className='text-yellow-300'>TensorFlow <span className='text-white'>,&nbsp;</span></span>
                <span className='text-yellow-300'>Firebase <span className='text-white'>,&nbsp;</span></span>
                <span className='text-green-300'>HTML/CSS/JS <span className='text-white'>,&nbsp;</span></span>
                <span className='text-green-300'>NodeJS <span className='text-white'>,&nbsp;</span></span>
                <span className='text-green-300'>ReactJS <span className='text-white'>,&nbsp;</span></span>
                <span className='text-blue-300'>Java <span className='text-white'>,&nbsp;</span></span>
                <span className='text-red-300'>C/C++ <span className='text-white'>,&nbsp;</span></span>
                <span className='text-red-300'>Arduino <span className='text-white'>,&nbsp;</span></span>
                <span className='text-violet-300'>Circuit Design / Analysis <span className='text-white'>,&nbsp;</span></span>
                <span className='text-violet-300'>Soldering</span>
            </p>
            <h2 className='text-4xl mt-4'>Here's my stuff <svg className='inline-block w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill='white' d="M342.6 374.6l-128 128C208.4 508.9 200.2 512 191.1 512s-16.38-3.125-22.63-9.375l-127.1-128c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 402.8V80C160 71.19 152.8 64 144 64H32C14.33 64 0 49.69 0 32s14.33-32 32-32h112C188.1 0 224 35.88 224 80v322.8l73.37-73.38c12.5-12.5 32.75-12.5 45.25 0S355.1 362.1 342.6 374.6z"/></svg></h2>
            <div className='mt-4'>
                <h1 onClick={() => setFile("", 2)} className='text-3xl text-center text-orange-200 underline hover:text-orange-300 cursor-pointer'>All Projects</h1>
            </div>
            <div id='showcase-grid' className={'grid w-3/4 mt-4 gap-x-24 gap-y-8 mb-24 grid-cols-1 @lg:grid-cols-2'}>
                <div onClick={() => setFile(cwd.getFile('web.pres'))}>
                    <h1 className='text-3xl text-center'>web dev</h1>
                    <img src="/assets/icons/wafflehacks-icon.png" alt="My web dev projects" className='w-72 h-72 rounded-2xl border-2 border-gray-300 object-cover' />
                </div>
                <div onClick={() => setFile(cwd.getFile('applications.pres'))}>
                    <h1 className='text-3xl text-center'>applications</h1>
                    <img src="/assets/icons/satellite-icon.png" alt="My programming / algorithms projects" className='w-72 h-72 rounded-2xl border-2 border-gray-300 object-cover' />
                </div>
                <div onClick={() => setFile(cwd.getFile('electrical.pres'))}>
                    <h1 className='text-3xl text-center'>electronics</h1>
                    <img src="/assets/icons/robot.jpg" alt="My electrical engineering projects" className='w-72 h-72 rounded-2xl border-2 border-gray-300 object-cover' />
                </div>
                <div onClick={() => setFile(cwd.getFile('research.pres'))}>
                    <h1 className='text-3xl text-center'>research</h1>
                    {/* <div className='w-72 h-72 bg-gray-200 rounded-2xl'></div> */}
                    <img src="/assets/icons/scires ec.jpg" alt="My research projects" className='w-72 h-72 rounded-2xl border-2 border-gray-300 object-cover' />
                </div>

            </div>
            
            
            
        </div>
    )
}

export default LandingPage