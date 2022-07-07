import './Home.css';
import { Outlet, Link } from "react-router-dom";
import {Button} from 'react-bootstrap'

function Home () {
   //if(board.full) return<Modal winner={player} freeze />
        
  
    return (
        <div className = "homepage text-light bg-transparent">
            <h1>Home</h1>
            <button variant="warning"><Link to="/game">Play</Link></button>
        </div>
      );
  }
  
  export default Home;