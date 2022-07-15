import './Home.css';
import { Outlet, Link } from "react-router-dom";
import {Button} from 'react-bootstrap'
//import ProgressButton from 'react-progress-button'
import { useState } from 'react';
import ReactiveButton from 'reactive-button';



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
        <div className = "homepage text-light bg-transparent">
            <h1>TogyzQ</h1>
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
                messageDuration={2000}
                disabled={false}
                buttonRef={null}
                width={null}
                height={null}
                animation={true}
            />
            </Link>
            <ReactiveButton
                buttonState={state}
                onClick={onClickHandler}
                color={'yellow'}
                idleText={'Play: Random'}
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
                messageDuration={2000}
                disabled={false}
                buttonRef={null}
                width={null}
                height={null}
                animation={true}
            />
           
        </div>
      );
  }
  
  export default Home;