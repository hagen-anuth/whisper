# Design

The rules for whisper's UI. Values live in code, not here:

- **Tokens:** `src/app/globals.css` (`:root` and `.dark`)
- **Primitives:** `src/components/ui/` (shadcn, `radix-nova` style)
- **Visual reference:** `/styleguide` in `yarn dev`. It renders every token,
  type step and primitive from the real sources, in both themes. It 404s in
  production builds.

When this file and the styleguide disagree with the code, the code wins and
the other two are fixed.

## Principles

1. **Quiet by default.** Interactive UI is neutral grey. The backdrop is the
   only saturated colour.
2. **Say what happens.** Every screen states the consequence: opened once,
   expires at a time, deleted from the server.
3. **One primary action per screen.** Everything else is `outline`, `ghost`
   or `link`.
4. **Secrets look like data.** Secret material and links are monospace on a
   `muted/50` field with a border.
5. **Red means error.** `destructive` is for failures and invalid input only.
6. **Both themes are first-class.** Check light and dark; focus stays visible;
   motion stops under `prefers-reduced-motion`.

## Colour

- Use semantic tokens through Tailwind (`bg-card`, `text-muted-foreground`,
  `border-input`). No raw colour values, no Tailwind palette colours
  (`gray-500`, `red-600`) in app code.
- `--backdrop-*` belong to `components/backdrop.tsx` only.
- `--chart-*`, `--sidebar-*` and `--popover*` are shadcn defaults the app does
  not use. Using one means moving it out of the Reserved group in the
  styleguide's `tokens.ts` and giving it a usage note.
- Adding a token means adding it to `:root` **and** `.dark`, and to
  `src/features/styleguide/tokens.ts`. `tokens.test.ts` fails otherwise.

## Typography

- Geist for UI, Geist Mono for secrets, links and code.
- Stay on the type scale shown in the styleguide: `text-xs` to `text-xl`.
  Headings are `font-semibold`, labels and buttons `font-medium`. Body copy
  never goes below `text-xs`.
- Secondary copy is `text-muted-foreground`, not a smaller size.

## Layout & spacing

- One `max-w-xl` column, `px-4` gutters, content in a single `Card` with
  `[--card-spacing:--spacing(6)]`.
- Stick to the spacing steps in the styleguide: `gap-1.5` icon and text,
  `gap-2` within a field, `gap-6` between sections.
- Radius derives from `--radius`: `rounded-lg` for controls, `rounded-xl` for
  cards, `rounded-full` for icon badges.

## Components

- Reach for `components/ui/` first. Add new primitives with the shadcn CLI
  (`npx shadcn add <name>`) rather than writing them by hand; files in
  `components/ui/` are regenerated, not edited.
- Icons are `lucide-react`: `size-4` in buttons and labels, `size-3.5` beside
  `text-xs`, `size-5` in icon badges.
- Errors render as `<p role="alert" className="text-destructive text-sm">`
  directly above the action they relate to.
- End states (expired, gone, invalid link) use the notice pattern: icon badge,
  `text-lg` heading, muted body, one `outline` way forward.

## Visual review

Open `/styleguide`, toggle the theme, and check the changed area against it.
A new primitive or pattern is not done until it appears there.
