import React from 'react';
import { Link } from 'react-router-dom'

import './header.css'

export default function Header() {
 return (
   <header>
       <Link className="logo" to="/">Filmaria 2021</Link>
       <Link className="favoritos" to="/favoritos">Salvos</Link>
   </header>
 );
}