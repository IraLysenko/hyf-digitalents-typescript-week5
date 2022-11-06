import React from 'react';
import './App.css';

import {Title} from './components/Title';
import {Colors, SymonButton} from './components/SymonButton';
import {StartButton} from './components/StartButton';

interface IProps {}

export type GameState = {
  sequence: Colors[];
  userSequence: Colors[];
  userScore: number;
  gameOver: boolean;
}

class App extends React.Component<IProps, GameState> {
  constructor(props: GameState) {
    super(props);

    this.state = {
      sequence: [],
      userSequence: [],
      userScore: 0,
      gameOver: false,
    }
  }

  step = 300;

  playSequence = (ids: Array<string>) => {
    const buttons = document.querySelectorAll('.button--game');
    for(let i=0; i <= ids.length; i++) {

      buttons.forEach(button => {
        const dataColor = button.getAttribute('data-color');

        if(dataColor === ids[i]) {
          console.log('check')
          setTimeout(() => {
            button.classList.add('button--active');
            console.log('dataColor  ' + dataColor +'  '+ i+'time ' + (i * this.step));
          }, i * this.step + 100);

          setTimeout(() => {
            button.classList.remove('button--active');
            console.log('removedataColor  ' + dataColor +'  '+ i +'time '+ (this.step + (i * this.step)));
          }, this.step + (i * this.step));
        }
      })
    }
  }

  checkColor = (state: GameState) => {
    const sequence = state.sequence.toString();
    const user = state.userSequence.toString();

    if (sequence === user) {
      this.startGame(state);
      state.userScore +=1
    } else {
      state.gameOver = true;
    }

    state.userSequence = [];
  }

  startGame(state: GameState) {
    if(state.gameOver === true) {
      state.sequence = [];
      state.userSequence = [];
      state.userScore = 0
    }

    const possibleColors = Object.values(Colors);
    const randomIndex = Math.floor(Math.random() * possibleColors.length);
    const randomColor = possibleColors[randomIndex];
    const updatedSequence = [...state.sequence, randomColor];

    this.setState({
      sequence: updatedSequence,
      gameOver: false
    }, () => {
      const state = this.state as GameState;
      this.playSequence(state.sequence);
    });
    console.log(updatedSequence);
  };

  userClick(state: GameState, event: any) {
    const button = event.target;
    const userColor = event.target.getAttribute('data-color');
    const userSequence = [...state.userSequence, userColor];
    button.classList.add('button--active');

    setTimeout(() => {
      button.classList.remove('button--active');
    }, 150);

    this.setState({
      userSequence: userSequence,
    },()=> {
      const state = this.state as GameState;

      if (state.sequence.length === state.userSequence.length) {
        setTimeout(() => {
          this.checkColor(state);
        }, 1000);
      }

      if(state.userSequence.length > state.sequence.length) {
        state.gameOver = true;
      }
    })
  }

  render(): React.ReactNode {
    return (
        <div className="App">
          <header className="App-header">
            <div className="container">
              <Title/>
              {
                (this.state.sequence.length > 0 && !this.state.gameOver)  &&
                <p>Try to remember {this.state.sequence.length} colors</p>
              }
              <p>Your Score: {this.state.userScore}</p>
              <div className={!this.state.gameOver ? 'buttons-wrap' : ''}>
                {
                  this.state.gameOver &&
                  <h2 className='center'>Game over!</h2>
                }
                { !this.state.gameOver &&
                  Object.values(Colors).map(color => {
                    return <SymonButton
                        key={color}
                        color={color}
                        onClick={(event) => {
                          this.userClick(this.state as GameState, event);
                          }
                        }
                    />
                  })
                }
              </div>
              <StartButton onClick={(event) => {
                this.startGame(this.state as GameState);
              }}/>
            </div>
          </header>
        </div>
    );
  }
}

export default App;
