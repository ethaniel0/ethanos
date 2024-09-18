
export default interface Application {
  code: () => JSX.Element;
  name: string;
  icon: string;
  icon2?: string;
  defaultSize: number[];
  spawnPoint: number[];
  minWidth?: number;
  minHeight?: number;
  resizeable: boolean;
  newObject: Function;
  menu: any;
}