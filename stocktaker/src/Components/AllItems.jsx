import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { getAllStocks, getAllBrands } from '../Services/stockServices';
import Item from './Item'
import Pagination from './common/Pagination'
import { paginate } from './utils/pagination';
import PropTypes from 'prop-types'
import _, { filter } from 'lodash';
import UserContext from '../Context/Usercontext';


const AllItems = () => {

    const [sortColumn, setsortColumn] = useState({ path: 'title', order: 'asc' })
    const [pageSize, setpageSize] = useState(4)
    const [currentPage, setcurrentPage] = useState(null)
    const [stocks, setStocks] = useState(null)
    const [brands, setBrands] = useState(null)
    const [editStock, seteditStocks] = useState(null)
    const [selectedBrand, setselectedBrand] = useState(null)
    
    const currentUser = useContext(UserContext)



    let navigate = useNavigate();

    useEffect(() => {
        getAllBrands()
            .then(result => {
                console.log(result.data)
                setBrands(result.data)
            })
        getAllStocks()
            .then(result => {
                console.log(result.data)
                setStocks(result.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
        []

    )

    const handleBrandFilter = (brand) => {
        setselectedBrand(brand)
        setcurrentPage(1)
    }

    const handleSort = (path) => {
        console.log(path)
        let sortColumn1 = sortColumn
        if (sortColumn1.path === path)

            sortColumn1.order = (sortColumn1.order === 'asc') ? 'dsc' : 'asc'

        else {
            sortColumn1.path = path
            sortColumn1.order = 'asc'
        }
        console.log(sortColumn1)
        setsortColumn(sortColumn1)
 
    }




    const filtered = selectedBrand ? stocks.filter(m => m.brand === selectedBrand._id) : stocks
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const paginateStocks = paginate(sorted, currentPage, pageSize)

    const findbrand = (stock) => {
        const findBrand = brands.filter(brand => brand._id === stock)
        const brand = findBrand.map(brand => brand.brand)
        console.log(brand)
        return brand
    }

    const findStock = (stock) => {
        const index = stocks.indexOf(stock)
        return index

    }

    const handleChange = (page) => {
        setcurrentPage(page)
    }



    const renderTable = (stocks) => {
        return paginateStocks.map(stock => {
            return (

                <React.Fragment>

                    <tr>
                        <td>{stock.productname}</td>
                        <td>{findbrand(stock.brand)}</td>
                        <td>{stock.quantity}</td>
                        <td>
                            <button
                                onClick={() => navigate(`/item/${stock._id}/edit`, { state: stocks[findStock(stock)] })} type="submit"
                            >Edit

                            </button>
                        </td>
                    </tr>


                </React.Fragment >
            )

        })

    }

    const renderDropDownBrand = (brands) => {
        return brands.map(brand => {
            return (
                <>
                    {console.log('hit')}
                    <option onClick={() => handleBrandFilter(brand)} className="dropdown-item" value={brand.brand}>{brand.brand}</option>
                </>

            )
        })
    }

    return (
        currentUser ? 
        (<React.Fragment>
        {console.log('currentUser', currentUser)}

            <label className="dropdown" for="brands">Brands
                <select name="brand" id="brand">
                    <option onClick={() => handleBrandFilter()} className="dropdown-item">All brands</option>

                    {brands ? renderDropDownBrand(brands) : ''}
                </select>

            </label>



            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('productname')}  >Product Name</th>
                        <th onClick={() => handleSort('brand')} >Brand</th>
                        <th onClick={() => handleSort('quantity')} >Quantity</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks ? renderTable(stocks) : <h1>Loading Stocks</h1>}
                </tbody>
            </table>

            <Pagination

                onPageChange={handleChange}
                pageSize={pageSize}
                itemCounts={stocks ? stocks.length : 0}
                currentPage={currentPage}
            />

        </React.Fragment>) : window.location ='/prompt'

    );

}

export default AllItems;

