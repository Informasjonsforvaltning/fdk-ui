'use client';

import { useState } from 'react';
import { Button, type ButtonProps, Tooltip } from '@digdir/designsystemet-react';
import { FilesIcon } from '@navikt/aksel-icons';

type CopyButtonProps = {
    copyLabel: string;
    copiedLabel: string;
    copyOnClick: string;
} & ButtonProps & React.HTMLAttributes<HTMLButtonElement>;

const CopyButton = ({ copyLabel, copiedLabel, copyOnClick, ...props }: CopyButtonProps) => {
    const [clicked, setClicked] = useState(false);

    const copyToClipboard = (text: string) => {
        setClicked(true);
        navigator.clipboard.writeText(text);
    };

    return (
        <Tooltip
            content={clicked ? copiedLabel : copyLabel}
            placement='top'
        >
            <Button
                data-size='sm'
                variant='secondary'
                onClick={() => copyToClipboard(copyOnClick)}
                onMouseLeave={() => setClicked(false)}
                {...props}
            >
                <FilesIcon aria-hidden />
                <span className={'sr-only'}>{copyLabel}</span>
            </Button>
        </Tooltip>
    );
};

export default CopyButton;
