import React from 'react';
import { Link } from 'react-router-dom'

import './not-found.css'

export default function NotFound() {
 return (
   <div className="not-found">
     <h1>404</h1>
       <h2>Ops! Página não encontrada...</h2>
       <Link to="/">Voltar para Home</Link>
   </div>
 );
}