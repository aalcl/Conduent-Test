import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { GraficaComponent } from '../grafica/grafica.component';
import { ClaveComponent } from '../clave/clave.component';

@Component({
  providers: [GraficaComponent, ClaveComponent],
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CalificacionesComponent implements OnInit {
  arrayBuffer:any;
  filelist:Array<any> = [];
  filelistc:Array<any> = [];
  extra:Array<any> = [];
  names:Array<any> = [];
  calif:Array<any> = [];
  clavearray:Array<any> = [];
  clave:string = '';
  edad:number = 0;
  mayor:any;
  dato:any;
  menor:any;
  suma:any;
  file!:File;

  constructor(private comp: GraficaComponent, private comp2:ClaveComponent) { }

  ngOnInit(): void {
  }

  onFileChange(event: any){
    this.file= event.target.files[0];
  }

  public excelToJson(idd: any): void{
    var hide = document.getElementById(idd);
    hide!.style.display = "block";

    let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
            this.filelist = arraylist;
            this.suma = 0;
            this.mayor = Object.values(this.filelist[0]);
            this.menor = Object.values(this.filelist[0]);

            for(var j = 0; j != this.filelist.length; ++j) {
              this.extra = (Object.values(this.filelist[j]));
              this.names.push(this.extra[0]+" "+this.extra[1]+" "+this.extra[2]);
              this.calif.push(this.extra[6]);
              this.clave = '';
              this.edad = 0;
              let cumpleaños = this.extra[3].split('/');
              let cumpleaños2 = new Date(
                parseInt(cumpleaños[2]),
                parseInt(cumpleaños[1])-1,
                parseInt(cumpleaños[0])
              )
              this.edad = Math.floor(((Math.abs(Date.now() - Date.parse(cumpleaños2.toString()))) / (1000 * 3600 * 24))/365);
              this.clave += this.extra[0].substr(0,2)+this.extra[2].substr(-2,2)+this.edad;
              this.filelist[j][7] = this.clave.toUpperCase();

              if(this.extra[6]>this.mayor[6]){
                this.mayor = this.extra;
              }else{
                if(this.extra[6]<this.menor[6]){
                  this.menor = this.extra;
                }
              }
              this.suma += this.extra[6]; 
            }
            
            this.menor = this.menor[0] + " " + this.menor[1] + " " + this.menor[2] + " - " + this.menor[6];
            this.mayor = this.mayor[0] + " " + this.mayor[1] + " " + this.mayor[2] + " - " + this.mayor[6];
            this.suma = this.suma/this.filelist.length;           
            this.comp.BuildChart(this.names, this.calif);

    }
    fileReader.readAsArrayBuffer(this.file);
  }

  public claveChangecal(idt1:any,idt2:any): void{
    this.filelistc = [];
    var hide1 = document.getElementById(idt1);
    hide1!.style.display = "none";
    var hide2 = document.getElementById(idt2);
    hide2!.style.display = "block";
    for(var j = 0; j != this.filelist.length; ++j){
      this.filelist[j][7] = this.comp2.claveChange(this.dato,this.filelist[j][7]);
    }
    this.filelistc = this.filelist;
  }
}
