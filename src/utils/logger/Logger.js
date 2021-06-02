import React from 'react'

const debugMode = true;

export const printLog = (...args) => {
    if(true == debugMode) {
        console.log(args.join(' '));
    }
}