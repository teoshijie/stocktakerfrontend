import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import UserContext from './Context/Usercontext';


const Navbar = () => {

    const currentUser = useContext(UserContext)
    console.log(currentUser)

    return (<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <Link to="/allitems/">Home</Link>
                </li>
                <li class="nav-item">
                    <Link to="/additem">Add Item</Link>
                </li>
                {
                    (!currentUser &&

                        <React.Fragment>
                            <li class="nav-item">
                                <Link to="/">Login</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/signup">Sign Up</Link>
                            </li>
                        </React.Fragment>)
                }

                {
                    ( currentUser &&

                        <React.Fragment>
                            <li class="nav-item">
                               {currentUser.name}
                            </li>
                            <li class="nav-item">
                                <Link to="/logout">Sign Out</Link>
                            </li>
                        </React.Fragment>)
                }

            </ul>
        </div>
    </nav>);
}


export default Navbar;