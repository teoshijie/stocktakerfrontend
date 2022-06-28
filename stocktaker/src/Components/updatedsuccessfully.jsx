import React, { Component } from 'react';
import { useEffect } from 'react';


const UpdatedSuccessfully = () => {

    useEffect(() =>{
        setTimeout(() => {
            window.location='/allitems'
        }, 1500);
    }, [])

    return (<React.Fragment>

        <h1>Updated Successfully!</h1>
        <h1>Redirecting...</h1>

    </React.Fragment>  );
}
 
export default UpdatedSuccessfully ;