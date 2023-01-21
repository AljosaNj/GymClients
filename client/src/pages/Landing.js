import main from '../assets/images/main-land.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';

import React from 'react';

const Landing = () => {

  return (
    <React.Fragment>
     
      <Wrapper>
        <nav>
       
        </nav>
        <div className='container page'>
          {/* info */}
          <div className='info'>
            <h1>
              Gym<span>Clients</span> app
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </p>
            <Link to='/register' className='btn btn-hero'>
              Login/Register
            </Link>
          </div>
          <img src={main} alt='job hunt' className='img main-img' />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default Landing;
