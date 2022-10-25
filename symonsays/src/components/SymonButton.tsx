import React from 'react';

export enum Colors {
    GREEN="green",
    RED="red",
    BLUE="blue",
    YELLOW="yellow"
}

export type SymonButtonsProtoTypes = {
    color: Colors;
    active: true | false;
    pressed: true | false;
}

export function SymonButton(props:SymonButtonsProtoTypes) {
    const color = props.color;
    let buttonClass = "button button--game";
    if(props.active) {
        buttonClass += ' button--game--active'
    }
    if(props.pressed){
        buttonClass += ' button--game--pressed'
    }

    return (
        <button
            type="button"
            className={buttonClass}
            style={{backgroundColor: color}}
            data-color={color}
        >
        </button>
    );
}
