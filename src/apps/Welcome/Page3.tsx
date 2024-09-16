import * as React from 'react';
import { useContext } from 'react';
import { WindowContext } from '../../components/Window';
import CommandLine from '../../components/CommandLine';

interface Page2Props {
    active?: boolean
    animate?: boolean;
}

const Page3 = ({ active, animate }: Page2Props) => {

    const windowCtx = useContext(WindowContext);

    function close()
    {
        windowCtx.close();
        let cm = new CommandLine('E');
        setTimeout(() => {
            cm.command('open Applications/Present.app');
        }, 200);
    }

    return (
        // desktop
        <div className={'welcome-page welcome-page3 overflow-hidden w-full h-full text-[#FE3A88]' + (active ? ' active z-10' : ' z-0') + (animate ? ' animate' : '')}>

            <div className="f1  curly-brace w-[10rem] h-[1.3rem] left-16 bottom-4 rotate-180 text-center">
                <div className="brace left"></div>
                <div className="brace right"></div>
                <br />
                <span className="f2 text-xl absolute rotate-180 left-0 right-0 m-[auto] font-bold" >Taskbar</span>  
            </div>

            <div className="f3 curly-brace w-[23rem] h-[1.3rem] left-[-1rem] top-[11rem] rotate-[-90deg] text-center">
                <div className="brace left"></div>
                <div className="brace right"></div>
                <br />
                <span className="f4 text-xl font-bold" >Apps / Files</span>
            </div>

            <div className="f5 arrow absolute left-[-7.5rem] bottom-[0rem] w-[20rem] rotate-[98deg]"></div>
            <span className="f6 text-xl absolute bottom-[11.5rem] left-[1rem] font-bold">App Drawer</span>

            <div className="f7 curly-brace w-[27rem] h-[1.3rem] right-8 bottom-44 rotate-180 text-center">
                <div className="brace left"></div>
                <div className="brace right"></div>
                <span className="f8 text-xl absolute rotate-180 left-0 right-0 bottom-[1rem] m-[auto] font-bold" >Socials</span>  
            </div>

            <button onClick={close} className="f9 text-black bg-white/[90%] font-bold px-8 py-4 text-3xl rounded-lg absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">Go Explore</button>
        </div>
        // mobile
    )
}

export default Page3