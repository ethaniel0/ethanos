import * as React from 'react';
import CommandLine from '../../components/CommandLine';
import { WindowContext } from '../../components/Window';

interface Page1Props {
    toPage: Function;
    active?: boolean;
    animate?: boolean;
}

const Page1 = ({ toPage, active, animate }: Page1Props) => {
    const windowCtx = React.useContext(WindowContext);

    function showProjects(){
        windowCtx.close();
        let cm = new CommandLine('E');
        setTimeout(() => {
            cm.command('open Applications/Present.app');
        }, 200);
    }

    return (
        <div className={'welcome-page bg-white welcome-page1 w-full h-full flex flex-col justify-center items-center p-4' + (active ? ' active z-10' : ' z-0') + (animate ? ' animate' : '')}>
            <div className='text-center flex flex-col items-center justify-center'>
                <div className='text-center overflow-hidden px-6'>
                    <h1 className='welcome-text text-5xl font-bold text-black'>Welcome to EthanOS</h1>
                </div>

                <hr className="my-6" />

                <div className='text-center overflow-hidden px-6'>
                    <span className='desc-text font-light text-2xl block'>My play online operating system &amp; portfolio</span>
                </div>
            </div>
            <div className='absolute right-10 bottom-8 text-3xl font-bold flex flex-col gap-6 '>
                
                <span onClick={() => toPage(2)} className='explore-btn cursor-pointer'>Quick Overview &gt;</span>
                <span onClick={showProjects} className='explore-btn cursor-pointer'>Jump Right In &gt;</span>
            </div>
            
        </div>
    )
}

export default Page1