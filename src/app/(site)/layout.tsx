import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';

export default function SiteLayout({
    children,
}: LayoutProps<'/'>): React.JSX.Element {
    return (
        <>
            <SiteHeader />
            <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-4 py-10">
                {children}
            </main>
            <SiteFooter />
        </>
    );
}
