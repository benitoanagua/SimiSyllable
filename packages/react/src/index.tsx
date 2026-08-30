import * as React from 'react';
import '@handheld/components';

export type HhButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'tertiary'|'danger'; size?: 'small'|'medium'|'large'; loading?: boolean; fullWidth?: boolean };
export type HhInputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; error?: string };
export type HhTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string; error?: string };
export type HhIconProps = React.HTMLAttributes<HTMLElement> & { name: string; size?: string; label?: string; decorative?: boolean };
export type HhIconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { name: string; label: string; size?: 'small'|'medium'|'large'; loading?: boolean };
export type HhCardProps = React.HTMLAttributes<HTMLElement> & { interactive?: boolean };
export type HhBadgeProps = React.HTMLAttributes<HTMLElement> & { tone?: string };

export const HhButton = React.forwardRef<HTMLElement, HhButtonProps>((props, ref) => <hh-button ref={ref as React.Ref<any>} {...props} />);
export const HhIcon = React.forwardRef<HTMLElement, HhIconProps>((props, ref) => <hh-icon ref={ref} {...props} />);
export const HhIconButton = React.forwardRef<HTMLElement, HhIconButtonProps>((props, ref) => <hh-icon-button ref={ref as React.Ref<any>} {...props} />);
export const HhInput = React.forwardRef<HTMLElement, HhInputProps>((props, ref) => <hh-input ref={ref as React.Ref<any>} {...props} />);
export const HhTextarea = React.forwardRef<HTMLElement, HhTextareaProps>((props, ref) => <hh-textarea ref={ref as React.Ref<any>} {...props} />);
export const HhCheckbox = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean }>((props, ref) => <hh-checkbox ref={ref} {...props} />);
export const HhRadio = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean }>((props, ref) => <hh-radio ref={ref} {...props} />);
export const HhSwitch = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean }>((props, ref) => <hh-switch ref={ref} {...props} />);
export const HhSelect = React.forwardRef<HTMLElement, React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; hint?: string; error?: string }>((props, ref) => <hh-select ref={ref as React.Ref<any>} {...props} />);
export const HhCard = React.forwardRef<HTMLElement, HhCardProps>((props, ref) => <hh-card ref={ref} {...props} />);
export const HhBadge = React.forwardRef<HTMLElement, HhBadgeProps>((props, ref) => <hh-badge ref={ref} {...props} />);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hh-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhButtonProps;
      'hh-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhIconProps;
      'hh-icon-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhIconButtonProps;
      'hh-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhInputProps;
      'hh-textarea': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhTextareaProps;
      'hh-checkbox': React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean };
      'hh-radio': React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean };
      'hh-switch': React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean };
      'hh-select': React.HTMLAttributes<HTMLElement> & { label?: string; value?: string; disabled?: boolean };
      'hh-card': React.HTMLAttributes<HTMLElement> & { interactive?: boolean };
      'hh-badge': React.HTMLAttributes<HTMLElement> & { tone?: string };
    }
  }
}
