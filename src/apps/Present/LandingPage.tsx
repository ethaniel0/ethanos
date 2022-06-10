import * as React from 'react'
import CommandLine from '../../components/CommandLine';
interface AppProps {
    width: number;
    height: number;
  }

const LandingPage = ({ width, height }: AppProps) => {
    let cmd = new CommandLine('/E/User/Desktop');

    return (
        <div className='text-gray-100 flex flex-col items-center overflow-scroll' style={{fontFamily: 'UbuntuTitle', backgroundColor: '#242A3E', minHeight: '100%'}}>
            <h1 className='text-5xl text-center pt-4'>hello world!</h1>
            <div className='w-1/2 text-left self-center mt-8'>
                <span className='text-5xl text-center mt-4'>I'm <span className='text-violet-400'>Ethan</span>!</span>
                <br />
                <span className='text-4xl mt-4 block'>I'm also a:</span>
                <span className='text-4xl block'><span style={{color: '#FA6666'}}>coder</span> , <span  style={{color: '#FFC671'}}>engineer</span> , <span  style={{color: '#FA66AD'}}>designer</span> , <span  style={{color: '#69E4CE'}}>master of puns</span></span>
                <span className='text-4xl block mt-8 flex items-center flex-wrap'>Check me out on:
                    <div className='inline-flex ml-4 flex-wrap'>
                        <a href="https://github.com/ethaniel0" target='_blank'><img className='h-12 mr-4 mb-4 cursor-pointer' src="/assets/icons/github.svg" alt="" /></a>
                        <a href="https://www.linkedin.com/in/ethan-horowitz-163b791ab/" target='_blank'><img className='h-12 mr-4 mb-4 cursor-pointer' src="/assets/icons/linkedin.svg" alt="" /></a>
                        <a href="https://devpost.com/ethanhorowitz07?ref_content=user-portfolio" target='_blank'><img className='h-12 mr-4 mb-4 cursor-pointer' src="/assets/icons/devpost.svg" alt="" /></a>
                        <a href="https://replit.com/@EthanHorowitz" target='_blank'><img className='h-12 mr-4 mb-4 cursor-pointer' src="/assets/icons/replit.svg" alt="" /></a>
                        <a href="mailto:ethan.horowitz@duke.edu"><img className='h-12 mr-4 mb-4 cursor-pointer' src="/assets/icons/mail.svg" alt="" /></a>

                    </div>
                </span>
                {/* <a className='underline' href="https://github.com/ethaniel0" target="_blank">GitHub</a> <a className='underline' href="https://devpost.com/ethanhorowitz07?ref_content=user-portfolio" target="_blank">Devpost</a> <a className='underline' href="https://www.linkedin.com/in/ethan-horowitz-163b791ab/" target="_blank">LinkedIn</a> </span> */}
                <span className='text-4xl block mt-8 text-center'>Check out some of my favorite projects:</span>
            </div>
            <div id='showcase-grid' className={'grid w-3/4 mt-8 gap-x-24 gap-y-8 mb-24' + (width >= 670 ? ' grid-cols-2' : ' grid-cols-1')}>
                <div onClick={() => cmd.command("open web.pres")}>
                    <h1 className='text-3xl text-center'>web dev</h1>
                    <img src="/assets/icons/wafflehacks-icon.png" alt="My web dev projects" className='w-72 h-72 rounded-2xl border-2 border-gray-300' />
                </div>
                <div onClick={() => cmd.command("open applications.pres")}>
                    <h1 className='text-3xl text-center'>applications</h1>
                    <img src="/assets/icons/satellite-icon.png" alt="My programming / algorithms projects" className='w-72 h-72 rounded-2xl border-2 border-gray-300' />
                </div>
                <div onClick={() => cmd.command("open electrical.pres")}>
                    <h1 className='text-3xl text-center'>electronics</h1>
                    <img src="/assets/icons/robot.jpg" alt="My electrical engineering projects" className='w-72 h-72 rounded-2xl border-2 border-gray-300' />
                </div>
                <div onClick={() => cmd.command("open research.pres")}>
                    <h1 className='text-3xl text-center'>research</h1>
                    <div className='w-72 h-72 bg-gray-200 rounded-2xl'></div>
                    {/* <img src="" alt="" className='w-1/4 h-1/4' /> */}
                </div>

            </div>
            
            
            
        </div>
    )
}

export default LandingPage