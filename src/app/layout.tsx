import {Geist, Geist_Mono} from 'next/font/google';
import Link from 'next/link';

import {Backdrop} from '@/components/backdrop';
import {SiteFooter} from '@/components/site-footer';
import {THEME_INIT_SCRIPT, ThemeToggle} from '@/components/theme-toggle';

import type {Metadata} from 'next';

import './globals.css';

const geistSans = Geist({variable: '--font-sans', subsets: ['latin']});
const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'whisper',
    description: 'Share a secret through a link that works once.',
};

export default function RootLayout({
    children,
}: LayoutProps<'/'>): React.JSX.Element {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <head>
                <script dangerouslySetInnerHTML={{__html: THEME_INIT_SCRIPT}} />
            </head>
            <body className="flex min-h-full flex-col">
                <Backdrop />
                <header className="mx-auto flex w-full max-w-xl items-center justify-between px-4 pt-6">
                    <Link
                        href="/"
                        className="text-lg font-semibold tracking-tight"
                    >
                        whisper 🤫
                        <span className="text-muted-foreground">.</span>
                    </Link>
                    <ThemeToggle />
                </header>
                <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-10">
                    {children}
                </main>
                <SiteFooter />
            </body>
        </html>
    );
}
