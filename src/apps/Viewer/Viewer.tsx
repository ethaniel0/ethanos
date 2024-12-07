import * as React from 'react'
import Application from '../../components/Application';
import icon from './assets/icon.svg';
import icon2 from './assets/icon2.svg';
import Processes from '../../components/Processes';
import UI from './UI';
import './viewer.css';

class Viewer implements Application {
  name: string;
  icon: string;
  icon2: string;
  defaultSize: number[];
  spawnPoint: number[];
  minWidth: number;
  minHeight: number;
  resizeable: boolean;
  menu: any;

  page: number;
  file: string;
  
  constructor(args?: string[]){
    let file = args ? args[0] || null : null;
    this.name = "Present";
    this.icon = icon;
    this.icon2 = icon2;
    this.defaultSize = [window.innerWidth * 0.6, window.innerHeight * 0.8];
    this.minWidth = 200;
    this.minHeight= 200;
    this.resizeable = false;
    this.spawnPoint = [...Processes.windowSpawnPoint];
    Processes.cycleSpawnPoint();
    this.menu = {
      "File": {
        "New Window": () => {},
        "Open Project": () => {}
      },
      "Window": {
        "Full Screen": () => {},
        "Close Window": () => {}
      },
    };

    // error and traceback
    try {
      let x = 4 / 0;
    }
    catch (e){
      console.log(e.traceback);
    }
    
    if (file){
      this.file = file;
      this.page = 1;
    }
    else {
      this.file = null
      this.page = 0;
    }
  }

  newObject(){
    return new Viewer([]);
  }
  
  code(){
    return <UI file={this.file}  />
  }

}

export default Viewer