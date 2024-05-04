import React from 'react';

export type AnimationBaseProps<T> =
{
    duration    : number
    from        : T
    to          : T
    delay?      : number
    loop?       : boolean
    style?      : React.CSSProperties
    children    : React.ReactNode
}