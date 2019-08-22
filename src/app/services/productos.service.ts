import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  filtroProductos: ProductoInterface[] = [];

  constructor(private http: HttpClient) { 
      this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
        this.http.get('https://angularportafolio-36524.firebaseio.com/productos_idx.json').subscribe((resp: ProductoInterface[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

  public getProducto( id: string ){
    return this.http.get(`https://angularportafolio-36524.firebaseio.com/productos/${ id }.json`);
  }

  public buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      // cargamos productos
      this.cargarProductos().then(() => {
        // ejecutamos despues de cargar productos
        // aplicamos el filtro
        this.filtrarProducto( termino );
      });
    } else {
      this.filtrarProducto( termino );
    }
  }


  private filtrarProducto(termino: string) {
    this.filtroProductos = [];
    this.productos.forEach(prod => {
      if (prod.categoria.toLowerCase().indexOf( termino.toLowerCase() ) >= 0 || prod.titulo.toLowerCase().indexOf( termino.toLowerCase() ) >= 0) {
        this.filtroProductos.push( prod );
      }
    });
  }
}
