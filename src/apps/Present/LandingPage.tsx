import * as React from 'react'
import Directory from '../../components/Directory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'
interface AppProps {
    width: number;
    height: number;
    setFile: Function;
}

const LandingPage = ({ width, setFile }: AppProps) => {
    let cwd = new Directory('/E/User/Desktop');

    return (
        <div className='text-gray-100 flex flex-col items-center overflow-scroll' style={{fontFamily: 'UbuntuTitle', backgroundColor: '#242A3E', minHeight: '100%'}}>
            <h1 className='text-5xl text-center pt-4'>hello world!</h1>
            <h2 className='text-4xl mt-8'>Here's my stuff <svg className='inline-block w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill='white' d="M342.6 374.6l-128 128C208.4 508.9 200.2 512 191.1 512s-16.38-3.125-22.63-9.375l-127.1-128c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 402.8V80C160 71.19 152.8 64 144 64H32C14.33 64 0 49.69 0 32s14.33-32 32-32h112C188.1 0 224 35.88 224 80v322.8l73.37-73.38c12.5-12.5 32.75-12.5 45.25 0S355.1 362.1 342.6 374.6z"/></svg></h2>
            <div id='showcase-grid' className={'grid w-3/4 mt-8 gap-x-24 gap-y-8 mb-24' + (width >= 670 ? ' grid-cols-2' : ' grid-cols-1')}>
                <div onClick={() => setFile(cwd.getFile('web.pres'))}>
                    <h1 className='text-3xl text-center'>web dev</h1>
                    <img src="/assets/icons/wafflehacks-icon.png" alt="My web dev projects" className='w-72 h-72 rounded-2xl border-2 border-gray-300' />
                </div>
                <div onClick={() => setFile(cwd.getFile('applications.pres'))}>
                    <h1 className='text-3xl text-center'>applications</h1>
                    <img src="/assets/icons/satellite-icon.png" alt="My programming / algorithms projects" className='w-72 h-72 rounded-2xl border-2 border-gray-300' />
                </div>
                <div onClick={() => setFile(cwd.getFile('electrical.pres'))}>
                    <h1 className='text-3xl text-center'>electronics</h1>
                    <img src="/assets/icons/robot.jpg" alt="My electrical engineering projects" className='w-72 h-72 rounded-2xl border-2 border-gray-300' />
                </div>
                <div onClick={() => setFile(cwd.getFile('research.pres'))}>
                    <h1 className='text-3xl text-center'>research</h1>
                    <div className='w-72 h-72 bg-gray-200 rounded-2xl'></div>
                    {/* <img src="" alt="" className='w-1/4 h-1/4' /> */}
                </div>

            </div>
            
            
            
        </div>
    )
}

export default LandingPage