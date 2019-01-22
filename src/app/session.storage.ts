
import {Injectable} from '@angular/core'; 

@Injectable({
    providedIn: 'root'
  })
export class SessionStorage {
    public sesssionStorage: any;

    constructor(){
        if (!sessionStorage){
            throw new Error('Current browser does not support session Storage');
        }
        this.sesssionStorage = sessionStorage;
    }

    public set(key:string, value:string):void {
        this.sesssionStorage[key] = value;
    }

    public get(key:string):string {
        return this.sesssionStorage[key] || false;
    }

    public setObject(key:string, value:any):void {
        this.sesssionStorage[key] = JSON.stringify(value);
    }

    public getObject(key:string):any {
        return JSON.parse(this.sesssionStorage[key] || false);
    }

    public remove(key:string):any {
        this.sesssionStorage.removeItem(key);
    }
}