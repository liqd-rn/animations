import React from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { AnimationAnimatedProperty, AnimationBaseProps } from '../types';
import { animateWithDelay, interpolateProperty } from '../helpers';

export type FadingProps = AnimationBaseProps & 
{
    scale?          : AnimationAnimatedProperty,
    opacity?        : AnimationAnimatedProperty,
    x?              : AnimationAnimatedProperty,
    y?              : AnimationAnimatedProperty,
    marginLeft?     : AnimationAnimatedProperty,
    marginRight?    : AnimationAnimatedProperty,
    marginTop?      : AnimationAnimatedProperty,
    marginBottom?   : AnimationAnimatedProperty,
}

export function useFadingStyle({ duration, delay, style, scale, opacity, x, y, marginLeft, marginRight, marginTop, marginBottom }: Omit<FadingProps, 'children'>)
{
    const progress = useSharedValue( 0 );
    const fading = useAnimatedStyle(() => (
    {
        ...( scale || x || y ? 
        { 
            transform: 
            [
                interpolateProperty( 'scale', progress, scale ),
                interpolateProperty( 'translateX', progress, x ),
                interpolateProperty( 'translateY', progress, y )
            ]
            .filter(Boolean)
        }
        : undefined ),
        ...interpolateProperty( 'opacity', progress, opacity ),
        ...interpolateProperty( 'marginLeft', progress, marginLeft ),
        ...interpolateProperty( 'marginRight', progress, marginRight ),
        ...interpolateProperty( 'marginTop', progress, marginTop ),
        ...interpolateProperty( 'marginBottom', progress, marginBottom ),
    } as any ));

    animateWithDelay(() =>
    {
        progress.value = withTiming( 1, { duration: duration, easing: Easing.inOut( Easing.ease )});
    },
    delay );

    return [ style, fading ];
}

export default function Fading({ children, ...props }: FadingProps )
{
    const fading = useFadingStyle( props );

    return <Animated.View style={ fading }>{children}</Animated.View>;
}