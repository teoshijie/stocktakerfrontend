import { SIGN_UP, SIGN_IN } from '../Components/constant/constant';
import http from './httpServices';


export async function signup(user) {
    console.log(user, 'axios')
    http.post(SIGN_UP, {
        email: user.email,
        password: user.password,
        name: user.name
    })
    
    .then(function (response) {
        // console.log(response, 'response')
        console.log(response)
        if (response.status === 200) {
            window.location = '/signupsuccessful'
        }
    })
        // .catch(function (error) {
        //     console.log(error);
        // })
}

export async function signIn(data) {
    // console.log('sign in user service')
    await http.post(SIGN_IN, {
        email: data.email,
        password: data.password,
    }).then(function (response) {
        if (response.status === 200){
            const jwt = response.data.token
            localStorage.setItem('token',jwt)
            console.log(response.data.token)
            window.location = '/signinsuccessful'
        }
    // }).catch((error) => {
    //     console.log(error)
        // await axios.post(SIGN_IN, { email: data.email,
        // //     password: data.password,});   
    })
}     

