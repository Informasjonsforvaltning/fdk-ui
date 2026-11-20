import React from 'react';
import cn from 'classnames';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    Link,
    Paragraph,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@digdir/designsystemet-react';
import { allowedElements } from './allowed-elements';
import CodeBlock, { defaultCopiedLabel, defaultCopyLabel } from './code-block';
import { remarkStripFootnotes } from './remark-strip-footnotes';
import styles from './styles.module.scss';

export { allowedElements } from './allowed-elements';
export { default as CodeBlock } from './code-block';
export type { CodeBlockProps } from './code-block';
export { markdownToPlainText } from './to-plain-text';
export type { Components as MarkdownComponents } from 'react-markdown';

export type MarkdownProps = {
    children?: string | null;
    className?: string;
    components?: Components;
    copyLabel?: string;
    copiedLabel?: string;
};

type Props<T extends keyof React.JSX.IntrinsicElements> = React.ComponentProps<T> & { node?: unknown };

const baseComponents: Components = {
    p: ({ node: _node, ...props }: Props<'p'>) => <Paragraph {...props} />,
    a: ({ node: _node, children, ...props }: Props<'a'>) => <Link {...props}>{children}</Link>,
    img: ({ node: _node, alt = '', ...props }: Props<'img'>) => (
        <img
            alt={alt}
            {...props}
        />
    ),
    table: ({ node: _node, border: _border, ...props }: Props<'table'>) => (
        <div className={styles.tableWrapper}>
            <Table {...props} />
        </div>
    ),
    thead: ({ node: _node, ...props }: Props<'thead'>) => <TableHead {...props} />,
    tbody: ({ node: _node, ...props }: Props<'tbody'>) => <TableBody {...props} />,
    tr: ({ node: _node, ...props }: Props<'tr'>) => <TableRow {...props} />,
    th: ({ node: _node, ...props }: Props<'th'>) => <TableHeaderCell {...props} />,
    td: ({ node: _node, ...props }: Props<'td'>) => <TableCell {...props} />,
};

const codeText = (children: React.ReactNode) => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.join('');
    return '';
};

export const Markdown = ({
    children,
    className,
    components,
    copyLabel = defaultCopyLabel,
    copiedLabel = defaultCopiedLabel,
}: MarkdownProps) => {
    if (!children) return null;

    const code = ({ node: _node, className: codeClassName, children: codeChildren, ...props }: Props<'code'>) => {
        const text = codeText(codeChildren);
        if (!text.includes('\n')) {
            return (
                <code
                    className={codeClassName}
                    {...props}
                >
                    {codeChildren}
                </code>
            );
        }

        const language = /language-(\w+)/.exec(codeClassName || '')?.[1];

        return (
            <CodeBlock
                language={language}
                copyLabel={copyLabel}
                copiedLabel={copiedLabel}
            >
                {text}
            </CodeBlock>
        );
    };

    // A `code` override from the consumer replaces ours, and is what renders inside `pre`.
    const codeComponent = components?.code && typeof components.code !== 'string' ? components.code : code;

    const pre = ({ node: _node, children: preChildren, ...props }: Props<'pre'>) => {
        const renderedByCode = React.Children.toArray(preChildren).some(
            (child) => React.isValidElement(child) && child.type === codeComponent,
        );

        if (renderedByCode) return <>{preChildren}</>;

        return <pre {...props}>{preChildren}</pre>;
    };

    return (
        <div className={cn(styles.markdown, className)}>
            <ReactMarkdown
                allowedElements={allowedElements}
                unwrapDisallowed
                remarkPlugins={[remarkGfm, remarkStripFootnotes]}
                components={{
                    ...baseComponents,
                    pre,
                    code,
                    ...components,
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
};

export default Markdown;
