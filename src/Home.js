import './Home.css';
import { Outlet, Link } from "react-router-dom";
import {Button} from 'react-bootstrap'
//import ProgressButton from 'react-progress-button'
import { useState } from 'react';
import ReactiveButton from 'reactive-button';
import ornament from './assets/images/ornament.png';



function Home () {
   //if(board.full) return<Modal winner={player} freeze />
   const [state, setState] = useState('idle');

   const onClickHandler = () => {
     setState('loading');
     setTimeout(() => {
       setState('success');
     }, 2000);
   };
    return (

        <div className = "homepage text-light bg-transparent row">
            <div className="banner svelte-1v7r4ll col-12">
              <div className="logo svelte-1v7r4ll" ><img src={ornament} alt="logo" style={{objectFit: 'cover', width: '10%'}}></img>TOGYZQ</div> 
              
              <div className="menu svelte-1v7r4ll">
              <div className="item blue svelte-1v7r4ll"><Link to="/game">OINAU</Link></div> 
              
              <div className="separator svelte-1v7r4ll"></div> 
              <div className="item svelte-1v7r4ll"><Link to="/rules">RULES</Link>
              </div> 
              <div className="item svelte-1v7r4ll">LOL
			          <div className="sub svelte-1v7r4ll">
                  <a href="/" className="item svelte-1v7r4ll">WIKI</a> 
                  <a href="/" className="item svelte-1v7r4ll">DISCORD</a> 
                  <a href="/" className="item svelte-1v7r4ll">REDDIT</a> 
                  <a href="/" className="item svelte-1v7r4ll">TWITCH</a>
                </div>
              </div> 
              <div className="separator svelte-1v7r4ll"></div> 
              
              <div className="item svelte-1v7r4ll">LOGIN

              </div>
            </div>
            </div>
           

        
          <Link to="/game">
            <ReactiveButton 
                buttonState={state}
                onClick={onClickHandler}
                color={'primary'}
                idleText={'Play: Normal'}
                loadingText={'Loading'}
                successText={'Success'}
                errorText={'Error'}
                type={'button'}
                className={'class1 class2'}
                style={{ borderRadius: '5px' }}
                outline={false}
                shadow={false}
                rounded={false}
                size={'large'}
                block={false}
                messageDuration={1000}
                disabled={false}
                buttonRef={null}
                width={'15wv'}
                height={null}
                animation={true}
            />
            </Link>
            <Link to="/game">
            <ReactiveButton
                buttonState={state}
                onClick={onClickHandler}
                color={'yellow'}
                idleText={'Play: Random'}
                loadingText={'Loading'}
                successText={'Success'}
                errorText={'Error'}
                type={'button'}
                className={'class1 class2 '}
                style={{ borderRadius: '5px' }}
                outline={false}
                shadow={false}
                rounded={false}
                size={'large'}
                block={false}
                messageDuration={1000}
                disabled={false}
                buttonRef={null}
                width={'15wv'}
                height={null}
                animation={true}
            /></Link>
           
        </div>
      );
  }
  
  export default Home;