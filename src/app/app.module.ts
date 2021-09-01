import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';
import { ObjetoAArrayPipe } from './objetoaarray.pipe';
import { GraficaComponent } from './components/grafica/grafica.component';
import { ClimaComponent } from './components/clima/clima.component';
import localEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ClaveComponent } from './components/clave/clave.component';
import { FormsModule } from '@angular/forms';
registerLocaleData(localEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    CalificacionesComponent,
    ObjetoAArrayPipe,
    GraficaComponent,
    ClimaComponent,
    ClaveComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule { }
