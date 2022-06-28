import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from "react-router-dom";
import { getAllBrands, addProduct, subtractProduct } from '../Services/stockServices';
import UserContext from './../Context/Usercontext';


// class Item extends Component {
//     state = {  } 
//     render() { 
//         return ();
//     }
// }
 
// export default Item;

const Item = () => {

    const currentUser = useContext(UserContext)
    const location = useLocation();

    let data = location.state
    console.log(data)
    const [brands, setBrands] = useState(null)
    const [stock, setStock] = useState({})


    useEffect(() => {
        getAllBrands()
            .then(result => {
                console.log(result.data)
                setBrands(result.data)
            })
        setStock(location.state)
    }, [])

   const findbrand = (stock) => {
        const findBrand = brands.filter(brand => brand._id === stock)
        const brand = findBrand.map(brand => brand.brand)
        console.log(brand)
        return brand
    }
   
    const renderBrands = () => {
        return (
            <label>Brands
                <select name="brand" value = { findbrand(data.brand)} onChange={handleChange}>
                    {brands.map(brand => (
                        <option key={brand.brand} value={brand.brand}>
                            {brand.brand}
                        </option>
                    ))}
                </select>
            </label>


        )
    }

    const handleSubmit = e => {

        e.preventDefault()

        if(stock.addition > 0) {
            addProduct(stock).
            then(res => {
                if (res.status === 200) {
                    window.location = '/'
                }
            }).catch(err => {
                console.log(err)
            })
        }

        if (stock.subtraction > 0) {
            subtractProduct(stock).
            then(res => {
                if (res.status === 200) {
                    window.location = '/'
                }
            }).catch(err => {
                console.log(err)
            })
        }   

        if(stock.subtraction === 0 && stock.addition === 0){
            addProduct(stock).
            then(res => {
                if (res.status === 200) {
                    window.location = '/'
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    
const handleChange = ({currentTarget: input}) => {
    let stockData = {...stock}
    stockData[input.name]= input.value
    setStock(stockData)
}

    return (
     currentUser ? (
        <div>
            <form onSubmit={handleSubmit} >
                <div class="form-group">
                    <label htmlFor="productname">Product Name</label>
                    <input
                        name="productname"
                        onChange={handleChange}
                        value={stock.productname}
                        type="text"
                        class="form-control"
                        id="productname"
                        aria-describedby="emailHelp"
                    />
                </div>

                {brands ? renderBrands() : ''}


                <div class="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        name="quantity"
                        value={stock.quantity}
                        type="number"
                        class="form-control"
                        id="quantity"
                    />
                </div>
                
                <div class="form-group">
                    <label htmlFor="addition">IN</label>
                    <input
                        name="addition"
                        onChange={handleChange}
                        type="number"
                        class="form-control"
                        id="quantity"
                        disabled= {stock.subtraction}
                    />
                </div>
                
                <div class="form-group">
                    <label htmlFor="subtraction">OUT</label>
                    <input
                        name="subtraction"
                        onChange={handleChange}
                        type="number"
                        class="form-control"
                        id="quantity"
                        disabled= {stock.addition}
                    />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>) : window.location ='/prompt'
    );
}

export default Item;