import { Component, OnInit } from '@angular/core';
import { Maritime, ground } from 'src/app/model/modelShippings';
import { shippingground } from 'src/app/model/shippingGround';
import { shippingMaritime } from 'src/app/model/shippingMaritime';
import { GroundShippingService } from 'src/app/service/GroundShipping.service';
import { MaritimeshippingService } from 'src/app/service/maritimeshipping.service';
import { PortService } from 'src/app/service/port.service';
import { WarehouseService } from 'src/app/service/warehouse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  isUpdateShipping: boolean = false;


  isShippingGround: boolean = false;
  isShippingMaritime: boolean = false;

  ListGroundShipping: ground[] = [];

  ListMaritimeShipping: Maritime[] = [];



  constructor(private service: GroundShippingService,
    private serviceMaritime: MaritimeshippingService, 
    private servicePort: PortService,
    private serviceWarehouse: WarehouseService) { }

  getAllGround() {
    this.service.getAll().subscribe(res => {
      if (res) {
        this.ListGroundShipping = res
        const warehouseId = this.ListGroundShipping.map(shipping => shipping.deliveryWarehouse);

        warehouseId.forEach(warehouseId => {
          this.serviceWarehouse.getById(warehouseId).subscribe(warehouse => {
            // Asignar los detalles del puerto correspondiente a cada envío
            const shipping = this.ListGroundShipping.find(s => s.deliveryWarehouse === warehouseId);
            if (shipping) {
              shipping.warehouse = warehouse; // Asumiendo que shipping tiene una propiedad para los detalles del puerto
            }
          });
        });

      }
    });
  }

  getAllMaritie() {
    this.serviceMaritime.getAll().subscribe(res => {
      if (res) {
        this.ListMaritimeShipping = res;      


        // Mapear los IDs de los puertos de entrega
        const portIds = this.ListMaritimeShipping.map(shipping => shipping.portDelivery);
      
        // Obtener los detalles de los puertos mediante sus IDs
        portIds.forEach(portId => {
          this.servicePort.getById(portId).subscribe(port => {
            // Asignar los detalles del puerto correspondiente a cada envío
            const shipping = this.ListMaritimeShipping.find(s => s.portDelivery === portId);
            if (shipping) {
              shipping.port = port; // Asumiendo que shipping tiene una propiedad para los detalles del puerto
            }
          });
        });
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

  toggleUpdateSHippingGround(){
    this.isUpdateShipping = !this.isUpdateShipping;
  }

}
