import React, { Component, createFactory } from 'react'
import { useEffect } from 'react';


const SuccessfulSignup = () => {

    useEffect(() => {
        setTimeout(() => {
            window.location = '/login'
        }, 1500)
    }, [])

    return (<React.Fragment>
        <h1>Sign Up Successful</h1>
        <h1>Redrecting to login page in 5 seconds. You may also click this link <a href='/login'>link</a></h1>
    </React.Fragment>


    );
}

export default SuccessfulSignup;