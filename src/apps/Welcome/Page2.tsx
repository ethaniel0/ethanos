import * as React from 'react';
import CommandLine from '../../components/CommandLine';
import { WindowContext } from '../../components/Window';

interface Page2Props {
    toPage: Function;
    active?: boolean
    animate?: boolean;
}

const Page2 = ({ active, animate, toPage }: Page2Props) => {

    const windowCtx = React.useContext(WindowContext);

    function showProjects(){
        windowCtx.close();
        let cm = new CommandLine('E');
        setTimeout(() => {
            cm.command('open Applications/Present.app');
        }, 200);
    }
    return (
        <div className={'welcome-page welcome-page2 w-full h-full flex py-8 gap-4' + (active ? ' active z-10' : ' z-0') + (animate ? ' animate' : '')}>
            <div className='w-8 h-full border-r-[2px] border-black'></div>
            <div className='pt-2 text-2xl font-bold flex flex-col gap-6'>
                <span>Hello!</span>

                <span>If you want to skip straight to the my projects, <button className='text-teal-100 cursor-pointer nowrap' onClick={showProjects}>click here</button></span>
            
                <div>
                    <button id='page2-textcontainer' className='overflow-x-hidden text-left' onClick={() => toPage(2)}><span id='page2-text' className="cursor-pointer">Get The Quick Rundown of EthanOS &gt;</span></button>
                </div>
                
            </div>
        </div>
    )
}

export default Page2