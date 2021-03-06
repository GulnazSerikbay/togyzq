import './Home.css';
import { Outlet, Link } from "react-router-dom";
import {Button} from 'react-bootstrap'
//import ProgressButton from 'react-progress-button'
import { useState } from 'react';
import ReactiveButton from 'reactive-button';
import ornament from './assets/images/ornament.png';
import './Rules.css'
import initBoard from './assets/images/init_board.jpeg';

function Rules () {
   //if(board.full) return<Modal winner={player} freeze />
   const [state, setState] = useState('idle');

  
    return (

        <div className = "homepage text-light bg-transparent row">
            <div class="banner svelte-1v7r4ll ">
              <div class="logo svelte-1v7r4ll" ><Link to="/"><img src={ornament} alt="logo" style={{objectFit: 'cover', width: '10%'}}></img>TOGYZQ</Link></div> 
              
              <div className="menu svelte-1v7r4ll">
              <div className="item blue svelte-1v7r4ll"><a href="game">OINAU</a></div> 
              
              <div className="separator svelte-1v7r4ll"></div> 
              <div className="item svelte-1v7r4ll"><a href="rules" className="item svelte-1v7r4ll">RULES</a>
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

            <div className="bigHeading svelte-c6ii9i ">
                <div className="line left svelte-c6ii9i"></div> 
                <div className="text svelte-c6ii9i"><span class="orange svelte-c6ii9i">Negizgi</span> </div> 
                <div className="line right svelte-c6ii9i"></div>
            </div>
            <div className="area svelte-s265wh"><img alt="board pic" src={initBoard} className="svelte-s265wh"></img> 
                <div className="box svelte-s265wh">
                    <p>To??yzqumalaq o??yny arna??y taqtada ek?? adam arasynda o??nalady. O??yn taqtasy ??? 2 qazan, 18 ota??, 162 qumalaqtan turady. O??yn basynda ??r o??ynshy??a b??r qazan, to??yz ota????a to??yz-to??yzdan salyn??an seksen b??r qumalaq t??es??l??.</p>
                    <p>Al??ashqy j??r??s jasa??an o??ynshyny ??? basta??shy, qarymta j??r??s jasa??an o??ynshyny ??? qosta??shy dep ata??dy. Ke??de basta??shy ??sh??n ??? aq ja??y, qosta??shy ??sh??n qara ja??y degen t??rkesterd?? de qoldanamyz.</p>
                    <p>Taqtany?? jalpy qurylysy o?? jaqta k??rset??lgende??:</p></div> 
            </div>
            <div className="bigHeading svelte-c6ii9i isRight"><div className="line left svelte-c6ii9i"></div> <div className="text svelte-c6ii9i"><span className="orange svelte-c6ii9i">Oyinshy</span> Jurisi</div> <div className="line right svelte-c6ii9i"></div></div>
            <div className="area svelte-s265wh isRight"><img alt="area - fjolgard.png" src="../img/areas/area - fjolgard.png" className="svelte-s265wh"></img> 
            <div className="box svelte-s265wh">
                <p>J??r??s o??ynshylar tarapynan kezektes??p j??r??led??. J??r??st?? k??mn???? jasa??tyny jerebemen nemeseqarsylastardy??  kel??s??m??men anyqtalady.</p>

                <p>1.J??r??s jasa?? ??sh??n ??z ja??y??yzda??y ota??lardy?? b??r??nen b??re????n ornyna qaldyryp, qal??an qumalaqtardy qol??a alyp, soldan o????a qara?? b??r-b??rlep taratamyz. Tarat?? s??t??nde qumalaqtar ??z ota??larymyzdan asyp ketet??n bolsa, qarsylasty?? ota??yna taratamyz. Eger so????y qumalaq qarsylasty?? taq sandy qumala??y bar ota??yna t??s??p, onda??y qumalaqtardy jup qylsa (2, 4, 6, 10, 12), sol ota??da??y qumalaqtar utyp alynyp, ??z qazanymyz??a salynady.</p>

                <p>Eger so????y qumalaq qarsylasty?? jup sandy qumala??y bar ota??yna t??s??p (3 qumalaqtan basqa), taq qylsa nemese ??z ota??ymyz??a t??sse, qumalaq utyp alynba??dy.</p>

                <p>M??selen, jo??aryda??y taqtada??y al??ashqy ja??da??da basta??shy ???7 ota??da??y 9 qumala??yn taratsa, so????ysy qarsylasyny?? ???6 ota??yna baryp t??sed?? j??ne onda??y 9 qumalaq so????y qumalaqpen 10 bolyp, utyp alynady j??ne qazan??a salynady.</p>


                <p>Sol kezde taqtada t??mendeg??de?? ja??da?? qalyptasady.</p></div> </div>
        
        </div>
      );
  }
  
  export default Rules;