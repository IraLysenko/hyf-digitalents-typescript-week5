import React from 'react';
import './App.css';

import {Title} from './components/Title';
import {Colors, SymonButton} from './components/SymonButton';
import {StartButton} from './components/StartButton';

type GameState = {
  sequence: Colors[];
}

type SymonButton = {
  itemid: string,
  type:string,
  class: string,
  style: string
}

class App extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);

    this.state = {
      sequence: [],
    }
  }

  playSequence = (ids: Array<string>) => {
    const buttons = document.querySelectorAll('.button--game');

    for(let i=0; i <= ids.length; i++) {

      buttons.forEach(button => {
        const dataColor = button.getAttribute('data-color');

        if(dataColor === ids[i]) {
          console.log('active button')
          let activeButton = button;
          let step = 300;
          console.log(button)
          setTimeout(() => {
            button.classList.add('button--active');
          }, i * step);

          setTimeout(() => {
            button.classList.remove('button--active');
          }, step + (i * step));
        }
      })
    }
  }

  startGame(state: GameState) {
    const possibleColors = Object.values(Colors);
    const randomIndex = Math.floor(Math.random() * possibleColors.length);
    const randomColor = possibleColors[randomIndex];

    // console.log('randomColor');
    // console.log(randomColor);

    const updatedSequence = [...state.sequence, randomColor];

    this.setState({
      sequence: updatedSequence,
    }, () => {
      const state = this.state as GameState
      // console.log('state.sequence');
      // console.log(state.sequence);

      this.playSequence(state.sequence);
    });

    console.log(updatedSequence);
  };

  render(): React.ReactNode {
    return (
        <div className="App">
          <header className="App-header">
            <div className="container">
              <Title/>
              <div className="buttons-wrap">
                {
                  Object.values(Colors).map(color => {
                    return <SymonButton
                        key={color}
                        color={color}
                        active={false}
                        pressed={false} />
                  })
                }
              </div>
              <StartButton onClick={(event) => {
                this.startGame(this.state as GameState);
                console.log('start game')
                console.log(event)
              }}/>
            </div>
          </header>
        </div>
    );
  }
}

export default App;
