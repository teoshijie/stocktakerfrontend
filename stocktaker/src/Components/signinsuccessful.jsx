import React, { Component } from 'react';
import { useEffect } from 'react';


const SignInSuccessful = () => {

    useEffect(() =>{
        setTimeout(() => {
            window.location='/allitems'
        }, 1500);
    }, [])

    return (<React.Fragment>

        <h1>Sign in Successfully!</h1>
        <h1>Redirecting...</h1>

    </React.Fragment>  );
}
 
export default SignInSuccessful ;