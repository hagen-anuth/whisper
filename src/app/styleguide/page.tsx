import {notFound} from 'next/navigation';

import {SiteHeader} from '@/components/site-header';
import {Styleguide} from '@/features/styleguide/styleguide';

import type {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'Styleguide · whisper',
    robots: {index: false, follow: false},
};

export default function StyleguidePage(): React.JSX.Element {
    // dev-only reference; production builds serve a 404
    if (process.env.NODE_ENV === 'production') notFound();

    return (
        <>
            <SiteHeader className="max-w-5xl" />
            <main className="mx-auto w-full max-w-5xl px-4 py-10">
                <Styleguide />
            </main>
        </>
    );
}
