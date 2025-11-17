import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CheckboxGroup from '.';

const meta: Meta<typeof CheckboxGroup> = {
  component: CheckboxGroup,
  title: 'CheckboxGroup',
  argTypes: {
    legend: {
      control: 'text',
      description: 'The legend text for the fieldset',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all checkboxes',
    },
    readOnly: {
      control: 'boolean',
      description: 'Make all checkboxes read-only',
    },
    required: {
      control: 'boolean',
      description: 'Make all checkboxes required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const defaultOptions = [
  { value: 'epost', label: 'E-post' },
  { value: 'telefon', label: 'Telefon' },
  { value: 'sms', label: 'SMS' },
];

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['epost']);
    return (
      <CheckboxGroup
        legend="Hvordan vil du helst at vi skal kontakte deg?"
        description="Velg alle alternativene som er relevante for deg."
        options={defaultOptions}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <CheckboxGroup
      legend="Hvordan vil du helst at vi skal kontakte deg?"
      description="Velg alle alternativene som er relevante for deg."
      options={defaultOptions}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <CheckboxGroup
      legend="Hvordan vil du helst at vi skal kontakte deg?"
      options={defaultOptions}
      error="Du må velge minst ett alternativ."
      required
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <CheckboxGroup
      legend="Hvordan vil du helst at vi skal kontakte deg?"
      options={defaultOptions}
      disabled
    />
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <CheckboxGroup
      legend="Hvordan vil du helst at vi skal kontakte deg?"
      options={defaultOptions}
      value={['epost', 'telefon']}
      readOnly
    />
  ),
};

export const WithIndeterminate: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <CheckboxGroup
        legend="Velg kommunikasjonskanaler"
        options={[
          {
            value: 'all',
            label: 'Velg alle',
            allowIndeterminate: true,
          },
          { value: 'epost', label: 'E-post' },
          { value: 'telefon', label: 'Telefon' },
          { value: 'sms', label: 'SMS' },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <CheckboxGroup
        legend="Velg dine interesser"
        description="Du kan velge flere alternativer"
        options={[
          { value: 'sport', label: 'Sport', description: 'Fotball, håndball, og mer' },
          { value: 'musikk', label: 'Musikk', description: 'Konserter og festivaler' },
          { value: 'mat', label: 'Mat og drikke', description: 'Restauranter og oppskrifter' },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

