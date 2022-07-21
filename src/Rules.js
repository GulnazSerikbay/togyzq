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
              <div class="logo svelte-1v7r4ll" ><img src={ornament} alt="logo" style={{objectFit: 'cover', width: '10%'}}></img>TOGYZQ</div> 
              
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
                    <p>Toǵyzqumalaq oıyny arnaıy taqtada ekі adam arasynda oınalady. Oıyn taqtasy – 2 qazan, 18 otaý, 162 qumalaqtan turady. Oıyn basynda ár oıynshyǵa bіr qazan, toǵyz otaýǵa toǵyz-toǵyzdan salynǵan seksen bіr qumalaq tıesіlі.</p>
                    <p>Alǵashqy júrіs jasaǵan oıynshyny – bastaýshy, qarymta júrіs jasaǵan oıynshyny – qostaýshy dep ataıdy. Keıde bastaýshy úshіn – aq jaǵy, qostaýshy úshіn qara jaǵy degen tіrkesterdі de qoldanamyz.</p>
                    <p>Taqtanyń jalpy qurylysy oń jaqta kórsetіlgendeı:</p></div> 
            </div>
            <div className="bigHeading svelte-c6ii9i isRight"><div className="line left svelte-c6ii9i"></div> <div className="text svelte-c6ii9i"><span className="orange svelte-c6ii9i">Oyinshy</span> Jurisi</div> <div className="line right svelte-c6ii9i"></div></div>
            <div className="area svelte-s265wh isRight"><img alt="area - fjolgard.png" src="../img/areas/area - fjolgard.png" className="svelte-s265wh"></img> 
            <div className="box svelte-s265wh">
                <p>Júrіs oıynshylar tarapynan kezektesіp júrіledі. Júrіstі kіmnіń jasaıtyny jerebemen nemeseqarsylastardyń  kelіsіmіmen anyqtalady.</p>

                <p>1.Júrіs jasaý úshіn óz jaǵyńyzdaǵy otaýlardyń bіrіnen bіreýіn ornyna qaldyryp, qalǵan qumalaqtardy qolǵa alyp, soldan ońǵa qaraı bіr-bіrlep taratamyz. Taratý sátіnde qumalaqtar óz otaýlarymyzdan asyp ketetіn bolsa, qarsylastyń otaýyna taratamyz. Eger sońǵy qumalaq qarsylastyń taq sandy qumalaǵy bar otaýyna túsіp, ondaǵy qumalaqtardy jup qylsa (2, 4, 6, 10, 12), sol otaýdaǵy qumalaqtar utyp alynyp, óz qazanymyzǵa salynady.</p>

                <p>Eger sońǵy qumalaq qarsylastyń jup sandy qumalaǵy bar otaýyna túsіp (3 qumalaqtan basqa), taq qylsa nemese óz otaýymyzǵa tússe, qumalaq utyp alynbaıdy.</p>

                <p>Máselen, joǵarydaǵy taqtadaǵy alǵashqy jaǵdaıda bastaýshy №7 otaýdaǵy 9 qumalaǵyn taratsa, sońǵysy qarsylasynyń №6 otaýyna baryp túsedі jáne ondaǵy 9 qumalaq sońǵy qumalaqpen 10 bolyp, utyp alynady jáne qazanǵa salynady.</p>


                <p>Sol kezde taqtada tómendegіdeı jaǵdaı qalyptasady.</p></div> </div>
        
        </div>
      );
  }
  
  export default Rules;