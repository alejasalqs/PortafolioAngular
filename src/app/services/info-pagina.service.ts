import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { InfoEquipo } from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: "root"
})
export class InfoPaginaService {

  info: InfoPagina = {};
  infoEquipo: InfoEquipo = {};
  cargada = false;

  constructor(private http: HttpClient) {
    this.cargarInfo()
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json').subscribe((resp: InfoPagina) => {
      this.cargada = true;
      // guardamos la respuesta
      this.info = resp;
      // console.log(resp);
    });
  }

  private cargarEquipo(){
    this.http.get('https://angularportafolio-36524.firebaseio.com/equipo.json').subscribe((resp: InfoEquipo) => {
      this.cargada = true;
      // guardamos la respuesta
      this.infoEquipo = resp;
      console.log(resp);
    });
  }
}
