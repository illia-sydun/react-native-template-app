import { MutableRefObject, RefCallback } from 'react';

export const mergeRefs =
    <T>(...refs: (MutableRefObject<T | null> | RefCallback<T> | null)[]) =>
    (node: T | null) => {
        for (const ref of refs) {
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref != null) {
                (ref as MutableRefObject<T | null>).current = node;
            }
        }
    };
