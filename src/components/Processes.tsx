import Application from './Application';
import { ReactElement } from 'react';
import Window from './Window';

interface ProcessesLayout {
    windows: ReactElement<Window, any>[];
    addWindow: Function;
    removeWindow: Function;
}

let Processes: ProcessesLayout = {
    windows: [],
    addWindow: (app: Application) => {},
    removeWindow: (code: string) => {}
    

}

export default Processes;