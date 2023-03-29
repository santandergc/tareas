import Menulist from './components/menulist'
import PlatoList from './components/platolist';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PlatoDetalle from './components/platodetalle';
import MenuDetalle from './components/menudetalle';
import IngredienteDetalle from './components/ingredientedetalle';
import IngredienteList from './components/ingredientelist';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menulist/>}/>
        <Route path="/platos" element={<PlatoList/>}/>
        <Route path="/platos/:id" element={<PlatoDetalle/>} />
        <Route path="/menus/:id" element={<MenuDetalle/>} />
        <Route path="/ingredientes/:id" element={<IngredienteDetalle/>} />
        <Route path="/ingredientes" element={<IngredienteList/>} />


      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
