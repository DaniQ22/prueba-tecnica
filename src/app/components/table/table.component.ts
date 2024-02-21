import { Component, OnInit } from '@angular/core';
import { Maritime, ground } from 'src/app/model/modelShippings';
import { shippingground } from 'src/app/model/shippingGround';
import { shippingMaritime } from 'src/app/model/shippingMaritime';
import { GroundShippingService } from 'src/app/service/GroundShipping.service';
import { MaritimeshippingService } from 'src/app/service/maritimeshipping.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  isShippingGround: boolean = false;
  isShippingMaritime: boolean = false;

  ListGroundShipping: ground[] = [];

  ListMaritimeShipping: Maritime[] = [];



  constructor(private service: GroundShippingService,
    private serviceMaritime: MaritimeshippingService) { }

  getAllGround() {
    this.service.getAll().subscribe(res => {
      if (res) {
        this.ListGroundShipping = res
      }
    });
  }

  getAllMaritie() {
    this.serviceMaritime.getAll().subscribe(res => {
      if (res) {
        this.ListMaritimeShipping = res;
        console.log(this.ListMaritimeShipping);
      }
    });
  }


  toggleShippingGround() {
    this.isShippingGround = !this.isShippingGround;
    if (this.isShippingMaritime === true) {
      this.isShippingMaritime = false;
    }

  }

  toggleShippingMaritime() {

    this.isShippingMaritime = !this.isShippingMaritime;
    if (this.isShippingGround === true) {
      this.isShippingGround = false;
    }

  }

  ngOnInit() {
    this.getAllGround();
    this.getAllMaritie();

  }

  deleteGround(guideNumber: string) {
    Swal.fire({
      title: "¿Estás seguro de esta acción?",
      text: "El Envio seleccionado será eliminado de la base de datos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar el usuario solo si la acción es confirmada
        this.service.delete(guideNumber).subscribe(
          () => {
            // Actualizar la lista de usuarios después de la eliminación
            this.getAllMaritie();
            Swal.fire({
              title: "Eliminado",
              text: "El envio ha sido eliminado correctamente",
              icon: "success"
            });
          },
          (error) => {
            // Manejar errores de eliminación
            Swal.fire({
              title: "Error",
              text: 
              error,
              icon: "error"
            });
          }
        );
      }
    });
  }
  deleteMaritime(guideNumber: string) {
    Swal.fire({
      title: "¿Estás seguro de esta acción?",
      text: "El Envio seleccionado será eliminado de la base de datos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar el usuario solo si la acción es confirmada
        this.serviceMaritime.delete(guideNumber).subscribe(
          () => {
            // Actualizar la lista de usuarios después de la eliminación
            this.getAllMaritie();
            Swal.fire({
              title: "Eliminado",
              text: "El Envio ha sido eliminado correctamente",
              icon: "success"
            });
          },
          (error) => {
            // Manejar errores de eliminación
            Swal.fire({
              title: "Error",
              text: 
              error,
              icon: "error"
            });
          }
        );
      }
    });
  }

}
