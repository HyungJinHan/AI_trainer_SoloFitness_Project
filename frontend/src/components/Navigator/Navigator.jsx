import React from 'react';
import '../../styles/Navigator/Navigator.css'
import home from '../../static/images/HHJ/Navigator/home.svg'
import rank from '../../static/images/HHJ/Navigator/rank.svg'
import search from '../../static/images/HHJ/Navigator/search.svg'
import user from '../../static/images/HHJ/Navigator/user.svg'

function Navigator(props) {
  return (
    <div className='Navigator_bar'>
      <a href='/usermain'>
        <img className='Navigator_image' src={home} alt="undefind" />
      </a>
      <a href='category'>
        <img className='Navigator_image' src={search} alt="undefind" />
      </a>
      <a href='/challenge'>
        <img className='Navigator_image' src={rank} alt="undefind" />
      </a>
      <a href='/usermypage'>
        <img className='Navigator_image' src={user} alt="undefind" />
      </a>
    </div>
  );
}

export default Navigator;