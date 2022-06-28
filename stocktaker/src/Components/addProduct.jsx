import React, { Component } from 'react';
import { getAllBrands, postNewProduct } from '../Services/stockServices'
import { ToastContainer } from 'react-toastify';

class AddProduct extends Component {

    state = {
        data: {
            name: '',
            brand: '',
            quantity: ''
        },
        brands: ''
    }

    componentDidMount = () => {
        getAllBrands()
            .then((response) => {
                console.log(response)
                this.setState({ brands: response.data })
            }).catch((error) => {
                if (error.response && error.response.status === 404)
                alert('This post has already been deleted')
            })
    }



    handleChange = ({ currentTarget: input }) => {
        console.log(input)
        let data = { ...this.state.data }
        data[input.name] = input.value
        this.setState({ data })

    }

    renderBrands() {
        return (
            <label>Brands
                <select name="brand" onChange={this.handleChange}>
                    {this.state.brands.map(brand => (
                        <option key={brand.brand} value={brand.brand}>
                            {brand.brand}
                        </option>
                    ))}
                </select>
            </label>


        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('submitted')
        postNewProduct(this.state.data)
            .then(res => {
                if (res.status === 200) {
                    window.location = "/";
                }
            }).catch(err => {
                console.log(err)
                let errors = { ...this.state.errors }
                errors = err
                this.setState({ errors })
            })
    }

    render() {
        console.log(this.state.data)

        return (<React.Fragment>
            <ToastContainer/>
                        <h1>Add Product </h1>
            <form onSubmit={this.handleSubmit}  class="form-inline">
                <div class="form-group">
                    <label for="productName">Product Name</label>
                    <input type="text" class="form-control" id="productName" aria-describedby="emailHelp" placeholder="Product Name"
                        onChange={this.handleChange}
                        value={this.state.data.productName}
                        name="name"
                    />
                </div>
                {this.state.brands ? this.renderBrands() : ''}


                <div class="form-group">
                    <label for="quantity">Quantity</label>
                    <input onChange={this.handleChange}
                        value={this.state.data.quantity}
                        type="number"
                        name="quantity"
                        className="form-control" id="quantity" placeholder="Quantity" />
                </div>
                <button
                    type="submit" className="btn btn-primary my-1">Submit</button>
            </form>
        </React.Fragment>);
    }
}

export default AddProduct;
