import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { DescriptionMarkdown } from '.';

const issueDescription = `Dette er et testdatasett med **fet skrift** og *kursiv*.

Et nytt avsnitt etter en tom linje.\\
Et hardt linjeskift.

---

## Overskrift

- Punkt en
- Punkt to

Se [data.norge.no](https://data.norge.no).

| Kolonne | Verdi |
| ------- | ----- |
| a       | 1     |

![bilde](https://example.com/bilde.png)

![](https://example.com/uten-alt.png)`;

const meta: Meta<typeof DescriptionMarkdown> = {
    component: DescriptionMarkdown,
    title: 'DescriptionMarkdown',
    args: {
        children: issueDescription,
    },
    decorators: [
        (Story) => (
            <main style={{ padding: '2rem', maxWidth: '50rem' }}>
                <Story />
            </main>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof DescriptionMarkdown>;

export const Full: Story = {
    decorators: [
        (Story) => (
            <>
                <style>{'strong { font: inherit; } p { margin: 0; }'}</style>
                <Story />
            </>
        ),
    ],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const bold = canvas.getByText('fet skrift');
        await expect(bold.tagName).toBe('STRONG');
        await expect(Number(getComputedStyle(bold).fontWeight)).toBeGreaterThanOrEqual(700);

        const paragraphs = canvasElement.querySelectorAll('p');
        await expect(paragraphs.length).toBeGreaterThanOrEqual(2);
        await expect(parseFloat(getComputedStyle(paragraphs[1]).marginTop)).toBeGreaterThan(0);

        await expect(paragraphs[1].querySelector('br')).not.toBeNull();

        const hr = canvasElement.querySelector('hr');
        await expect(hr).not.toBeNull();
        await expect(getComputedStyle(hr as Element).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');

        await expect(canvas.getByRole('heading', { level: 2, name: 'Overskrift' })).toBeInTheDocument();
        await expect(canvas.getByRole('link', { name: 'data.norge.no' })).toHaveAttribute('href', 'https://data.norge.no');
        await expect(canvas.getByRole('table')).toBeInTheDocument();

        const images = canvasElement.querySelectorAll('img');
        await expect(images.length).toBe(2);
        await expect(images[0]).toHaveAttribute('alt', 'bilde');
        await expect(images[1]).toHaveAttribute('alt', '');
    },
};

export const Footnotes: Story = {
    args: {
        children: 'Tekst[^1].\n\n[^1]: Kilde.',
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByText('Tekst.')).toBeInTheDocument();
        await expect(canvasElement.querySelector('sup')).toBeNull();
        await expect(canvasElement.querySelector('[data-footnotes], [data-footnote-ref]')).toBeNull();
        await expect(canvas.queryByText('Footnotes')).toBeNull();
        await expect(canvas.queryByText('Kilde.')).toBeNull();
    },
};

export const CustomLink: Story = {
    args: {
        children: 'Se [data.norge.no](https://data.norge.no).',
        components: {
            a: ({ href, children }) => (
                <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    data-testid='custom-link'
                >
                    {children}
                </a>
            ),
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await expect(canvas.getByTestId('custom-link')).toHaveAttribute('target', '_blank');
    },
};

export const Empty: Story = {
    args: {
        children: '',
    },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.querySelector('main')?.childElementCount).toBe(0);
    },
};
