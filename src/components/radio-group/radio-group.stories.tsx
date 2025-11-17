import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import RadioGroup from '.';

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: 'RadioGroup',
  argTypes: {
    legend: {
      control: 'text',
      description: 'The legend text for the fieldset',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    value: {
      control: 'text',
      description: 'Controlled value - the selected radio value',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all radios',
    },
    readOnly: {
      control: 'boolean',
      description: 'Make all radios read-only',
    },
    required: {
      control: 'boolean',
      description: 'Make all radios required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const defaultOptions = [
  { value: 'vanilje', label: 'Vanilje' },
  { value: 'jordbær', label: 'Jordbær' },
  { value: 'sjokolade', label: 'Sjokolade' },
  { value: 'spiser-ikke-is', label: 'Jeg spiser ikke iskrem' },
];

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState('vanilje');
    return (
      <RadioGroup
        legend="Hvilken iskremsmak er best?"
        description="Velg din favorittsmak blant alternativene."
        options={defaultOptions}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <RadioGroup
      legend="Hvilken iskremsmak er best?"
      description="Velg din favorittsmak blant alternativene."
      options={defaultOptions}
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <RadioGroup
      legend="Hvilken bydel bor du i?"
      description="Trondheim er delt inn i fire bydeler"
      options={[
        { value: 'ostbyen', label: 'Østbyen' },
        { value: 'lerkendal', label: 'Lerkendal' },
        { value: 'heimdal', label: 'Heimdal' },
        { value: 'midtbyen', label: 'Midtbyen' },
      ]}
      error="Du må velge en bydel før du kan fortsette."
      required
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup
      legend="Hvilken iskremsmak er best?"
      options={defaultOptions}
      disabled
    />
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <RadioGroup
      legend="Hvilken bydel bor du i?"
      options={[
        { value: 'ostbyen', label: 'Østbyen' },
        { value: 'lerkendal', label: 'Lerkendal' },
        { value: 'heimdal', label: 'Heimdal', disabled: true },
        { value: 'midtbyen', label: 'Midtbyen' },
      ]}
      value="heimdal"
      readOnly
    />
  ),
};

export const WithDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <RadioGroup
        legend="Velg pizza"
        description="Alle pizzaene er laget på våre egne nybakte bunner"
        options={[
          { value: 'ost', label: 'Bare ost' },
          {
            value: 'dobbeldekker',
            label: 'Dobbeldekker',
            description: 'Chorizo spesial med kokkens luksuskylling',
          },
          { value: 'flammen', label: 'Flammen' },
          { value: 'snadder', label: 'Snadder' },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

