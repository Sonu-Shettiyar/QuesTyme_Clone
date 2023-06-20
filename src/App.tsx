import axios from 'axios';
import AllRoutes from "./AllRoutes"
import "./App.css"
import React from 'react';
axios.defaults.baseURL ="http://35.178.167.63:8888/"


function App(){
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;




