import './Loading.css';

import { useState } from 'react';


function Loading({visible}) {
  return (
    <>
		<div className="canvas-container" style={{ display: visible ? 'flex' : 'none' }}>
		<div className="ui-container">
			<div className="right"></div>
		</div>
		<div className="loader-container">
			<div className="loader"></div>
			<div className="loader-text"></div>
		</div>
		</div>
  </>
  );
}

export default Loading;