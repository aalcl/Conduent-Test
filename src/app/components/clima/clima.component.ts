import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {

  constructor() { }

  temperatura:string = '';
  ciudad:string = 'Hermosillo';
  estado:string = 'Sonora';
  region:string = '';

  async ngOnInit(): Promise<any> {
    let longitude: number;
    let latitude: number;
    const apiKey = '4144ada907677c9d0f761c9eaef0ed0b';
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);
        // tslint:disable-next-line: max-line-length
        const cityData = await axios.get(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
        this.temperatura = res.data.main.temp !== undefined ? res.data.main.temp : "Error al cargar la temperatura";
        this.region = cityData.data.region !== undefined ? cityData.data.region : "Error al cargar la region ";
        return Promise.resolve();
      });
    }
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=hermosillo&units=metric&APPID=${apiKey}`)
      this.temperatura = res.data.main.temp !== undefined ? res.data.main.temp : "Error al cargar la temperatura";
      this.region = this.ciudad + ' ' + this.estado;
      return Promise.resolve();
  }
}
