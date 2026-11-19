import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Markdown } from '.';

const markdown = `
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

> This is a blockquote.

Here is some **bold text**, *italic text*, and ~~strikethrough text~~.

A line break follows:  
This is on a new line.

A [link to OpenAI](https://openai.com).

An inline \`code\` snippet.

\`\`\`javascript
console.log("Hello, Markdown!");
\`\`\`

- Unordered list item 1
- Unordered list item 2

1. Ordered list item 1
2. Ordered list item 2

| Table Header 1 | Table Header 2 |
|---------------|---------------|
| Row 1, Cell 1 | Row 1, Cell 2 |
| Row 2, Cell 1 | Row 2, Cell 2 |

An image:  
![Alt text](https://via.placeholder.com/150)

A <span style="color: red;">red span</span> (if HTML is supported).
`;

const meta: Meta<typeof Markdown> = {
    component: Markdown,
    title: 'Markdown',
    args: {
        children: markdown,
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
type Story = StoryObj<typeof Markdown>;

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

        const bold = canvas.getByText('bold text');
        await expect(bold.tagName).toBe('STRONG');
        await expect(Number(getComputedStyle(bold).fontWeight)).toBeGreaterThanOrEqual(700);
        await expect(canvas.getByText('italic text').tagName).toBe('EM');
        await expect(canvas.getByText('strikethrough text').tagName).toBe('DEL');

        const paragraphs = canvasElement.querySelectorAll('p');
        await expect(paragraphs.length).toBeGreaterThanOrEqual(2);
        await expect(parseFloat(getComputedStyle(paragraphs[1]).marginTop)).toBeGreaterThan(0);

        const lineBreak = canvas.getByText(/A line break follows:/).closest('p');
        await expect(lineBreak?.querySelector('br')).not.toBeNull();

        const hr = canvasElement.querySelector('hr');
        await expect(hr).not.toBeNull();
        await expect(getComputedStyle(hr as Element).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');

        await expect(canvas.getByText('This is a blockquote.').closest('blockquote')).not.toBeNull();

        for (const level of [1, 2, 3, 4, 5, 6]) {
            await expect(canvas.getByRole('heading', { level, name: `Heading ${level}` })).toBeInTheDocument();
        }

        await expect(canvas.getByRole('link', { name: 'link to OpenAI' })).toHaveAttribute('href', 'https://openai.com');
        await expect(canvas.getByText('code').tagName).toBe('CODE');
        const codeBlock = canvasElement.querySelector('[data-code-block]');
        await expect(codeBlock?.textContent).toContain('console.log("Hello, Markdown!")');
        await expect(codeBlock?.closest('pre')).toBeNull();
        await expect(canvas.getByRole('button', { name: 'Kopier' })).toBeInTheDocument();
        await expect(canvas.getAllByRole('list')).toHaveLength(2);
        await expect(canvas.getByRole('table')).toBeInTheDocument();

        const images = canvasElement.querySelectorAll('img');
        await expect(images.length).toBe(1);
        await expect(images[0]).toHaveAttribute('alt', 'Alt text');
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
