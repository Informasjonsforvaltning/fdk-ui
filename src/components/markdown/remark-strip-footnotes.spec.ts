import { describe, expect, it } from 'vitest';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import type { Root } from 'mdast';
import { remarkStripFootnotes } from './remark-strip-footnotes';

const parseAndStrip = (markdown: string): Root => {
    const processor = unified().use(remarkParse).use(remarkGfm).use(remarkStripFootnotes);
    return processor.runSync(processor.parse(markdown)) as Root;
};

const nodeTypes = (tree: Root): string[] => {
    const types: string[] = [];
    const walk = (node: { type: string; children?: unknown[] }) => {
        types.push(node.type);
        node.children?.forEach((child) => walk(child as { type: string; children?: unknown[] }));
    };
    walk(tree);
    return types;
};

describe('remarkStripFootnotes', () => {
    it('removes footnote references and definitions', () => {
        const types = nodeTypes(parseAndStrip('Tekst med fotnote[^1].\n\n[^1]: Kilde.'));
        expect(types).not.toContain('footnoteReference');
        expect(types).not.toContain('footnoteDefinition');
    });

    it('removes references nested inside other nodes', () => {
        const types = nodeTypes(parseAndStrip('- **fet[^a]**\n\n[^a]: Kilde.'));
        expect(types).not.toContain('footnoteReference');
        expect(types).toContain('strong');
    });

    it('keeps everything else', () => {
        expect(nodeTypes(parseAndStrip('Bare **tekst**.'))).toEqual(['root', 'paragraph', 'text', 'strong', 'text', 'text']);
    });
});
