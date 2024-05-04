import { useEffect } from 'react';

export function Animate( animate: Function, delay?: number )
{
    useEffect(() => 
    {
        if( delay )
        {
            let timeout: NodeJS.Timeout | undefined = setTimeout(() => 
            {
                timeout = undefined; 
                animate() 
            },
            delay );

            return () => { timeout && clearTimeout( timeout )}
        }
        
        animate();

        return undefined;
    },
    []);
}