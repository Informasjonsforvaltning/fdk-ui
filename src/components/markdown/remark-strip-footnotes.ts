import type { Nodes, Root } from 'mdast';

const footnoteNodeTypes = new Set<Nodes['type']>(['footnoteDefinition', 'footnoteReference']);

const stripFootnotes = (node: Nodes) => {
    if (!('children' in node)) return;

    node.children = node.children.filter((child) => !footnoteNodeTypes.has(child.type)) as typeof node.children;

    for (const child of node.children) {
        stripFootnotes(child);
    }
};

export const remarkStripFootnotes = () => (tree: Root) => {
    stripFootnotes(tree);
};
