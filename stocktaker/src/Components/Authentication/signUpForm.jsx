import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from "react-hook-form";
import { signup } from '../../Services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        try {
            let response = await signup(data)
            console.log('response', response)
            if (response.status === 200){
                toast('Registration successful')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name'
                        type="text"
                        {...register("name", { required: true, maxLength: 20 })}
                    />

                </Form.Field>
                {errors.name && <p>Please check the First Name</p>}
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email'
                        type="email"
                        {...register("email", {
                            required: true,
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })} />
                </Form.Field>
                {errors.email && <p>Please check the First Name</p>}

                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password'
                        type="password"
                        {...register("password", {
                            required: true,
                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                        })} />
                </Form.Field>
                {errors.password && <p>Password should have 1 Capital Letter, 1 Small Letter, and 6 to 15 characters.</p>}

                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )


}

export default SignUpForm

// class SignUpForm extends Component {

//     state = {
//         data: {
//             email: "",
//             password: "",
//             name: ""
//         },
//         errors: { }
//     }

//     validateProperty = ({name,email, password, value}) => {
//         if(name === 'username') {
//             if (value.trim() === '') return 'Username is required '
//         }

//         if(email === 'email') {
//             if (value.trim() === '') return 'Email is required '
//         }

//         if(password === 'password') {
//             if (value.trim() === '') return 'Password is required '
//         }
//     }

//     handleChange = ({currentTarget: input}) => {

//         const errors = {...this.state.errors}
//         const errorMessage = this.validateProperty(input)
//         if (errorMessage) errors[input.name] = errorMessage
//         const data = { ... this.state.data }
//         data[input.name] = input.value
//         this.setState({ data })
//     }

//     validate = () => {

//         const errors = {}
//         if (this.state.data.email.trim() === '') {
//             errors.email = 'Email is required'
//         }
//         if (this.state.data.password.trim() === '') {
//             errors.password = 'Password is required'
//         }
//         if (this.state.data.name.trim() === '') {
//             errors.name = 'Name is required'
//         }
//         return Object.keys(errors).length === 0 ? null : errors
//     }

//     doSubmit = async (e) => {
//         e.preventDefault()

//         const errors = this.validate();
//         this.setState({ errors: errors || {} })

//         if (errors) return

//         console.log('clicked')
//         console.log(this.state.data)
//         await register(this.state.data)
//     }

//     render() {

//         const { data, errors } = this.state;

//         return (
//             <div>
//                 <h1>Sign Up</h1>
//                 <form onSubmit={this.doSubmit} >
//                     <div class="form-group">
//                         <label htmlFor="email">Email address</label>
//                         <input
//                             name="email"
//                             onChange={this.handleChange}
//                             value={this.state.data.email}
//                             type="email"
//                             class="form-control"
//                             id="email"
//                             aria-describedby="emailHelp"
//                             placeholder="Enter email"
//                             errors={this.state.errors.email} />
//                         <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
//                         {errors && <div className="alert alert-danger" > {errors.email} </div>}
//                     </div>
//                     <div class="form-group">
//                         <label htmlFor="name">Name</label>
//                         <input
//                             name="name"
//                             onChange={this.handleChange}
//                             value={this.state.data.name}
//                             type="name"
//                             class="form-control"
//                             id="name"
//                             placeholder="Name"
//                             errors={this.state.errors.name}
//                         />
//                         {errors && <div className="alert alert-danger" > {errors.name} </div>}
//                     </div>
//                     <div class="form-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                         name="password"
//                         onChange={this.handleChange}
//                         value={this.state.data.password}
//                         type="password"
//                         class="form-control"
//                         id="password"
//                         placeholder="Password"
//                         errors={this.state.errors.password}
//                         pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
//                         title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
//                         />
//                     </div>
//                     {errors && <div className="alert alert-danger" > {errors.name} </div>}

//                     <button type="submit" class="btn btn-primary">Submit</button>
//                 </form>

//             </div>
//         );
//     }
// }

// export default SignUpForm;