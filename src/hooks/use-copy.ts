import {useCallback, useEffect, useRef, useState} from 'react';

const RESET_AFTER_MS = 2000;

export function useCopy(): {isCopied: boolean; copy: (text: string) => void} {
    const [isCopied, setIsCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    const copy = useCallback((text: string) => {
        void navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(
                () => setIsCopied(false),
                RESET_AFTER_MS,
            );
        });
    }, []);

    return {isCopied, copy};
}
