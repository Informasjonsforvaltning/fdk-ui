import type { Meta, StoryObj } from '@storybook/react';

import { HelpText } from '.';

const meta: Meta<typeof HelpText> = {
    component: HelpText,
    title: 'HelpText',
    parameters: {
        docs: {
            description: {
                component: 'A help text component that displays additional information in a popover when clicked.',
            },
        },
    },
    argTypes: {
        placement: {
            control: 'select',
            options: ['right', 'bottom', 'left', 'top'],
            description: 'Placement of the popover',
        },
        'aria-label': {
            control: 'text',
            description: 'Required descriptive label for screen readers',
        },
    },
};

export default meta;
type Story = StoryObj<typeof HelpText>;

export const Default: Story = {
    args: {
        'aria-label': 'Help information',
        placement: 'right',
        children: 'This is helpful information that appears when you click the help icon.',
    },
    render: (args) => (
        <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <HelpText {...args} />
        </div>
    ),
};