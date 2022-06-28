import React, { Component } from 'react';
import { addBrand } from '../Services/stockServices'

class AddBrand extends Component {
  
    state = {
        brand: '',
        errors: ''
    }

    handleChange = ({ currentTarget: input }) => {
        console.log(input)
        let brand = { ...this.state.brand }
        brand = input.value
        this.setState({ brand })

    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('submitted')
        addBrand(this.state.brand)
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

        return (<React.Fragment>
            <h1>Add Brand </h1>
            <form onSubmit={this.handleSubmit}  class="form-inline">
                <div class="form-group">
                    <label for="brand">Brand Name</label>
                    <input type="text" class="form-control" id="brand" aria-describedby="emailHelp" placeholder="brand"
                        onChange={this.handleChange}
                        value={this.state.brand}
                        name= "brand"
                    />
                </div>
                <button
                    type="submit" className="btn btn-primary my-1">Submit</button>
            </form>
        </React.Fragment>);
    }
}

export default AddBrand;
