import Application from './Application';
import { ReactElement } from 'react';
import Window from './Window';

interface ProcessesLayout {
    windows: ReactElement<Window, any>[];
    addWindow: Function;
    removeWindow: Function;
    vars: any; // environment variables
    windowSpawnPoint: number[];
    setWindows: Function;
    bringWindowToFront: Function;
    cycleSpawnPoint: Function;
    exts: any; // extensions
}

let Processes: ProcessesLayout = {
    windows: [], // list of windows
    addWindow: (app: Application) => {},
    removeWindow: (code: string) => {},
    setWindows: (windowArr: ReactElement<Window, any>[]) => {},
    bringWindowToFront: (code: string) => {
        let copy = [...Processes.windows];
        for (let i = Processes.windows.length - 1; i >= 0 ; i--){
            if (Processes.windows[i].key === code){
                if (i === Processes.windows.length - 1) return;
                let window = copy.splice(i, 1);
                copy.push(window[0]);
                Processes.setWindows(copy);
                break;
            }
        }
    },
    windowSpawnPoint: [20, 20],
    vars: {
        
    },
    cycleSpawnPoint: () => {
        Processes.windowSpawnPoint[0] += 20;
        Processes.windowSpawnPoint[1] += 20;
        if (Processes.windowSpawnPoint[0] > 200){
            Processes.windowSpawnPoint[0] = 20;
            Processes.windowSpawnPoint[1] = 20;
        }
        if (Processes.windowSpawnPoint[1] > 200){
            Processes.windowSpawnPoint[0] += 20;
            Processes.windowSpawnPoint[1] = 20;
        }
    },
    exts: {
        'bash': '/E/Applications/Terminal.app',
        'pres': '/E/Applications/Present.app',
    }
}

export default Processes;