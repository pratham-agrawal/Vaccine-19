import React from 'react';
import './home.css'
import Button from '@material-ui/core/Button';
import logo1 from '../Vaccine19Logo.png'
import Container from '@material-ui/core/Container';

function Home() {
    return (
      <div>
          <header className="header">
            <div className="vaccineTitle">
              <h1>VACCINE-19 </h1>
            </div>

            <div className="login">
              <Button href="http://localhost:3000/login" variant="contained" color="primary">Admin Login</Button>
            </div>
          </header>


          <div className="main">
          <img src = {logo1}/>
            <p >Making the distribution of vaccines simpler than ever. </p>
            <Button href="http://localhost:3000/form" variant="contained" color="primary" size="large">VACCINE SIGN UP</Button>
        
            
          </div>
      </div>
    );
  }
  
  export default Home;