import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {CreateSecretForm} from '@/features/create-secret/create-secret-form';

export default function HomePage(): React.JSX.Element {
    return (
        <Card className="[--card-spacing:--spacing(6)]">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    Share a secret
                </CardTitle>
                <CardDescription>
                    Get a link that can be opened once, then self-destructs.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateSecretForm />
            </CardContent>
        </Card>
    );
}
