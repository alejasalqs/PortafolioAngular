import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcionInterface } from '../../interfaces/producto-descripcion';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  cargando = true;
  gotProducto: ProductoDescripcionInterface;
  id: string;

  constructor(private route: ActivatedRoute,
              public productosService: ProductosService) { }

  ngOnInit() {
    this.route.params
      .subscribe(parametros => {
        this.productosService.getProducto(parametros['id'])
          .subscribe((producto: ProductoDescripcionInterface) => {
            this.id = parametros['id'];
            this.gotProducto = producto;
            this.cargando = false;
          });
      });
  }
}
