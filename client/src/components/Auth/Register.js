import React, { Fragment, useState } from 'react';
import axios from 'axios';


const Register = ()=>
{
   const[formData, setFormData]=useState({
    name: '',
    email:'',
    password:'',
    password2:''
   });

   const {name, email, password, password2} = formData;
   const options = [
    'one', 'two', 'three'
  ];
   const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
   const onSubmit = async e =>
   {
       e.preventDefault();
       if(password!==password2)
       {
           console.log('Password do not match');
       }
       else {
           const newUser ={
               name,
               email,
               password
           }

           try{
                const config = {
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
                const body = JSON.stringify(newUser);
                const res = await axios.post('/api/Auth', body, config);
                console.log(res.data);
           }

           catch(err){
            console.error(err.response.data);
           }
       }
   }


    return (
<Fragment>
 
    <form className="signup-form" onSubmit={e=>onSubmit(e)}>
        <div className="row text-center form-group">
            <div  className = 'col-md-8 col-md-offset-2'>
             <input placeholder="Name" required="required" type='text' 
             name="name" value={name} 
             onChange={e=>onChange(e)} 
             />  
          </div>
       </div>

       <div className="row text-center form-group">
            <div  className = 'col-md-8 col-md-offset-2'>
             <input name="email" placeholder="Email Address" required="required" 
             value={email} onChange={e=>onChange(e)}
             type='email'/>  
          </div>
       </div>

       <div className="row text-center form-group">
            <div  className = 'col-md-8 col-md-offset-2'>
             <input name="password" placeholder="Password" required="required" 
             value={password} onChange={e=>onChange(e)}
             type='Password'/>  
          </div>
       </div>
       <div className="row text-center form-group">
            <div  className = 'col-md-8 col-md-offset-2'>
             <input name="password2" placeholder="Confirm Password" required="required" 
             value={password2} onChange={e=>onChange(e)}
             type='Password'/>  
          </div>
       </div>
       <div className="row text-center form-group">
       <div  className = 'col-md-8 col-md-offset-2'>
       <input type="submit" value="Register" className="btn btn-primary" />
 </div>
      
    </div>
      </form>
   
</Fragment>
    )
}

export default Register 