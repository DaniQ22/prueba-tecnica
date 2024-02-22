
export interface ground {
    licensePlate: string,
    deliveryWarehouse: number,
    quantityProduct: number,
    price: number,
    typeProduct: number,
    dateDelivery: Date,
    discount: number,
    priceTotal: number,
    guideNumber: string
    customer: {
        customerId: string,
        name: string,
        lastName: string,
        phone: string,
        addres: string
    },
    product: {
        name: string
    },
    warehouse: {
        name: string
    }
  
}


export interface Maritime {
    fleetNumber: string,
    portDelivery: number,
    quantityProduct: number,
    price: number,
    typeProduct: number,
    dateDelivery: Date,
    discount: number,
    priceTotal: number,
    guideNumber: string
    customer: {
        customerId: string,
        name: string,
        lastName: string,
        phone: string,
        addres: string
    },
    product: {
        name: string
    },

    port: {
        name: string
    }
}





