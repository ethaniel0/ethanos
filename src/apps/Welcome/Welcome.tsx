import * as React from 'react'
import Application from '../../components/Application';
import icon from './assets/icon.svg';
import icon2 from './assets/icon2.svg';
import Processes from '../../components/Processes';
import UI from './UI';
import './welcome.css';

class Welcome implements Application {
  code: () => JSX.Element;
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
    
    if (args && args.length > 0){
      this.file = args[0];
      this.page = 1;
    }
    else {
      this.file = null
      this.page = 0;
    }
    this.code = this.app;
  }

  newObject(){
    return new Welcome([]);
  }
  
  app(){
    return <UI />
  }

}

export default Welcome