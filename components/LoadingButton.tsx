import { ComponentProps, useState } from 'react';
import { Loader } from '@/lib/icons/Loader';
import { Button } from '@/components/ui/button';

export type LoadingButtonProps = ComponentProps<typeof Button> & {
    loading: boolean;
};

export function LoadingButton({
    loading,
    children,
    ...props
}: LoadingButtonProps) {
    const [width, setWidth] = useState(0);
    return (
        <Button
            {...props}
            disabled={props.disabled || loading}
            onLayout={(e) => {
                setWidth(e.nativeEvent.layout.width);
            }}
            style={{
                minWidth: width,
            }}
        >
            {loading ? (
                <Loader className='absolute h-7 w-7 animate-spin origin-center color-secondary/50 ' />
            ) : (
                children
            )}
        </Button>
    );
}
