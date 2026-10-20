export interface ColorToken {
    /** CSS custom property without the leading `--` */
    name: string;
    /** paired text colour, rendered on top of `name` */
    foreground?: string;
    usage: string;
}

export interface ColorGroup {
    title: string;
    description: string;
    tokens: ColorToken[];
}

/** Must cover every custom property in `globals.css`; tokens.test.ts checks it. */
export const COLOR_GROUPS: ColorGroup[] = [
    {
        title: 'Surfaces',
        description:
            'Neutral greys only. Content sits on a card; the page background is mostly hidden by the backdrop.',
        tokens: [
            {
                name: 'background',
                foreground: 'foreground',
                usage: 'Page base, outline button fill',
            },
            {
                name: 'card',
                foreground: 'card-foreground',
                usage: 'The surface every screen is built on',
            },
            {
                name: 'popover',
                foreground: 'popover-foreground',
                usage: 'Overlays (menus, tooltips); none in use yet',
            },
        ],
    },
    {
        title: 'Actions',
        description:
            'Near-black in light mode, near-white in dark. One primary action per screen.',
        tokens: [
            {
                name: 'primary',
                foreground: 'primary-foreground',
                usage: 'The main button: create, reveal, copy',
            },
            {
                name: 'secondary',
                foreground: 'secondary-foreground',
                usage: 'Secondary button variant',
            },
            {
                name: 'accent',
                foreground: 'accent-foreground',
                usage: 'Hover and highlighted items in shadcn primitives',
            },
        ],
    },
    {
        title: 'Text & state',
        description:
            'Muted for anything that supports the main content. Destructive is for errors only, never decoration.',
        tokens: [
            {
                name: 'muted',
                foreground: 'muted-foreground',
                usage: 'Helper text, descriptions, icon badges, read-only fields (muted/50)',
            },
            {
                name: 'destructive',
                usage: 'Error messages, invalid fields, over-limit counter',
            },
        ],
    },
    {
        title: 'Lines',
        description:
            'Borders stay quiet; the focus ring is the only loud line.',
        tokens: [
            {name: 'border', usage: 'Dividers, card footer, pre blocks'},
            {name: 'input', usage: 'Field and outline-toggle borders'},
            {name: 'ring', usage: 'Focus ring (at 50% opacity)'},
        ],
    },
    {
        title: 'Backdrop',
        description:
            'The only saturated colours in the app. Used by the page backdrop and nothing else.',
        tokens: [
            {name: 'backdrop-1', usage: 'Violet shape, top left'},
            {name: 'backdrop-2', usage: 'Cyan shape, right'},
            {name: 'backdrop-3', usage: 'Coral ring, bottom'},
            {name: 'backdrop-veil', usage: 'Frosted layer over the shapes'},
            {name: 'backdrop-grid', usage: 'Grid lines above the veil'},
        ],
    },
    {
        title: 'Reserved',
        description:
            'shadcn defaults kept so generated components work. Not used by the app; do not build on them.',
        tokens: [
            ...[1, 2, 3, 4, 5].map(n => ({
                name: `chart-${n}`,
                usage: 'Charts',
            })),
            {
                name: 'sidebar',
                foreground: 'sidebar-foreground',
                usage: 'Sidebar',
            },
            {
                name: 'sidebar-primary',
                foreground: 'sidebar-primary-foreground',
                usage: 'Sidebar',
            },
            {
                name: 'sidebar-accent',
                foreground: 'sidebar-accent-foreground',
                usage: 'Sidebar',
            },
            {name: 'sidebar-border', usage: 'Sidebar'},
            {name: 'sidebar-ring', usage: 'Sidebar'},
        ],
    },
];

/** Shown in the radius section rather than as a colour. */
export const NON_COLOR_TOKENS = ['radius'];

export const TYPE_SCALE = [
    {className: 'text-xl font-semibold', role: 'Page title (card title)'},
    {className: 'text-lg font-semibold', role: 'Notice heading, wordmark'},
    {className: 'text-base font-medium', role: 'Card title default'},
    {className: 'text-sm', role: 'Body, descriptions, buttons'},
    {className: 'text-sm font-medium', role: 'Labels'},
    {className: 'text-xs', role: 'Helper text, counters, footer'},
    {className: 'font-mono text-sm', role: 'Secrets'},
    {className: 'font-mono text-xs', role: 'Share links'},
];

export const RADII = [
    {className: 'rounded-sm', usage: ''},
    {className: 'rounded-md', usage: ''},
    {className: 'rounded-lg', usage: 'Buttons, fields, pre blocks'},
    {className: 'rounded-xl', usage: 'Cards'},
    {className: 'rounded-2xl', usage: ''},
    {className: 'rounded-full', usage: 'Icon badges'},
];

/** Width classes are spelled out so Tailwind's scanner picks them up. */
export const SPACING = [
    {token: 'gap-1.5', widthClass: 'w-1.5', usage: 'Icon next to text'},
    {token: 'gap-2', widthClass: 'w-2', usage: 'Label → field → helper'},
    {token: 'gap-4', widthClass: 'w-4', usage: 'Related blocks'},
    {
        token: 'gap-6',
        widthClass: 'w-6',
        usage: 'Form sections; page card padding',
    },
    {token: 'py-10', widthClass: 'w-10', usage: 'Main column, vertical'},
];
