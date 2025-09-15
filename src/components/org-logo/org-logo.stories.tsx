import type { Meta, StoryObj } from '@storybook/react';

import { OrgLogo } from '.';

const meta: Meta<typeof OrgLogo> = {
    component: OrgLogo,
    title: 'OrgLogo',
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        orgLogoSrc: {
            control: 'text',
            description: 'URL of the organization logo image',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
        },
    },
};

export default meta;
type Story = StoryObj<typeof OrgLogo>;

export const Default: Story = {
    args: {
        orgLogoSrc: 'https://orglogo.digdir.no/api/emblem/svg/991825827',
    },
    render: (args) => (
        <div style={{ maxWidth: '2rem', padding: '1rem' }}>
            <OrgLogo {...args} />
        </div>
    ),
};