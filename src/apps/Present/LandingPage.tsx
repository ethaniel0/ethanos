import * as React from 'react'
import { useRef } from 'react'
interface AppProps {
    width: number;
    height: number;
  }

const LandingPage = ({ width, height }: AppProps) => {

  return (
    <div className='text-gray-100 flex flex-col items-center overflow-scroll' style={{fontFamily: 'UbuntuTitle', backgroundColor: '#242A3E', minHeight: '100%'}}>
        <h1 className='text-5xl text-center pt-4'>hello world!</h1>
        <div className='w-1/2 text-left self-center mt-8'>
            <span className='text-5xl text-center mt-4'>I'm <span className='text-violet-400'>Ethan</span>!</span>
            <br />
            <span className='text-4xl mt-4 block'>I'm also a:</span>
            <span className='text-4xl block'><span style={{color: '#FA6666'}}>coder</span> , <span  style={{color: '#FFC671'}}>engineer</span> , <span  style={{color: '#FA66AD'}}>designer</span> , <span  style={{color: '#69E4CE'}}>master of puns</span></span>
            <span className='text-4xl block mt-8 text-center'>Check out some of my favorite projects:</span>
        </div>
        <div id='showcase-grid' className={'grid w-3/4 mt-8 gap-x-24 gap-y-8 mb-24' + (width >= 670 ? ' grid-cols-2' : ' grid-cols-1')}>
            <div>
                <h1 className='text-3xl text-center'>web dev</h1>
                <div className='w-72 h-72 bg-gray-200 rounded-2xl'></div>
                {/* <img src="" alt="" className='w-1/4 h-1/4' /> */}
            </div>
            <div>
                <h1 className='text-3xl text-center'>applications</h1>
                <div className='w-72 h-72 bg-gray-200 rounded-2xl'></div>
                {/* <img src="" alt="" className='w-1/4 h-1/4' /> */}
            </div>
            <div>
                <h1 className='text-3xl text-center'>electronics</h1>
                <div className='w-72 h-72 bg-gray-200 rounded-2xl'></div>
                {/* <img src="" alt="" className='w-1/4 h-1/4' /> */}
            </div>
            <div>
                <h1 className='text-3xl text-center'>hardware</h1>
                <div className='w-72 h-72 bg-gray-200 rounded-2xl'></div>
                {/* <img src="" alt="" className='w-1/4 h-1/4' /> */}
            </div>
            <div>
                <h1 className='text-3xl text-center'>fun</h1>
                <div className='w-72 h-72 bg-gray-200 rounded-2xl'></div>
                {/* <img src="" alt="" className='w-1/4 h-1/4' /> */}
            </div>
            

        </div>
        
        
        
    </div>
  )
}

export default LandingPage