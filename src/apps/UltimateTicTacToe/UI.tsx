import * as React from 'react';
import { useState} from "react";
import styles from "./styles.module.css";



const UI = () => {
    const [turn, setTurn] = useState('X');

    return (<>
        <div
            className={styles.ultimate_ttt_container}
            style={{}}
        >
            {/* header */}
            <div className='h-[50px] flex flex-col'>
                <h1 className='text-center'>Ultimate Tic Tac Toe</h1>
                <span className='text-center w-full'>Turn: {turn === 'X' ? '✖️' : '⭕️'}</span>
            </div>

            {/* body */}
            <div className='flex justify-center items-center'>
                <table className={styles.ultimate_ttt_grid}>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        
            
        </div>
    </>)
}

export default UI