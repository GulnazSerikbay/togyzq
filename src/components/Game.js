
import React, {Component} from 'react';
import { useReducer } from 'react';

function initGame() {
    return;
  }
  
  
  
  function App() {
    const {
      currentPlayer,
      score1,
      score2,
      gameStatus
    } = useAppLogic();
    
class Game extends Component {
    
    constructor(props)
    {
        super(props);
    
        this.state = {  
            AppMode: 'NoAction',  // NoAction, Game, PlayerWin, AIWin
            MoveState: 'NoState',
            score1: 0,
            score2: 0,

        };
        this.Canvas = React.createRef()
        //this.size = size;
        this.reward = 0;
        this.players = {
            'player1': "userId1", //userId1
            'player2': "userId2"
        }
        this.run = this.players['player1']
        this.opponent = this.players['player1']
        
        function switch_player(){
            const opponent = this.run;
            this.run = this.opponent;
            this.opponent = opponent;
        }


    }
    render() {
        return (
            <div ref={this.Canvas}>
                lol
            </div>);
    }
    
}
export default Game;