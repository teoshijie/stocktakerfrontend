import { STOCKS } from '../Components/constant/constant';
import http from './httpServices';



export async function getAllStocks() {
    return await http.get(`${STOCKS}/getall`)
}

export async function getAllBrands() {
    return await http.get(`${STOCKS}/getbrand`)
}

export async function postNewProduct(data) {
    console.log('data', data)
    return await http.post(`${STOCKS}/createstocks`, {
        productname: data.name,
        brand: data.brand,
        quantity: data.quantity
    })
}

export async function subtractProduct(data) {
    return await http.put(`${STOCKS}/outflow/item/${data._id}`, {
        productname: data.productname,
        brand: data.brand,
        quantity: data.subtraction
    })
}

export async function addProduct(data) {
    console.log('added')
    console.log('data', data)
    return await http.put(`${STOCKS}/inflow/item/${data._id}`, {
        productname: data.productname,
        brand: data.brand,
        quantity: data.addition
    })
}

export async function addBrand(data) {
    console.log(data)
    return await http.post(`${STOCKS}/addbrand`, {
        brand: data
    })
}