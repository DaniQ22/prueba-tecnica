import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customerModel } from 'src/app/model/customerModel';
import { shippingground } from 'src/app/model/shippingGround';
import { shippingMaritime } from 'src/app/model/shippingMaritime';
import { GroundShippingService } from 'src/app/service/GroundShipping.service';
import { MaritimeshippingService } from 'src/app/service/maritimeshipping.service';
import { PortService } from 'src/app/service/port.service';
import { ProductService } from 'src/app/service/product.service';
import { WarehouseService } from 'src/app/service/warehouse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {

  mainForm!: FormGroup;


  idProduct!: number; // Variable para almacenar el valor seleccionado del tipo de envío
  idWarehouse!: number;
  portId!:number;

  isShippingGround: boolean = false;
  isShippingMaritime: boolean = false;

  formShippingGround!: FormGroup;
  formShippingMartime!: FormGroup;

  dataShippingGround!: shippingground;
  dataShippingMaritime!: shippingMaritime;

  dataCustomer!: customerModel;
  fomrCustomer!: FormGroup;

  listProduct: any[] = [];
  listWarehouse: any[] = [];

  listPor: any[] = [];




  constructor(private formBuilder: FormBuilder,
    private serviceProduct: ProductService,
    private serviceShippingground: GroundShippingService,
    private serviceWarehouse: WarehouseService,
    private serviceShippingMaritime: MaritimeshippingService,
    private servicePort: PortService) { }

  ngOnInit(
  ) {

    this.getAllWarehouse();

    this.getAllProduct();

    this.getPort();


    this.formShippingMartime = this.formBuilder.group({
      fleetNumber: ['', Validators.required],
      quantityProduct: ['', Validators.required],
      price: ['', Validators.required],
      dateDelivery: ['', Validators.required]

    })


    this.formShippingGround = this.formBuilder.group({
      licensePlate: ['', Validators.required],
      quantityProduct: ['', Validators.required],
      price: ['', Validators.required],
      dateDelivery: ['', Validators.required]
    });

    this.fomrCustomer = this.formBuilder.group({
      customerId: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      addres: ['', Validators.required]
    })

  }

  toggleShippingGround() {
    this.isShippingGround = !this.isShippingGround;
    if (this.isShippingMaritime === true) {
      this.isShippingMaritime = false;
    }

  }

  getAllProduct() {
    this.serviceProduct.getALL().subscribe(res => {
      if (res) {
        this.listProduct = res;
      }
    })
  }

  getAllWarehouse() {
    this.serviceWarehouse.getAll().subscribe(res => {
      if (res) {
        this.listWarehouse = res;
      }
    });
  }

  getPort() {
    this.servicePort.getAll().subscribe(res => {
      if (res) {
        this.listPor = res;
      }
    });
  }

  sendShippingGround() {
    if (this.fomrCustomer.valid && this.formShippingGround.valid) {

      this.dataShippingGround = this.formShippingGround.value;
      this.dataCustomer = this.fomrCustomer.value;
      this.dataShippingGround.customer = this.dataCustomer;
      this.dataShippingGround.deliveryWarehouse = this.idWarehouse;
      this.dataShippingGround.typeProduct = this.idProduct;
      console.log('Datos que se envian', this.dataShippingGround);
      this.serviceShippingground.save(this.dataShippingGround).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Se ha creado un envio exitosamente',
          showConfirmButton: false,
          timer: 3000
        })
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          text: error,
          showConfirmButton: false,
          timer: 3000
        })
      })

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Datos invalidos',
        text: 'No deje un campo vacio',
        showConfirmButton: false,
        timer: 3000
      })
    }

  }

  sendShippingMaritime() {
    if (this.fomrCustomer.valid && this.formShippingMartime.valid) {
      this.dataShippingMaritime = this.formShippingMartime.value;
      this.dataCustomer = this.fomrCustomer.value;
      this.dataShippingMaritime.customer = this.dataCustomer;
      this.dataShippingMaritime.portDelivery = this.portId;
      this.dataShippingMaritime.typeProduct = this.idProduct;
      console.log('Datos que se envian', this.dataShippingMaritime);
      this.serviceShippingMaritime.save(this.dataShippingMaritime).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Se ha creado un envio exitosamente',
          showConfirmButton: false,
          timer: 3000
        })
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          text: error,
          showConfirmButton: false,
          timer: 3000
        })
      })

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Datos invalidos',
        text: 'No deje un campo vacio',
        showConfirmButton: false,
        timer: 3000
      })
    }


  }


  onProductSelect(event: any) {
    const productId = event.target.value;
    if (productId) {
      this.idProduct = parseInt(productId, 10);
      console.log('ProductId seleccionado:', productId);
    }
  }

  onWarehouseSelect(event: any) {
    const warehouseId = event.target.value;
    if (warehouseId) {
      this.idWarehouse = parseInt(warehouseId, 10);
    }
  }

  onPortSelected(event: any){
    const portId = event.target.value;
    if(portId){
      this.portId = parseInt(portId, 10);
    }
  }

  toggleShippingMaritime() {

    this.isShippingMaritime = !this.isShippingMaritime;
    if (this.isShippingGround === true) {
      this.isShippingGround = false;
    }

  }

}
