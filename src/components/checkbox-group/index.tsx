import React, { type ReactNode } from 'react';
import {
  Fieldset,
  Checkbox,
  ValidationMessage,
  type UseCheckboxGroupProps,
  useCheckboxGroup,
} from '@digdir/designsystemet-react';

export interface CheckboxGroupProps extends Omit<UseCheckboxGroupProps, 'value' | 'onChange'> {
  /**
   * The legend text for the fieldset
   */
  legend?: ReactNode;
  /**
   * Optional description text for the fieldset
   */
  description?: ReactNode;
  /**
   * Array of checkbox options
   */
  options: Array<{
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
    allowIndeterminate?: boolean;
  }>;
  /**
   * Controlled value - array of selected checkbox values
   */
  value?: string[];
  /**
   * Callback when the selected values change
   */
  onChange?: (value: string[]) => void;
  /**
   * Optional className for the fieldset
   */
  className?: string;
}

/**
 * CheckboxGroup component that wraps multiple Checkbox components in a Fieldset.
 * Handles state management, onChange, and value automatically.
 *
 * @example
 * <CheckboxGroup
 *   legend="Hvordan vil du kontaktes?"
 *   description="Velg alle relevante alternativer"
 *   options={[
 *     { value: 'epost', label: 'E-post' },
 *     { value: 'telefon', label: 'Telefon' },
 *     { value: 'sms', label: 'SMS' },
 *   ]}
 *   value={selectedValues}
 *   onChange={(values) => setSelectedValues(values)}
 * />
 */
export const CheckboxGroup = ({
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
}: CheckboxGroupProps) => {
  const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
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
        <Checkbox
          key={option.value}
          label={option.label}
          description={option.description}
          disabled={option.disabled}
          {...getCheckboxProps({
            value: option.value,
            allowIndeterminate: option.allowIndeterminate,
          })}
        />
      ))}
      {error && <ValidationMessage {...validationMessageProps} />}
    </Fieldset>
  );
};

export default CheckboxGroup;

