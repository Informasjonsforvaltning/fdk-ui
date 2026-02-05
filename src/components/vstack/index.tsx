import React from 'react';
import cn from 'classnames';

import styles from './vstack.module.scss';

const VStack = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(styles.wrapper, className)}
            {...props}
        >
            {children}
        </div>
    );
};

export default VStack;
