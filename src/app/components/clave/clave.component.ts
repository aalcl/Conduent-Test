import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clave',
  templateUrl: './clave.component.html',
  styleUrls: ['./clave.component.css']
})
export class ClaveComponent implements OnInit {

  sust:Array<any> = [];
  clavefinal:string = '';
  dato:number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public claveChange(dato:number,clave:any){
    this.sust = clave.split("");

    this.dato = dato;

    for(var i=0; i != this.dato; i++){
      var c = this.sust[0];
      for(var j=0; j != this.sust.length-1; j++){
        this.sust[j] = this.sust[j+1];
      }
      this.sust[this.sust.length-1] = c;
    }
    
    this.clavefinal = this.sust[0]+this.sust[1]+this.sust[2]+this.sust[3]+this.sust[4]+this.sust[5];
    return this.clavefinal;
  }
}
