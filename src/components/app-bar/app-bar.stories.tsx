import type { Meta, StoryObj } from '@storybook/react';

import AppBar from '.';

const meta: Meta<typeof AppBar> = {
    component: AppBar,
    title: 'AppBar',
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
    render: () => (
        <div style={{ padding: '1rem' }}>
            <AppBar />
        </div>
    ),
};