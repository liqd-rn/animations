import React from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, Easing } from 'react-native-reanimated';
import { AnimationAnimatedProperty, AnimationBaseProps } from '../types';
import { animateWithDelay, interpolateProperty } from '../helpers';

export type BreathingProps = AnimationBaseProps & 
{
    scale?      : AnimationAnimatedProperty,
    width?      : AnimationAnimatedProperty,
    height?     : AnimationAnimatedProperty,
    opacity?    : AnimationAnimatedProperty,
    rewind?     : number
}

export function useBreathingStyle({ duration, delay, style, scale, width, height, opacity, rewind }: Omit<BreathingProps, 'children'>)
{
    const progress = useSharedValue( 0 );
    const breathing = useAnimatedStyle(() => (
    {
        ...( scale  ? { transform: [ interpolateProperty( 'scale', progress, scale ) ]} : undefined ),
        ...interpolateProperty( 'width', progress, width ),
        ...interpolateProperty( 'height', progress, height ),
        ...interpolateProperty( 'opacity', progress, opacity )
    } as any ));

    animateWithDelay(() =>
    {
        if( rewind )
        {
            rewind = rewind % duration;

            if( rewind < duration / 2 )
            {
                progress.value = rewind / ( duration / 2 );
                progress.value = withSequence
                (
                    withTiming( 1, { duration: duration / 2 - rewind, easing: Easing.inOut( Easing.ease )}),
                    withTiming( 0, { duration: duration / 2, easing: Easing.inOut( Easing.ease )}),
                    withRepeat( withSequence
                    (
                        withTiming( 1, { duration: duration / 2, easing: Easing.inOut( Easing.ease )}),
                        withTiming( 0, { duration: duration / 2, easing: Easing.inOut( Easing.ease )}),
                    ), 
                    -1 )
                );
            }
            else
            {
                rewind -= duration / 2;

                progress.value = 1 - rewind / ( duration / 2 );
                progress.value = withSequence
                (
                    withTiming( 0, { duration: duration / 2 - rewind, easing: Easing.inOut( Easing.ease )}),
                    withRepeat( withSequence
                    (
                        withTiming( 1, { duration: duration / 2, easing: Easing.inOut( Easing.ease )}),
                        withTiming( 0, { duration: duration / 2, easing: Easing.inOut( Easing.ease )}),
                    ), 
                    -1 )
                );
            }
        }
        else
        {
            progress.value = withRepeat( withSequence
            (
                withTiming( 1, { duration: duration / 2, easing: Easing.inOut( Easing.ease )}),
                withTiming( 0, { duration: duration / 2, easing: Easing.inOut( Easing.ease )}),
            ), 
            -1 );
        }
    },
    delay );

    return [ style, breathing ];
}

export default function Breathing({ children, ...props }: BreathingProps )
{
    const breathing = useBreathingStyle( props );

    return <Animated.View style={ breathing }>{children}</Animated.View>;
}