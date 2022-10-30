import React from 'react';

export enum Colors {
    GREEN="green",
    RED="red",
    BLUE="blue",
    YELLOW="yellow"
}

export type SymonButtonsProtoTypes = {
    color: Colors;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function SymonButton(props:SymonButtonsProtoTypes) {
    const color = props.color;

    return (
        <button
            type="button"
            className="button button--game"
            style={{backgroundColor: color}}
            data-color={color}
            onClick={props.onClick}
        >
        </button>
    );
}
