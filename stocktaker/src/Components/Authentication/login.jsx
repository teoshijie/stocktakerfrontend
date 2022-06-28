import React, { Component, useState } from 'react';
import { signIn } from '../../Services/userService'
// import { signIn } from '../constant/constant';
import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { replace } from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    const [data, setdata] = useState(
        {
            email: "",
            password: ""
        }
    )

    const [errors, seterrrors] = useState("")
    const nav = useNavigate()
    const handleChange = ({ currentTarget: input }) => {

        let newData = { ...data }
        console.log('data', newData)
        newData[input.name] = input.value
        setdata(newData)

    }

    const doSubmit = async (e) => {
        e.preventDefault()
        try {
            await signIn(data)
            nav('/home')
        } catch (error) {
            console.log(error.response.data)
            toast(error.response.data)
        }

    }

    return (<React.Fragment>

        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <ToastContainer />

        <h1>Sign In</h1>
        <form onSubmit={doSubmit} >
            <div class="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    type="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    errors={errors.email} />
                {errors.email && <div className="alert alert-danger" > {errors.email} </div>}
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                    errors={errors.password}

                />
            </div>
            {/* {errors && <div className="alert alert-danger" > {errors.name} </div>} */}

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>


    </React.Fragment>);
}

export default Login;

// class Login extends Component {


//     state = {
//         data: {
//             email: "",
//             password: ""
//         },
//         errors: {}
//     }


//     handleChange = ({ currentTarget: input }) => {

//         let data = { ...this.state.data }
//         data[input.name] = input.value
//         this.setState({ data })
//     }


//     doSubmit = async (e) => {
//         e.preventDefault()

//         await signIn(this.state.data)
//         this.props.history.push('/home')
//         // if (ex && ex.response.status === 400) {
//         //     console.log(ex)
//         //     let errors = { ...this.state.errors }
//         //     errors.email = ex.response.data

//         //     this.setState({errors})
//         // }
//     }
//     // try {
//     //     let {data: jwt} = await userService.signIn(this.state.data)
//     //   console.log(jwt)
//     // } catch (ex) {
//     //     console.log(ex.message)
//     //     if (ex && ex.response.status === 400) {
//     //         console.log(ex)
//     //         let errors = { ...this.state.errors }
//     //         errors.email = ex.response.data

//     //         this.setState({errors})
//     //     }




//     // await axios.post(SIGN_IN, {
//     //     email:  data.email,
//     //     password:  data.password
//     // }


//     // ).then( (result) => {
//     //     console.log(result)
//     // }).catch( (ex) => {

//     //     if (ex && ex.response.status === 400) {
//     //         let errors = { ...this.state.errors }
//     //         errors.email = ex.message
//     //         this.setState({ errors })
//     //     }
//     // })


//     render() {
//         return (<React.Fragment>
//             <h1>Sign In</h1>
//             <form onSubmit={this.doSubmit} >
//                 <div class="form-group">
//                     <label htmlFor="email">Email address</label>
//                     <input
//                         name="email"
//                         onChange={this.handleChange}
//                         value={this.state.data.email}
//                         type="email"
//                         class="form-control"
//                         id="email"
//                         aria-describedby="emailHelp"
//                         placeholder="Enter email"
//                         errors={this.state.errors.email} />
//                     {this.state.errors.email && <div className="alert alert-danger" > {this.state.errors.email} </div>}
//                 </div>
//                 <div class="form-group">
//                     <label htmlFor="password">Password</label>
//                     <input
//                         name="password"
//                         onChange={this.handleChange}
//                         value={this.state.data.password}
//                         type="password"
//                         class="form-control"
//                         id="password"
//                         placeholder="Password"
//                         errors={this.state.errors.password}

//                     />
//                 </div>
//                 {/* {errors && <div className="alert alert-danger" > {errors.name} </div>} */}

//                 <button type="submit" class="btn btn-primary">Submit</button>
//             </form>


//         </React.Fragment>);
//     }
// }


// export default Login;