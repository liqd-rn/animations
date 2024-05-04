import React from 'react';
import { Animated } from 'react-native';
import { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence, Easing } from 'react-native-reanimated';
import { AnimationBaseProps } from '../types';
import { Animate } from '../helpers';

export type BreathingProps = AnimationBaseProps<number>

export default function Breathing({ duration, from, to, delay, style, children }: BreathingProps )
{
    const progress = useSharedValue( 0 );
    const breathing = useAnimatedStyle(() => ({ transform: [{ scale: from + progress.value * ( to - from )}]}));

    Animate(() =>
    {
        withRepeat( withSequence
        (
            withTiming( 1, { duration: duration / 2, easing: Easing.inOut( Easing.ease )}),
            withTiming( 0, { duration: duration / 2, easing: Easing.inOut( Easing.ease )}),
        ), 
        -1 );
    },
    delay );

    return <Animated.View style={[ style as any, breathing]}>{children}</Animated.View>;
};