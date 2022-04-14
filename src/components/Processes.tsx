import Application from './Application';
import { ReactElement } from 'react';
import Window from './Window';

interface ProcessesLayout {
    windows: ReactElement<Window, any>[];
    addWindow: Function;
    removeWindow: Function;
    vars: any; // environment variables
    windowSpawnPoint: number[];
    cycleSpawnPoint: Function;
    exts: any; // extensions
}

let Processes: ProcessesLayout = {
    windows: [], // list of windows
    addWindow: (app: Application) => {},
    removeWindow: (code: string) => {},
    windowSpawnPoint: [100, 100],
    vars: {
        
    },
    cycleSpawnPoint: () => {
        Processes.windowSpawnPoint[0] += 20;
        Processes.windowSpawnPoint[1] += 20;
        if (Processes.windowSpawnPoint[0] > window.innerWidth - 100){
            Processes.windowSpawnPoint[0] = 100;
            Processes.windowSpawnPoint[1] = 100;
        }
        if (Processes.windowSpawnPoint[1] > window.innerHeight - 100){
            Processes.windowSpawnPoint[0] += 100;
            Processes.windowSpawnPoint[1] = 100;
        }
    },
    exts: {
        'bash': '/E/Applications/Terminal.app',
        'pres': '/E/Applications/Present.app',
    }
}

export default Processes;