import * as React from 'react'
import Application from '../../components/Application';
import icon from './assets/icon.svg';
import Processes from '../../components/Processes';
// import LandingPage from './LandingPage';
import PresentApp from './PresentApp';
import './Present.css';

interface File {
  name: string;
  icon: string;
  size: string;
  projects: any;
}


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
  minWidth: number;
  minHeight: number;


  constructor(file?: any){
    
    this.name = "Present";
    this.icon = icon;
    this.defaultSize = [window.innerWidth * 0.7 + 'px', window.innerHeight * 0.8 + 'px'];
    this.minWidth = 400;
    this.minHeight= 400;
    this.resizeable = false;
    this.spawnPoint = [...Processes.windowSpawnPoint];
    Processes.cycleSpawnPoint();
    
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
  
  // landing(size: number[]){
  //   return (<LandingPage width={size[0]} height={size[1]} />)
  // }

  // loadPage(size: number[], closeWindow: Function){
  //   return (<ProjectView width={size[0]} height={size[1]} filePath={this.file} closeWindow={closeWindow} />)
  // }

  app(size: number[], closeWindow: Function){
    return (<>
      {/* {this.page === 0 && this.landing(size)}
      {this.page === 1 && this.loadPage(size, closeWindow)} */}
      <PresentApp size={size} file={this.file} />
    </>)
  }

}

// const Present = () => {
//   return (
//     <div>Present</div>
//   )
// }

export default Present