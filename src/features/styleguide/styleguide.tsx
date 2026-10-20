import {cn} from 'cn';
import {
    Check,
    Clock,
    Copy,
    Eye,
    Flame,
    Link2,
    Link2Off,
    Loader2,
    Lock,
    Plus,
    TriangleAlert,
} from 'lucide-react';
import {type ReactNode} from 'react';

import {Button} from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {ToggleGroup, ToggleGroupItem} from '@/components/ui/toggle-group';

import {ColorSwatch} from './color-swatch';
import {COLOR_GROUPS, RADII, SPACING, TYPE_SCALE} from './tokens';

const SECTIONS = [
    ['principles', 'Principles'],
    ['colour', 'Colour'],
    ['typography', 'Typography'],
    ['radius', 'Radius'],
    ['spacing', 'Spacing'],
    ['icons', 'Icons'],
    ['primitives', 'Primitives'],
    ['patterns', 'Patterns'],
] as const;

const BUTTON_VARIANTS = [
    'default',
    'outline',
    'secondary',
    'ghost',
    'destructive',
    'link',
] as const;

const BUTTON_SIZES = ['xs', 'sm', 'default', 'lg'] as const;

const ICONS = {
    Lock,
    Eye,
    Copy,
    Check,
    Link2,
    Link2Off,
    Clock,
    Flame,
    Plus,
    TriangleAlert,
    Loader2,
};

const PRINCIPLES = [
    [
        'Quiet by default',
        'Neutral greys for everything you interact with. The backdrop carries all the colour, so the content reads as calm and trustworthy.',
    ],
    [
        'Say what happens',
        'Every screen states the consequence: opened once, expires at a time, deleted from the server. No surprises.',
    ],
    [
        'One primary action',
        'Each screen has a single primary button. Everything else is outline, ghost or a link.',
    ],
    [
        'Secrets look like data',
        'Secret material and links are monospace on a muted field, so they never read as UI copy.',
    ],
    [
        'Red means error',
        'Destructive is reserved for failures and invalid input, never for emphasis.',
    ],
    [
        'Respect the reader',
        'Light and dark are equal citizens, focus is always visible, and motion stops under prefers-reduced-motion.',
    ],
] as const;

