import React from 'react';
import { Popover } from '@digdir/designsystemet-react';
import styles from './helptext.module.scss';

export type HelpTextProps = {
    /**
     * Required descriptive label for screen readers.
     **/
    "aria-label": string;
    /**
     * Placement of the Popover.
     * @default 'right'
     */
    placement?: "right" | "bottom" | "left" | "top";
  } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">;
  
  export const HelpText = React.forwardRef<HTMLButtonElement, HelpTextProps>(
    function HelpText(
      { placement = "right", children, ...rest },
      ref
    ) {
      return (
        <Popover.TriggerContext>
          <Popover.Trigger
            className={styles.helptext}
            ref={ref}
            variant="tertiary"
            data-color="info"
            {...rest}
          />
          <Popover placement={placement} data-color="info">
            {children}
          </Popover>
        </Popover.TriggerContext>
      );
    }
  );