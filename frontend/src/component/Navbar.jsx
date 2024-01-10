import React, { useEffect, useState } from 'react';

import styled from "styled-components";


const Navbar = () => {
  const [loginState, setCount] = useState(false);
  return (
    <NavDiv id='navbar' className="navbar bg-warning-subtle">
      <div className="navbar-container">
        <i className="fa-solid fa-p fa-beat fa-l">rachi</i>
      </div>
    </NavDiv>
  );
};

const NavDiv = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: 'Roboto Slab', serif;
    position: relative;
    height: 60px;
  .navbar-container {
      padding: 10px 30px;
      font-family: 'Roboto Slab', serif;
      text-decoration: none;
  }
  &::after{
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    border: 0.5px solid #767976;
    box-shadow: 2px 2px 10px black ;
  }
`;


export default Navbar;