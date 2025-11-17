import React, { type ReactNode } from 'react';
import {
  Fieldset,
  Radio,
  ValidationMessage,
  type UseRadioGroupProps,
  useRadioGroup,
} from '@digdir/designsystemet-react';

export interface RadioGroupProps extends Omit<UseRadioGroupProps, 'value' | 'onChange'> {
  /**
   * The legend text for the fieldset
   */
  legend?: ReactNode;
  /**
   * Optional description text for the fieldset
   */
  description?: ReactNode;
  /**
   * Array of radio options
   */
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }>;
  /**
   * Controlled value - the selected radio value
   */
  value?: string;
  /**
   * Callback when the selected value changes
   */
  onChange?: (value: string) => void;
  /**
   * Optional className for the fieldset
   */
  className?: string;
}

/**
 * RadioGroup component that wraps multiple Radio components in a Fieldset.
 * Handles state management, onChange, and value automatically.
 *
 * @example
 * <RadioGroup
 *   legend="Hvilken iskremsmak er best?"
 *   description="Velg din favorittsmak"
 *   options={[
 *     { value: 'vanilje', label: 'Vanilje' },
 *     { value: 'jordbær', label: 'Jordbær' },
 *     { value: 'sjokolade', label: 'Sjokolade' },
 *   ]}
 *   value={selectedValue}
 *   onChange={(value) => setSelectedValue(value)}
 * />
 */
export const RadioGroup = ({
  legend,
  description,
  options,
  value,
  onChange,
  error,
  disabled,
  readOnly,
  required,
  name,
  className,
}: RadioGroupProps) => {
  const { getRadioProps, validationMessageProps } = useRadioGroup({
    value,
    onChange: onChange ? (nextValue) => onChange(nextValue) : undefined,
    error,
    disabled,
    readOnly,
    required,
    name,
  });

  return (
    <Fieldset className={className}>
      {legend && <Fieldset.Legend>{legend}</Fieldset.Legend>}
      {description && <Fieldset.Description>{description}</Fieldset.Description>}
      {options.map((option) => (
        <Radio
          key={option.value}
          label={option.label}
          description={option.description}
          disabled={option.disabled}
          {...getRadioProps(option.value)}
        />
      ))}
      {error && <ValidationMessage {...validationMessageProps} />}
    </Fieldset>
  );
};

export default RadioGroup;

