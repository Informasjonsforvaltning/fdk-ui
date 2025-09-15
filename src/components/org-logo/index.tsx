import React from 'react';
import cn from 'classnames';
import { Buildings3Icon } from '@navikt/aksel-icons';
import styles from './styles.module.scss';

export type OrgLogoProps = {
    orgLogoSrc?: string | null;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const OrgLogo = ({ className, orgLogoSrc, ...props }: OrgLogoProps) => {
    return (
        <div className={cn(styles.orgLogo, className)} {...props}>
            {orgLogoSrc ? (
                <img
                    aria-hidden
                    src={orgLogoSrc}
                    alt=''
                />
            ) : (
                <Buildings3Icon aria-hidden />
            )}
        </div>
    );
};

export { OrgLogo };
