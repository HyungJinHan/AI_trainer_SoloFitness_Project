import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../../styles/Navigator/Navigator.css'
import home from '../../static/images/HHJ/Navigator/home_white.svg'
import rank from '../../static/images/HHJ/Navigator/rank_white.svg'
import search from '../../static/images/HHJ/Navigator/search_white.svg'
import user from '../../static/images/HHJ/Navigator/user_white.svg'
import styled from "styled-components";

const NavCenter = styled.div`
  text-align: center;
  padding-top: 5.625rem;
`;

function Navigator(props) {
  const navigate = useNavigate();

  return (
    <NavCenter>
      <div className='Navigator_bar'>
        <img
          className='Navigator_image'
          src={home}
          alt="undefind"
          onClick={
            () => {
              navigate('/usermain');
            }
          }
        />
        <img
          className='Navigator_image'
          src={search}
          alt="undefind"
          onClick={
            () => {
              navigate('/category');
            }
          }
        />
        <img
          className='Navigator_image'
          src={rank}
          alt="undefind"
          onClick={
            () => {
              navigate('/challenge');
            }
          }
        />
        <img
          className='Navigator_image'
          src={user}
          alt="undefind"
          onClick={
            () => {
              navigate('/usermypage');
            }
          }
        />
      </div>
    </NavCenter>
  );
}

export default Navigator;