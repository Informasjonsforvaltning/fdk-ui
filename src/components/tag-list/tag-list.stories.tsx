import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from '@digdir/designsystemet-react';
import TagList from '.';

const meta: Meta<typeof TagList> = {
    component: TagList,
    title: 'TagList',
};

export default meta;
type Story = StoryObj<typeof TagList>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <TagList>
                    <Tag data-size='sm'>My tag</Tag>
                    <Tag
                        data-size='sm'
                        color='success'
                    >
                        My tag
                    </Tag>
                    <Tag
                        data-size='sm'
                        color='neutral'
                    >
                        My tag
                    </Tag>
                    <Tag
                        data-size='sm'
                        color='warning'
                    >
                        My tag
                    </Tag>
                    <Tag
                        data-size='sm'
                        color='danger'
                    >
                        My tag
                    </Tag>
                </TagList>
            </div>
        </>
    ),
};

export const WithMaxTags: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <TagList maxTags={3}>
                    <Tag data-size='sm'>Tag 1</Tag>
                    <Tag
                        data-size='sm'
                        color='success'
                    >
                        Tag 2
                    </Tag>
                    <Tag
                        data-size='sm'
                        color='neutral'
                    >
                        Tag 3
                    </Tag>
                    <Tag
                        data-size='sm'
                        color='warning'
                    >
                        Tag 4
                    </Tag>
                    <Tag
                        data-size='sm'
                        color='danger'
                    >
                        Tag 5
                    </Tag>
                    <Tag data-size='sm'>Tag 6</Tag>
                    <Tag
                        data-size='sm'
                        color='success'
                    >
                        Tag 7
                    </Tag>
                    <Tag
                        data-size='sm'
                        color='neutral'
                    >
                        Tag 8
                    </Tag>
                </TagList>
            </div>
        </>
    ),
};
