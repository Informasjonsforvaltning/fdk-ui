import type { Meta, StoryObj } from '@storybook/react';

import VStack from '.';

const meta: Meta<typeof VStack> = {
    component: VStack,
    title: 'VStack',
};

export default meta;
type Story = StoryObj<typeof VStack>;

const Item = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            padding: '0.25rem 0.5rem',
            background: '#EEF0F2',
            borderRadius: 4,
        }}
    >
        {children}
    </div>
);

export const Primary: Story = {
    render: () => (
        <div style={{ padding: '1rem' }}>
            <VStack>
                <Item>Row 1</Item>
                <Item>Row 2</Item>
                <Item>Row 3</Item>
            </VStack>
        </div>
    ),
};


