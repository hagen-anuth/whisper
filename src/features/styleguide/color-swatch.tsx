'use client';

import {useSyncExternalStore} from 'react';

import {type ColorToken} from './tokens';

// the theme toggle flips a class on <html>
function subscribeToTheme(onChange: () => void): () => void {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {attributeFilter: ['class']});
    return () => observer.disconnect();
}

let context: CanvasRenderingContext2D | null = null;

// The CSS build turns oklch() into lab() with float noise, and fillStyle
// keeps lab() as is; painting a pixel and reading it back yields sRGB bytes.
function toHex(color: string): string {
    context ??= document
        .createElement('canvas')
        .getContext('2d', {willReadFrequently: true});
    if (!context) return color;
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    const [r = 0, g = 0, b = 0, a = 0] = context.getImageData(0, 0, 1, 1).data;
    const hex = `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`;
    return a === 255 ? hex : `${hex} / ${Math.round((a / 255) * 100)}%`;
}

function useTokenValue(name: string): string {
    return useSyncExternalStore(
        subscribeToTheme,
        () =>
            toHex(
                getComputedStyle(document.documentElement)
                    .getPropertyValue(`--${name}`)
                    .trim(),
            ),
        () => '',
    );
}

export function ColorSwatch({
    name,
    foreground,
    usage,
}: ColorToken): React.JSX.Element {
    const value = useTokenValue(name);
    const foregroundValue = useTokenValue(foreground ?? name);

    return (
        <div className="flex flex-col gap-2">
            <div
                className="ring-foreground/10 flex h-20 items-end rounded-lg p-3 ring-1"
                style={{
                    background: `var(--${name})`,
                    color: foreground ? `var(--${foreground})` : undefined,
                }}
            >
                {foreground && (
                    <span className="text-lg font-semibold">Aa</span>
                )}
            </div>
            <div className="flex flex-col gap-0.5">
                <code className="font-mono text-xs font-medium">--{name}</code>
                <code className="text-muted-foreground font-mono text-xs">
                    {value}
                </code>
                {foreground && (
                    <code className="text-muted-foreground font-mono text-xs">
                        --{foreground}: {foregroundValue}
                    </code>
                )}
                <p className="text-muted-foreground text-xs">{usage}</p>
            </div>
        </div>
    );
}
