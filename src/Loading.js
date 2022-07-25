import './Loading.css';

import { useState } from 'react';


function Loading() {
  return (
    <>
		<div class="canvas-container"></div>
		<div class="ui-container">
			<div class="right"></div>
		</div>
		<div class="loader-container">
			<div class="loader"></div>
			<div class="loader-text"></div>
		</div>
  </>
  );
}

export default Loading;