import * as React from 'react';
import { useState, useRef } from 'react';
import Draggable, { DraggableData } from "react-draggable";

interface ResizeableProps {
    children: any,
    width: number,
    height: number,
    move: Function,
    maxWidth?: number,
    maxHeight?: number,
    minWidth?: number,
    minHeight?: number,
    style?: any,
    forceSize?: boolean,
    isNonInteractive?: boolean
}

const Resizeable = ({children, width, height, move, style, maxWidth, maxHeight, minWidth, minHeight, forceSize, isNonInteractive}: ResizeableProps) => {

    if (!maxWidth) maxWidth = Infinity;
    if (!maxHeight) maxHeight = Infinity;
    if (!minWidth) minWidth = 0;
    if (!minHeight) minHeight = 0;

    const [size, setSize] = useState({width, height});
    const [resizing, setResizing] = useState(false);

    const ref = useRef(null);

    const refTop = useRef(null);
    const refBottom = useRef(null);
    const refLeft = useRef(null);
    const refRight = useRef(null);
    const refTopRight = useRef(null);
    const refTopLeft = useRef(null);
    const refBottomRight = useRef(null);
    const refBottomLeft = useRef(null);

    const lastMove = useRef(false);

    if (!style) style = {};

    function stopProp(e: any){
        e.cancelbubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    function onResize(e: any, data: DraggableData, ...funcs: Function[]){
        stopProp(e);
        setResizing(true);
        let newSize = {width: 0, height: 0};
        Object.assign(newSize, size);
        let newMove: any = {x: null, y: null};
        for (let func of funcs){
            let [nmove, nsize] = func(e, data);
            Object.assign(newSize, nsize);
            Object.assign(newMove, nmove);
        }

        if (newMove.x === null && newMove.y === null){
            lastMove.current = false;
        }

        if (newSize.width > maxWidth || newSize.width < minWidth){
            newSize.width = size.width;
            delete newMove.x;
        }
        if (newSize.height > maxHeight || newSize.height < minHeight){
            newSize.height = size.height;
            delete newMove.y;
        }
        

        if (!lastMove.current){
            setSize(newSize);
        }

        if (newMove.x !== null || newMove.y !== null){
            if (!lastMove.current){
                move(newMove.x, newMove.y);
                lastMove.current = true;
            } else {
                lastMove.current = false;
            }
        }
    }

    function shiftTop(e: any, data: DraggableData){    
    let rect = ref.current.getBoundingClientRect();
    let h = rect.top + rect.height - e.y;
    return [{y: e.y}, {height: h}];
    }
    function shiftBottom(e: any, data: DraggableData){    
    let rect = ref.current.getBoundingClientRect();
    let y = e.y - rect.top;
    return [{}, {height: y}];
    }
    function shiftLeft(e: any, data: DraggableData){    
    let rect = ref.current.getBoundingClientRect();
    let w = rect.left + rect.width - e.x;
    return [{x: e.x}, {width: w}];
    }
    function shiftRight(e: any, data: DraggableData){    
    let rect = ref.current.getBoundingClientRect();
    let w = e.x - rect.left;
    return [{}, {width: w}];
    }

    React.useEffect(() => {
        console.log('isNonInteractive', isNonInteractive);
    }, [isNonInteractive]);

      
  return (
    <div ref={ref} className="resizeable " style={{width: forceSize ? width : size.width, height: forceSize ? height :size.height, ...style}}>
    
        <div className='w-full h-full relative'>
            {children}
            <div className={"absolute top-0 left-0 w-full h-full " + ((!resizing && !isNonInteractive) ? 'hidden' : '')}></div>
        </div>
        

        {/* window edges */}

        {/* top */}
        <Draggable nodeRef={refTop} onDrag={(e: any, data: DraggableData) => onResize(e, data, shiftTop)} onStop={() => setResizing(false)} position={{x: 0, y: 0}}>
        <div ref={refTop} className='resize-area top'></div>
        </Draggable>
        {/* left */}
        <Draggable nodeRef={refLeft} onDrag={(e: any, data: any) => onResize(e, data, shiftLeft)} onStop={() => setResizing(false)} position={{x: 0, y: 0}}>
        <div ref={refLeft} className='resize-area left'></div>
        </Draggable>
        {/* bottom */}
        <Draggable nodeRef={refBottom} onDrag={(e: any, data: any) => onResize(e, data, shiftBottom)} onStop={() => setResizing(false)} position={{x: 0, y: 0}}>
        <div ref={refBottom} className='resize-area bottom'></div>
        </Draggable>
        {/* right */}
        <Draggable nodeRef={refRight} onDrag={(e: any, data: any) => onResize(e, data, shiftRight)} onStop={() => setResizing(false)} position={{x: 0, y: 0}}>
        <div ref={refRight} className='resize-area right'></div>
        </Draggable>
        {/* top right */}
        <Draggable nodeRef={refTopRight} onDrag={(e: any, data: any) => onResize(e, data, shiftTop, shiftRight)} onStop={() => setResizing(false)} position={{x: 0, y: 0}}>
        <div ref={refTopRight} className='resize-area tr'></div>
        </Draggable>
        {/* top left */}
        <Draggable nodeRef={refTopLeft} onDrag={(e: any, data: any) => onResize(e, data, shiftTop, shiftLeft)} onStop={() => setResizing(false)} position={{x: 0, y: 0}}>
        <div ref={refTopLeft} className='resize-area tl'></div>
        </Draggable>
        {/* bottom right */}
        <Draggable nodeRef={refBottomRight} onDrag={(e: any, data: any) => onResize(e, data, shiftBottom, shiftRight)} onStop={() => setResizing(false)} position={{x: 0, y: 0}}>
        <div ref={refBottomRight} className='resize-area br'></div>
        </Draggable>
        {/* bottom left */}
        <Draggable nodeRef={refBottomLeft} onDrag={(e: any, data: any) => onResize(e, data, shiftBottom, shiftLeft)} onStop={() => setResizing(false)} position={{x: 0, y: 0}}>
        <div ref={refBottomLeft} className='resize-area bl'></div>
        </Draggable>
    </div>
  )
}

export default Resizeable