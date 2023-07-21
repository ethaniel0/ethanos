import * as React from "react";
import { useState, useEffect } from "react";


const Background = () => {
    const [skew, setSkew]: [number, Function] = useState(12);
    useEffect(() => {
        function handleResize() {
          setSkew(12*window.innerWidth / window.innerHeight);
          document.getElementById('desktop').style.height = window.innerHeight + 'px';
        }
        setSkew(12*window.innerWidth / window.innerHeight);
        window.addEventListener('resize', handleResize);
        document.getElementById('desktop').style.height = window.innerHeight + 'px';
      }, []);

    return (
        <div className='absolute top-0 left-0 w-full h-full  bg-cover' style={{backgroundImage: 'url(/assets/bkg.png)', fontFamily: 'Quicksand'}}>
            <div id='desktop-black' className='absolute right-0 bg-neutral-900'>
            <div id='bkg-table' className='grid grid-cols-2 grid-rows-3 absolute right-0 w-full h-4/5 md:w-10/12'>
                <div className='order-1 md:hidden'></div>
                <span id='bkg-hi' className='text-white font-bold self-end text-6xl order-3 md:order-none' style={{left: '40vw', top: '20vh', paddingLeft: '20%'}}>Hi, I'm Ethan</span>
                
                <img id='bkg-face' src="/assets/face.png" alt="" className='row-span-3 justify-self-center self-center p-4 md:p-0 order-2 md:order-none' style={{maxHeight: '60vh', maxWidth: '100%', right: '6vw', top: '3vh'}} />
                

                <div className='backg-desc row-span-2 text-white self-center relative order-4 col-span-2 text-center md:text-left md:order-none md:col-auto' style={{left: '-6%', transform: `skew(-${skew}deg)`}}>
                <span className='text-5xl mt-4 block' style={{transform: `skew(${skew}deg)`}}>I'm a:</span>
                    <span className='text-5xl block'>
                    <span style={{color: '#FA6666', display: 'inline-block', transform: `skew(${skew}deg)`}}>coder</span><span style={{display: 'inline-block', transform: `skew(${skew}deg)`}}>,</span> <span style={{color: '#FFC671',  display: 'inline-block', transform: `skew(${skew}deg)`}}>engineer</span><span style={{display: 'inline-block', transform: `skew(${skew}deg)`}}>,&nbsp;</span>
                    <span  style={{color: '#FA66AD', display: 'inline-block', transform: `skew(${skew}deg)`}}>designer</span><span style={{display: 'inline-block', transform: `skew(${skew}deg)`}}>,</span> <span style={{display: 'inline-block', transform: `skew(${skew}deg)`}}>and</span> <br />
                    <span  style={{color: '#69E4CE', display: 'inline-block', transform: `skew(${skew}deg)`}}>master of puns</span>
                </span>
                </div>
            </div>
            <div className='text-white absolute hidden md:block text-4xl w-full' style={{bottom: 'min(15%, 10vw)', paddingLeft: '8%', paddingRight: '6%'}}>
                <span>← Check out my stuff</span>
            </div>
            
            </div>
        </div>
    )
}

export default Background