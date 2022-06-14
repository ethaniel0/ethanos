import * as React from 'react'
import Application from '../../components/Application';
import icon from './assets/icon.svg';
import icon2 from './assets/icon2.svg';
import Processes from '../../components/Processes';
// import LandingPage from './LandingPage';
import PresentApp from './PresentApp';
import './Present.css';

class Present implements Application {
  name: string;
  icon: string;
  icon2: string;
  defaultSize: string[];
  resizeable: boolean;
  code: Function;
  page: number;
  file: string;
  spawnPoint: number[];
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  menu: any;


  constructor(file?: any){
    
    this.name = "Present";
    this.icon = icon;
    this.icon2 = icon2;
    this.defaultSize = [window.innerWidth * 0.7 + 'px', window.innerHeight * 0.8 + 'px'];
    this.minWidth = 400;
    this.minHeight= 400;
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
    
    if (file){
      this.file = file;
      this.page = 1;
    }
    else {
      this.file = null
      this.page = 0;
    }
    this.code = this.app;
  }

  newObject(){
    return new Present();
  }
  
  app(size: number[], closeWindow: Function){
    return (<>
      <PresentApp size={size} file={this.file} />
    </>)
  }

}

export default Present