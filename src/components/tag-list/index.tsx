import React from 'react';
import cn from 'classnames';
import { Tag } from '@digdir/designsystemet-react';
import styles from './styles.module.scss';

export type TagListProps = {
    maxTags?: number;
    'data-size'?: string;
};

const TagList = ({ children, className, maxTags, 'data-size': dataSize, ...props }: TagListProps & React.HTMLAttributes<HTMLUListElement>) => {
    const childArray = React.Children.toArray(children);
    if (!childArray.length) return null;
    return (
        <ul
            className={cn(styles.tagList, className)}
            {...props}
        >
            {childArray
                .filter((child) => Boolean(child))
                .slice(0, maxTags ?? childArray.length)
                .map((child, i) => {
                    const key = React.isValidElement(child) && child.key != null 
                        ? child.key 
                        : i;
                    return <li key={key}>{child}</li>;
                })}
            {maxTags && maxTags < childArray.length && (
                <li>
                    <Tag data-size={dataSize || 'sm'}>
                        <span>+{childArray.length - maxTags}</span>
                    </Tag>
                </li>
            )}
        </ul>
    );
};

export default TagList;
