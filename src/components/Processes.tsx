import Application from './Application';

interface ProcessesLayout {
    windows: Application[];
    addWindow: Function;
    removeWindow: Function;
}

let Processes: ProcessesLayout = {
    windows: [],
    addWindow: (app: Application) => {},
    removeWindow: (app: Application) => {}

}

export default Processes;