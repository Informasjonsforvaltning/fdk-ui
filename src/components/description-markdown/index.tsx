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
import { descriptionAllowedElements } from './allowed-elements';
import { remarkStripFootnotes } from './remark-strip-footnotes';
import styles from './styles.module.scss';

export { descriptionAllowedElements } from './allowed-elements';
export { markdownToPlainText } from './to-plain-text';

export type DescriptionMarkdownProps = {
    children?: string | null;
    className?: string;
    components?: Components;
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

export const DescriptionMarkdown = ({ children, className, components }: DescriptionMarkdownProps) => {
    if (!children) return null;

    return (
        <div className={cn(styles.descriptionMarkdown, className)}>
            <ReactMarkdown
                allowedElements={descriptionAllowedElements}
                unwrapDisallowed
                remarkPlugins={[remarkGfm, remarkStripFootnotes]}
                components={{
                    ...baseComponents,
                    ...components,
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
};

export default DescriptionMarkdown;
