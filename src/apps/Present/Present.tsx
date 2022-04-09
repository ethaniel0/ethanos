import * as React from 'react'
import Application from '../../components/Application';
import icon from './assets/icon.svg';
import Processes from '../../components/Processes';
import LandingPage from './LandingPage';
import './Present.css';

class Present implements Application {
  name: string;
  icon: string;
  defaultSize: string[];
  resizeable: boolean;
  code: Function;
  page: number;
  file: string;
  spawnPoint: number[];
  width: number;
  height: number;


  constructor(file?: string){
    
    this.name = "Present";
    this.icon = icon;
    this.defaultSize = [window.innerWidth * 0.6 + 'px', window.innerHeight * 0.5 + 'px'];
    this.resizeable = false;
    this.spawnPoint = [...Processes.windowSpawnPoint];
    Processes.cycleSpawnPoint();
    
    if (file){
      this.file = file;
      this.page = 1;
    }
    else {
      this.file = ''
      this.page = 0;
    }
    this.code = this.landing;
  }

  newObject(){
    return new Present();
  }
  
  landing(size: number[]){
    return (<LandingPage width={size[0]} height={size[1]} />)
  }

  loadPage(){
    return (<></>)
  }

  app(size: number[]){
    return (<>
      {this.page === 0 && this.landing(size)}
      {this.page === 1 && this.loadPage()}
    </>)
  }

}

// const Present = () => {
//   return (
//     <div>Present</div>
//   )
// }

export default Present