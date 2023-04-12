import React from "react";
import GoogleLogout from "../subModules/GoogleLogout";
import logo from "../../pictures/logo.png"
import "../../styles/navbar.css"


const NavBar = (props) => { 
 return(
    <div>
        <img src={logo} alt="logo" className="instagramLogo"></img>

<ul>
    <li><button>Home</button></li>
    <li><button>Create</button></li>
    <li><button>Profile</button></li>
<li>  <GoogleLogout/>  </li>
</ul>

        
    </div>
 )
}


export default NavBar;
