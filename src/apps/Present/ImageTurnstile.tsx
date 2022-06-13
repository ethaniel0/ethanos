import * as React from 'react';
import { useState } from 'react';

interface AppProps {
    images: string[];
    captions: string[];
    width: number;
}

const ImageTurnstile = (props: AppProps) => {
    const images = props.images;
    const captions = props.captions;
    const width = props.width;
    const [index, setIndex] = useState(0);

    const imgHeight = width * 0.25;

    // function turnStileImage(img: string, ind: number) {
    //     let partShow = '3rem';
    //     function click(){
    //         setIndex(Math.max(0, Math.min(ind <= index ? index - 1 : index + 1, images.length - 2)))
    //     }
    //     function calcLeft(){
    //         return ind - index > 2 ? '105%' : ind == index + 2 ? `calc(100% - ${partShow})` : index - ind > 1 ? 'calc(-5% - 12rem)' : ind == index - 1 ? `calc(-13rem + ${partShow})` : '';
    //     }

    //     return (
    //         <div key={ind} className={'ts-img m-4' + ((ind < index || ind > index+1) ? ' absolute' : ' relative')} style={{left: calcLeft(), display: 'block', maxWidth: '1%'}}>
    //             <div ref={ind === index ? measuredRef : null} className={'proj-img relative float-left'} onClick={click}>
    //                 {img.endsWith('.mp4') ? (
    //                     <video style={{height: imgHeight + 'px', width: (ind < index || ind > index+1) ? '12rem' : '', maxWidth: 'none'}} className="turnstile-img rounded-lg object-cover" controls>
    //                         <source src={img} type='video/mp4' />
    //                     </video>
    //                 ) : (
    //                     <img key={ind} src={img} alt="" style={{height: imgHeight + 'px', width: (ind < index || ind > index+1) ? '12rem' : '', maxWidth: 'none'}} className="turnstile-img rounded-lg object-cover" />
    //                 )}
    //                 {
    //                     ind === index && <span className='text-white text-center block m-0 p-2'>{captions[ind]}</span>
    //                 }
    //             </div>
    //         </div>
    //     )   
    // }

    function turnStileImage(img: string, ind: number) {
        let partShow = '3rem';
        function click(){
            setIndex(Math.max(0, Math.min(ind <= index ? index - 1 : index + 1, images.length - 2)))
        }
        function calcLeft(){
            return ind - index > 2 ? '105%' : ind === index + 2 ? `calc(100% - ${partShow})` : index - ind > 1 ? 'calc(-5% - 12rem)' : ind === index - 1 ? `calc(-13rem + ${partShow})` : '';
        }
        return (
            <div key={'ts-' + ind} onClick={click} className={'ts-img m-4 inline-block' + ((ind < index || ind > index+1) ? ' absolute' : '')} style={{left: calcLeft()}}>
                {img.endsWith('.mp4') ? (
                    <video style={{height: imgHeight + 'px', width: (ind < index || ind > index+1) ? '12rem' : '', maxWidth: width*0.4 + 'px', minHeight: '20rem' }} className="rounded-lg object-cover" controls>
                        <source src={img} type='video/mp4' />
                    </video>
                ) : (
                    <img key={ind} src={img} alt="" style={{height: imgHeight + 'px', width: (ind < index || ind > index+1) ? '12rem' : '', maxWidth: width*0.4 + 'px', minHeight: '20rem'}} className="rounded-lg object-cover" />
                )}
                {
                    (ind === index || ind === index + 1) && <span className='text-white text-center block m-0 p-2' style={{width: 0, minWidth: '100%'}}>{captions[ind]}</span>
                }
            </div>
        )   
    }

    return (
        <>
        {images.length <= 2 
            ? 
            images.map((img, ind) => (
                <div className='m-4'>
                    {img.endsWith('.mp4') ? (
                        <video style={{height: imgHeight + 'px', minHeight: '20rem'}} className="rounded-lg object-cover" controls>
                            <source src={img} type='video/mp4' />
                        </video>
                    ) : (
                        <img key={ind} src={img} alt="" style={{height: imgHeight + 'px', minHeight: '20rem'}} className="rounded-lg object-cover" />
                    )}
                    <span className='text-white text-center block w-full'>{captions[ind]}</span>
                </div>
            
            ))
            :
            // <div className='flex justify-center relative' style={{marginBottom: imgHeight}}>
            //     {
            //     images.map((img, ind) => 
            //         turnStileImage(img, ind)
            //     )
            //     }
            // </div>
            images.map((img, ind) => 
                turnStileImage(img, ind)
            )
        }
        </>
    )
}

export default ImageTurnstile