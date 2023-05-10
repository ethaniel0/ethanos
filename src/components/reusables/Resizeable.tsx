import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Application from '../Application';
import Processes from '../Processes';
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
    forceSize?: boolean
}

const Resizeable = ({children, width, height, move, style, maxWidth, maxHeight, minWidth, minHeight, forceSize}: ResizeableProps) => {

    if (!maxWidth) maxWidth = Infinity;
    if (!maxHeight) maxHeight = Infinity;
    if (!minWidth) minWidth = 0;
    if (!minHeight) minHeight = 0;

    const [size, setSize] = useState({width, height});

    const ref = useRef(null);

    const lastMove = useRef(false);

    if (!style) style = {};

    function stopProp(e: any){
        e.cancelbubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    function onResize(e: any, data: DraggableData, ...funcs: Function[]){
        stopProp(e);
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

      
  return (
    <div ref={ref} className="resizeable " style={{width: forceSize ? width : size.width, height: forceSize ? height :size.height, ...style}}>
    
        {children}

        {/* window edges */}

        {/* top */}
        <Draggable onDrag={(e: any, data: DraggableData) => onResize(e, data, shiftTop)} position={{x: 0, y: 0}}>
        <div className='resize-area top'></div>
        </Draggable>
        {/* left */}
        <Draggable onDrag={(e: any, data: any) => onResize(e, data, shiftLeft)} position={{x: 0, y: 0}}>
        <div className='resize-area left'></div>
        </Draggable>
        {/* bottom */}
        <Draggable onDrag={(e: any, data: any) => onResize(e, data, shiftBottom)} position={{x: 0, y: 0}}>
        <div className='resize-area bottom'></div>
        </Draggable>
        {/* right */}
        <Draggable onDrag={(e: any, data: any) => onResize(e, data, shiftRight)} position={{x: 0, y: 0}}>
        <div className='resize-area right'></div>
        </Draggable>
        {/* top right */}
        <Draggable onDrag={(e: any, data: any) => onResize(e, data, shiftTop, shiftRight)} position={{x: 0, y: 0}}>
        <div className='resize-area tr'></div>
        </Draggable>
        {/* top left */}
        <Draggable onDrag={(e: any, data: any) => onResize(e, data, shiftTop, shiftLeft)} position={{x: 0, y: 0}}>
        <div className='resize-area tl'></div>
        </Draggable>
        {/* bottom right */}
        <Draggable onDrag={(e: any, data: any) => onResize(e, data, shiftBottom, shiftRight)} position={{x: 0, y: 0}}>
        <div className='resize-area br'></div>
        </Draggable>
        {/* bottom left */}
        <Draggable onDrag={(e: any, data: any) => onResize(e, data, shiftBottom, shiftLeft)} position={{x: 0, y: 0}}>
        <div className='resize-area bl'></div>
        </Draggable>
    </div>
  )
}

export default Resizeable