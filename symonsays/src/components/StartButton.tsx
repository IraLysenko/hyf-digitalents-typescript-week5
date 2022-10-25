import React from 'react';

type StartGamesPropTypes = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function StartButton(props: StartGamesPropTypes) {
    return (
        <button
            onClick={props.onClick}
            type="button"
            className="button button--start">
            Start game
        </button>
    );
}