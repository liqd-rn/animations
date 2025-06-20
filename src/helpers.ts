import { useEffect } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { AnimationAnimatedProperty } from './types';

export const interpolateRange = ( progress: SharedValue<number>, range: AnimationAnimatedProperty<number> ) =>
{
    'worklet';

    return Array.isArray( range ) 
        ? range[0] + progress.value * ( range[1] - range[0] )
        : range.from + progress.value * ( range.to - range.from );
}

export const interpolateProperty = ( property: string, progress: SharedValue<number>, range?: AnimationAnimatedProperty<number> ) =>
{
    'worklet';

    return range ? {[ property ]: interpolateRange( progress, range )} : undefined;
}

export const animateWithDelay = ( animate: Function, delay?: number ) =>
{
    useEffect(() => 
    {
        if( delay )
        {
            let timeout: NodeJS.Timeout | undefined = setTimeout(() => 
            {
                timeout = undefined; 
                animate();
            },
            delay );

            return () => { timeout && clearTimeout( timeout )}
        }
        
        animate();

        return undefined;
    },
    []);
}