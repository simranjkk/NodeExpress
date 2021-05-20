import React from 'react';
import { Link } from 'react-router-dom';

const NavBar= ()=>
{
    return (
<div>
 <h1>
     NavBar

 </h1>
 <Link to = '/'>
 </Link>

 <Link to = '/register'>
     Register
 
 </Link>
 <br>
</br>
 <Link to = '/login'>
     Login
 </Link>
</div>
    )
}

export default NavBar