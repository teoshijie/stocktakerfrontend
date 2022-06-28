import React, {useEffect} from "react"

const Prompt = () => {

    useEffect(() => {
        setTimeout(() => {
            window.location = '/login'
        }, 1500) 
    },[])

    return (
        <React.Fragment>
            <h1>Please Sign in first via this <a href = '/'>link</a></h1>
            
            <h1>Page will be redirect after 5 seconds </h1>

        </React.Fragment>
    )
}

export default Prompt
