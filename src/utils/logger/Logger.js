import React from 'react'

const debugMode = false;

export const printLog = (...args) => {
    if(true == debugMode) {
        console.log(args.join(' '));
    }
}