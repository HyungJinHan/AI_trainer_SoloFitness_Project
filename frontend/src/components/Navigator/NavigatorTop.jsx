import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../../styles/Navigator/NavigatorTop.css'
import Logo from '../../static/images/HHJ/icons/MainLogo.svg'

function NavigatorTop(props) {
  const navigate = useNavigate();

  return (
    <div>
      <img
        className='Navigator_imageTop'
        src={Logo}
        alt="undefind"
        onClick={
          () => {
            navigate('/usermain');
          }
        }
      />
    </div>
  );
}

export default NavigatorTop;