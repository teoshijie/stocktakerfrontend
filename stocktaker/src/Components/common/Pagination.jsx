import React, { Component } from 'react';
import _ from 'lodash'
import { PropTypes } from 'prop-types';

const Pagination = (props) => {

    const { itemCounts, pageSize, onPageChange, currentPage } = props
    const pageCount = Math.ceil(itemCounts / pageSize)
    if (pageCount === 1) return null
    const pages = _.range(1, pageCount + 1)
    console.log(pages)

    return (<nav aria-label="Page navigation example">
        <ul class="pagination">
        {pages.map(page => {
           return <li key={page} class={page === currentPage? 'page-item active' : 'page-item'}><a class="page-link" onClick= {() => onPageChange(page)} >{page}</a></li>
        })}

        </ul>
    </nav>);
}
//props for our components as well as types
Pagination.propTypes = {
    itemCounts : PropTypes.number.isRequired , 
    pageSize: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired, 
    currentPage: PropTypes.number.isRequired
}

export default Pagination;