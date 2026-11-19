'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from '../../copy-button';
import styles from './styles.module.scss';

export const defaultCopyLabel = 'Kopier';
export const defaultCopiedLabel = 'Kopiert!';

export type CodeBlockProps = {
    children: string;
    language?: string;
    copyLabel?: string;
    copiedLabel?: string;
};

const CodeBlock = ({
    children,
    language,
    copyLabel = defaultCopyLabel,
    copiedLabel = defaultCopiedLabel,
}: CodeBlockProps) => {
    return (
        <div
            className={styles.wrapper}
            data-code-block=''
        >
            <div className={styles.copyButton}>
                <CopyButton
                    copyLabel={copyLabel}
                    copiedLabel={copiedLabel}
                    copyOnClick={children}
                    data-color-scheme='dark'
                    variant="tertiary"
                    icon
                />
            </div>
            <div className={styles.scrollContainer}>
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    PreTag='div'
                    tabIndex={0}
                >
                    {children}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeBlock;
