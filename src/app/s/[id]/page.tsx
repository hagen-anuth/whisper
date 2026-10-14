import {Suspense} from 'react';

import {Card, CardContent} from '@/components/ui/card';
import {
    RevealSecret,
    RevealSecretLoading,
} from '@/features/reveal-secret/reveal-secret';

import type {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'A secret for you · whisper',
    robots: {index: false, follow: false},
};

export default function SecretPage(): React.JSX.Element {
    return (
        <Card className="[--card-spacing:--spacing(6)]">
            <CardContent>
                <Suspense fallback={<RevealSecretLoading />}>
                    <RevealSecret />
                </Suspense>
            </CardContent>
        </Card>
    );
}
