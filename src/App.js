import './App.css';
import Game from './Game.js';
import Game1 from './Game1.js';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.js";
import Home from "./Home.js";
import Custom from "./Custom.js";
import Rules from "./Rules.js";



import { useState } from 'react';


// <Chat></Chat>

function App() {
  //if(board.full) return<Modal winner={player} freeze />
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game" element={<Game />} />
          <Route path="rules" element={<Rules />} />
          <Route path="game1" element={<Game1 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