export function Styleguide(): React.JSX.Element {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-semibold tracking-tight">
                    Styleguide
                </h1>
                <p className="text-muted-foreground max-w-prose text-sm">
                    The visual baseline for whisper. Everything here renders
                    from the real tokens in <Code>globals.css</Code> and the
                    real components in <Code>components/ui</Code>, so it cannot
                    drift. Toggle the theme to review both modes. The rules
                    behind it live in <Code>DESIGN.md</Code>.
                </p>
                <nav className="flex flex-wrap gap-1">
                    {SECTIONS.map(([id, label]) => (
                        <Button key={id} variant="ghost" size="sm" asChild>
                            <a href={`#${id}`}>{label}</a>
                        </Button>
                    ))}
                </nav>
            </div>

            <Section id="principles" title="Principles">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {PRINCIPLES.map(([title, body]) => (
                        <div key={title} className="flex flex-col gap-1.5">
                            <h3 className="text-sm font-medium">{title}</h3>
                            <p className="text-muted-foreground text-sm">
                                {body}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="colour" title="Colour">
                <div className="flex flex-col gap-10">
                    {COLOR_GROUPS.map(group => (
                        <div key={group.title} className="flex flex-col gap-4">
                            <SubHeading
                                title={group.title}
                                description={group.description}
                            />
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                                {group.tokens.map(token => (
                                    <ColorSwatch key={token.name} {...token} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="typography" title="Typography">
                <div className="flex flex-col gap-8">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <FontSample
                            name="Geist"
                            variable="--font-sans"
                            className="font-sans"
                        />
                        <FontSample
                            name="Geist Mono"
                            variable="--font-geist-mono"
                            className="font-mono"
                        />
                    </div>
                    <div className="flex flex-col divide-y">
                        {TYPE_SCALE.map(({className, role}) => (
                            <div
                                key={className}
                                className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:items-baseline sm:gap-4"
                            >
                                <div className="flex flex-col">
                                    <Code>{className}</Code>
                                    <span className="text-muted-foreground text-xs">
                                        {role}
                                    </span>
                                </div>
                                <p className={className}>
                                    Share a secret through a link that works
                                    once.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section id="radius" title="Radius">
                <p className="text-muted-foreground text-sm">
                    One base, <Code>--radius: 0.625rem</Code>; every step is
                    derived from it.
                </p>
                <div className="grid grid-cols-3 gap-6 sm:grid-cols-6">
                    {RADII.map(({className, usage}) => (
                        <div key={className} className="flex flex-col gap-2">
                            <div
                                className={`bg-muted ring-foreground/10 aspect-square ring-1 ${className}`}
                            />
                            <Code>{className}</Code>
                            {usage && (
                                <span className="text-muted-foreground text-xs">
                                    {usage}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="spacing" title="Spacing">
                <p className="text-muted-foreground text-sm">
                    Tailwind&apos;s 4px scale. These are the steps the app
                    actually uses; reach for them before anything else.
                </p>
                <div className="flex flex-col gap-3">
                    {SPACING.map(({token, widthClass, usage}) => (
                        <div
                            key={token}
                            className="grid grid-cols-[5rem_3rem_1fr] items-center gap-4"
                        >
                            <Code>{token}</Code>
                            <div
                                className={`bg-foreground/70 h-4 rounded-sm ${widthClass}`}
                            />
                            <span className="text-muted-foreground text-xs">
                                {usage}
                            </span>
                        </div>
                    ))}
                </div>
                <p className="text-muted-foreground text-sm">
                    Layout: a single <Code>max-w-xl</Code> column with{' '}
                    <Code>px-4</Code> gutters, content in one card with{' '}
                    <Code>--card-spacing: --spacing(6)</Code>.
                </p>
            </Section>

            <Section id="icons" title="Icons">
                <p className="text-muted-foreground text-sm">
                    <Code>lucide-react</Code>, stroke style, inheriting{' '}
                    <Code>currentColor</Code>. <Code>size-4</Code> in buttons
                    and labels, <Code>size-3.5</Code> next to{' '}
                    <Code>text-xs</Code>, <Code>size-5</Code> inside icon
                    badges.
                </p>
                <div className="flex flex-wrap gap-3">
                    {Object.entries(ICONS).map(([name, Icon]) => (
                        <div
                            key={name}
                            title={name}
                            className="bg-muted/50 flex size-10 items-center justify-center rounded-lg border"
                        >
                            <Icon className="size-4" />
                        </div>
                    ))}
                </div>
            </Section>

            <Section id="primitives" title="Primitives">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <SubHeading
                            title="Button"
                            description="default for the one primary action, outline for secondary actions, ghost for chrome like the theme toggle."
                        />
                        <div className="flex flex-col gap-3">
                            {BUTTON_VARIANTS.map(variant => (
                                <div
                                    key={variant}
                                    className="flex flex-wrap items-center gap-3"
                                >
                                    <Code className="w-24">{variant}</Code>
                                    {BUTTON_SIZES.map(size => (
                                        <Button
                                            key={size}
                                            variant={variant}
                                            size={size}
                                        >
                                            <Lock />
                                            {size}
                                        </Button>
                                    ))}
                                    <Button variant={variant} disabled>
                                        Disabled
                                    </Button>
                                    <Button
                                        variant={variant}
                                        size="icon"
                                        aria-label="Copy"
                                    >
                                        <Copy />
                                    </Button>
                                </div>
                            ))}
                            <div className="flex flex-wrap items-center gap-3">
                                <Code className="w-24">loading</Code>
                                <Button size="lg" disabled>
                                    <Loader2 className="animate-spin" />
                                    Create secret link
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <SubHeading
                            title="Label & Textarea"
                            description="Textarea follows the native states: focus, aria-invalid, disabled."
                        />
                        <div className="grid gap-6 sm:grid-cols-3">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="sg-default">Default</Label>
                                <Textarea
                                    id="sg-default"
                                    placeholder="Paste a password, API key, or private note…"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="sg-invalid">Invalid</Label>
                                <Textarea
                                    id="sg-invalid"
                                    aria-invalid
                                    defaultValue="Too long"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="sg-disabled">Disabled</Label>
                                <Textarea
                                    id="sg-disabled"
                                    disabled
                                    defaultValue="Read only"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <SubHeading
                            title="Toggle group"
                            description="Single choice from a short, fixed list. outline variant, stretched to the column."
                        />
                        <ToggleGroup
                            type="single"
                            variant="outline"
                            defaultValue="1d"
                            aria-label="Expires after"
                            className="w-full max-w-md"
                        >
                            {['5m', '1h', '1d', '7d'].map(v => (
                                <ToggleGroupItem
                                    key={v}
                                    value={v}
                                    className="flex-1"
                                >
                                    {v}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>

                    <div className="flex flex-col gap-4">
                        <SubHeading
                            title="Card"
                            description="The one surface. Pages use spacing 6; size sm exists for nested use."
                        />
                        <div className="grid gap-6 sm:grid-cols-2">
                            <Card className="[--card-spacing:--spacing(6)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold">
                                        Share a secret
                                    </CardTitle>
                                    <CardDescription>
                                        Get a link that can be opened once, then
                                        self-destructs.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button size="lg" className="w-full">
                                        <Lock />
                                        Create secret link
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card size="sm">
                                <CardHeader>
                                    <CardTitle>Card, size sm</CardTitle>
                                    <CardDescription>
                                        With a footer.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    Body text sits at text-sm.
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" size="sm">
                                        Action
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </Section>

            <Section id="patterns" title="Patterns">
                <div className="grid gap-10 sm:grid-cols-2">
                    <Pattern
                        title="Field"
                        description="Label, control and helper stacked at gap-2. Helper is text-xs muted, switching to destructive when invalid."
                    >
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="sg-field">Secret</Label>
                            <Textarea
                                id="sg-field"
                                className="font-mono text-sm"
                                defaultValue="hunter2"
                            />
                            <p className="text-muted-foreground text-right text-xs">
                                7 / 10,000
                            </p>
                        </div>
                    </Pattern>

                    <Pattern
                        title="Inline error"
                        description="role=alert, text-sm destructive, placed directly above the action it relates to."
                    >
                        <div className="flex flex-col gap-4">
                            <p
                                role="alert"
                                className="text-destructive text-sm"
                            >
                                Could not create the link. Please try again.
                            </p>
                            <Button size="lg">
                                <Lock />
                                Create secret link
                            </Button>
                        </div>
                    </Pattern>

                    <Pattern
                        title="Secret material"
                        description="Monospace on muted/50 with a border. Links in an input, secrets in a pre."
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2">
                                <input
                                    readOnly
                                    aria-label="Share link"
                                    value="https://whisper.example/s/7f3a#k=…"
                                    className="bg-muted/50 border-input h-8 min-w-0 flex-1 rounded-lg border px-3 font-mono text-xs"
                                />
                                <Button>
                                    <Copy />
                                    Copy
                                </Button>
                            </div>
                            <pre className="bg-muted/50 rounded-lg border p-4 font-mono text-sm break-all whitespace-pre-wrap">
                                DATABASE_URL=postgres://…
                            </pre>
                            <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                <TriangleAlert className="size-3.5 shrink-0" />
                                Deleted from the server. Copy it now.
                            </p>
                        </div>
                    </Pattern>

                    <Pattern
                        title="Notice"
                        description="Centred icon badge, text-lg heading, muted body, one outline way forward. Used for every end state."
                    >
                        <div className="flex flex-col items-center gap-6 text-center">
                            <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full [&_svg]:size-5">
                                <Flame />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-semibold">
                                    This secret is gone
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    It has already been viewed. Secrets can only
                                    be opened once.
                                </p>
                            </div>
                            <Button variant="outline">
                                Create your own secret
                            </Button>
                        </div>
                    </Pattern>
                </div>
            </Section>
        </div>
    );
}

function Section({
    id,
    title,
    children,
}: {
    id: string;
    title: string;
    children: ReactNode;
}): React.JSX.Element {
    // Card drops its bottom padding when it :has() a footer, and that also
    // matches the demo cards nested inside a section.
    return (
        <Card
            id={id}
            className="scroll-mt-6 [--card-spacing:--spacing(6)] has-data-[slot=card-footer]:pb-(--card-spacing)"
        >
            <CardHeader>
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                {children}
            </CardContent>
        </Card>
    );
}

function SubHeading({
    title,
    description,
}: {
    title: string;
    description: string;
}): React.JSX.Element {
    return (
        <div className="flex flex-col gap-1">
            <h3 className="text-base font-medium">{title}</h3>
            <p className="text-muted-foreground max-w-prose text-sm">
                {description}
            </p>
        </div>
    );
}

function Pattern({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: ReactNode;
}): React.JSX.Element {
    return (
        <div className="flex flex-col gap-4">
            <SubHeading title={title} description={description} />
            <div className="rounded-xl border border-dashed p-6">
                {children}
            </div>
        </div>
    );
}

function FontSample({
    name,
    variable,
    className,
}: {
    name: string;
    variable: string;
    className: string;
}): React.JSX.Element {
    return (
        <div className="flex flex-col gap-2">
            <p className={`text-4xl font-semibold tracking-tight ${className}`}>
                Aa Gg 0O 1l
            </p>
            <p className={`text-muted-foreground text-sm ${className}`}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
            </p>
            <div className="flex gap-2">
                <span className="text-sm font-medium">{name}</span>
                <Code>{variable}</Code>
            </div>
        </div>
    );
}

function Code({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}): React.JSX.Element {
    return (
        <code className={cn('font-mono text-xs', className)}>{children}</code>
    );
}
