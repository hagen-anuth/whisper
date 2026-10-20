import {cn} from 'cn';
import Link from 'next/link';

import {ThemeToggle} from '@/components/theme-toggle';

export function SiteHeader({
    className,
}: {
    className?: string;
}): React.JSX.Element {
    return (
        <header
            className={cn(
                'mx-auto flex w-full max-w-xl items-center justify-between px-4 pt-6',
                className,
            )}
        >
            <Link href="/" className="text-lg font-semibold tracking-tight">
                whisper 🤫
                <span className="text-muted-foreground">.</span>
            </Link>
            <ThemeToggle />
        </header>
    );
}
