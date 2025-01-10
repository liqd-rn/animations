import React from 'react';

export type AnimationAnimatedProperty<T=number> = [ T, T ] |
{
    from        : T
    to          : T
}

export type AnimationBaseProps =
{
    duration    : number
    delay?      : number
    loop?       : boolean
    style?      : React.CSSProperties
    children    : React.ReactNode
}