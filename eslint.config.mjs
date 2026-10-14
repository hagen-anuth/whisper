// @ts-check
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import {defineConfig, globalIgnores} from 'eslint/config';
import importX from 'eslint-plugin-import-x';

/**
 * Next's presets plus two conventions: the '@/…' alias is the import form
 * (a parent-relative specifier is an error), and shadcn components under
 * components/ui/ are not linted because they are re-generated, not edited.
 *
 * `eslint-plugin-import-x`, not `eslint-plugin-import`: the latter is
 * already registered by eslint-config-next as `import`, and import-x's
 * `internal-regex` classifies '@/…' as internal without a resolver.
 */
export default defineConfig([
    ...nextVitals,
    ...nextTs,
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'coverage/**',
        'next-env.d.ts',
        'src/components/ui/**',
    ]),
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {'import-x': importX},
        settings: {'import-x/internal-regex': '^@/'},
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['..', '../*', '../**'],
                            message:
                                "Cross-directory imports use the '@/…' alias. A sibling './…' is fine.",
                        },
                    ],
                },
            ],
            'import-x/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling', 'index'],
                        'type',
                    ],
                    pathGroups: [
                        {pattern: '@/lib/**', group: 'internal', position: 'before'},
                        {pattern: '@/hooks/**', group: 'internal', position: 'before'},
                    ],
                    alphabetize: {order: 'asc', caseInsensitive: true},
                    'newlines-between': 'always',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {fixStyle: 'inline-type-imports'},
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
            ],
        },
    },
]);
