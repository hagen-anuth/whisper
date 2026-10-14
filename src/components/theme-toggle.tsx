'use client';

import {Moon, Sun} from 'lucide-react';

import {Button} from '@/components/ui/button';

export const THEME_STORAGE_KEY = 'theme';

/**
 * Inlined into <head> so the class is set before first paint; a toggle that
 * waited for hydration would flash the wrong theme.
 */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export function ThemeToggle(): React.JSX.Element {
    function toggle(): void {
        const isDark = document.documentElement.classList.toggle('dark');
        try {
            localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
        } catch {
            // storage blocked; the toggle still works for this page view
        }
    }

    // Both icons render and CSS picks one, so server and client markup match.
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle dark mode"
        >
            <Sun className="hidden dark:block" />
            <Moon className="dark:hidden" />
        </Button>
    );
}
