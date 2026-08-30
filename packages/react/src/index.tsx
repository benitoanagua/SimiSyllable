import * as React from 'react';
import '@handheld/components';

export type HhButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'tertiary'|'danger'; size?: 'small'|'medium'|'large'; loading?: boolean; fullWidth?: boolean };
export type HhInputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; error?: string };
export type HhTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string; error?: string };
export type HhIconProps = React.HTMLAttributes<HTMLElement> & { name: string; size?: string; label?: string; decorative?: boolean };
export type HhIconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { name: string; label: string; size?: 'small'|'medium'|'large'; loading?: boolean };
export type HhCardProps = React.HTMLAttributes<HTMLElement> & { interactive?: boolean };
export type HhBadgeProps = React.HTMLAttributes<HTMLElement> & { tone?: string };
export type HhAvatarProps = React.HTMLAttributes<HTMLElement> & { src?: string; name?: string; size?: 'small'|'medium'|'large'; shape?: 'circle'|'square'; status?: 'online'|'offline'|'busy'|'away' };
export type HhProgressProps = React.HTMLAttributes<HTMLElement> & { value?: number; indeterminate?: boolean; label?: string; tone?: 'action'|'success'|'danger'|'warning' };
export type HhSkeletonProps = React.HTMLAttributes<HTMLElement> & { variant?: 'text'|'circle'|'rect'; width?: string; height?: string };
export type HhSliderProps = Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> & { value?: number; min?: number; max?: number; step?: number; label?: string; disabled?: boolean; showValue?: boolean; onHhInput?: (e: CustomEvent<number>) => void; onHhChange?: (e: CustomEvent<number>) => void };
export type HhPaginationProps = React.HTMLAttributes<HTMLElement> & { page?: number; pageCount?: number; siblingCount?: number; label?: string; onHhChange?: (e: CustomEvent<number>) => void };
export type HhBreadcrumbsProps = React.HTMLAttributes<HTMLElement> & { label?: string; maxItems?: number };
export type HhBreadcrumbItemProps = React.HTMLAttributes<HTMLElement> & { href?: string; current?: boolean };
export type HhMenuProps = React.HTMLAttributes<HTMLElement> & { open?: boolean; label?: string; placement?: 'bottom-start'|'bottom-end'; onHhOpenChange?: (e: CustomEvent<boolean>) => void; onHhSelect?: (e: CustomEvent<string>) => void };
export type HhMenuItemProps = React.HTMLAttributes<HTMLElement> & { value?: string; disabled?: boolean; tone?: 'default'|'danger'; onHhSelect?: (e: CustomEvent<string>) => void };
export type HhSegmentedControlProps = React.HTMLAttributes<HTMLElement> & { value?: string; label?: string; onHhChange?: (e: CustomEvent<string>) => void };
export type HhSegmentedItemProps = React.HTMLAttributes<HTMLElement> & { value?: string; disabled?: boolean; selected?: boolean };
export type HhToastRegionProps = React.HTMLAttributes<HTMLElement> & { placement?: 'top'|'bottom'; maxVisible?: number };
export type HhComboboxProps = React.HTMLAttributes<HTMLElement> & { label?: string; name?: string; value?: string; placeholder?: string; hint?: string; error?: string; required?: boolean; disabled?: boolean; allowCustomValue?: boolean; noResultsText?: string; onHhChange?: (e: CustomEvent<string>) => void; onHhInput?: (e: CustomEvent<string>) => void };
export type HhComboboxOptionProps = React.HTMLAttributes<HTMLElement> & { value?: string };
export type HhDatePickerProps = React.HTMLAttributes<HTMLElement> & { label?: string; name?: string; value?: string; min?: string; max?: string; locale?: string; firstDayOfWeek?: 0|1; hint?: string; error?: string; required?: boolean; disabled?: boolean; placeholder?: string; onHhChange?: (e: CustomEvent<string>) => void; onHhInput?: (e: CustomEvent<string>) => void };
export type HhTimePickerProps = React.HTMLAttributes<HTMLElement> & { label?: string; name?: string; value?: string; min?: string; max?: string; step?: number; hint?: string; error?: string; required?: boolean; disabled?: boolean; onHhChange?: (e: CustomEvent<string>) => void; onHhInput?: (e: CustomEvent<string>) => void };
export type HhFileUploadProps = React.HTMLAttributes<HTMLElement> & { label?: string; name?: string; accept?: string; multiple?: boolean; disabled?: boolean; required?: boolean; hint?: string; error?: string; maxSizeBytes?: number; dropzoneText?: string; browseText?: string; onHhFilesChange?: (e: CustomEvent<File[]>) => void; onHhFileError?: (e: CustomEvent) => void };

export const HhButton = React.forwardRef<HTMLElement, HhButtonProps>((props, ref) => <hh-button ref={ref as React.Ref<any>} {...props} />);
export const HhIcon = React.forwardRef<HTMLElement, HhIconProps>((props, ref) => <hh-icon ref={ref} {...props} />);
export const HhIconButton = React.forwardRef<HTMLElement, HhIconButtonProps>((props, ref) => <hh-icon-button ref={ref as React.Ref<any>} {...props} />);
export const HhInput = React.forwardRef<HTMLElement, HhInputProps>((props, ref) => <hh-input ref={ref as React.Ref<any>} {...props} />);
export const HhTextarea = React.forwardRef<HTMLElement, HhTextareaProps>((props, ref) => <hh-textarea ref={ref as React.Ref<any>} {...props} />);
export const HhCheckbox = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean }>((props, ref) => <hh-checkbox ref={ref} {...props} />);
export const HhRadio = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean }>((props, ref) => <hh-radio ref={ref} {...props} />);
export const HhSwitch = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { label?: string; checked?: boolean }>((props, ref) => <hh-switch ref={ref} {...props} />);
export type HhSelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value'> & { label?: string; hint?: string; error?: string; value?: string };
export const HhSelect = React.forwardRef<HTMLElement, HhSelectProps>((props, ref) => <hh-select ref={ref as React.Ref<any>} {...props} />);
export const HhCard = React.forwardRef<HTMLElement, HhCardProps>((props, ref) => <hh-card ref={ref} {...props} />);
export const HhBadge = React.forwardRef<HTMLElement, HhBadgeProps>((props, ref) => <hh-badge ref={ref} {...props} />);
export const HhAvatar = React.forwardRef<HTMLElement, HhAvatarProps>((props, ref) => <hh-avatar ref={ref} {...props} />);
export const HhProgress = React.forwardRef<HTMLElement, HhProgressProps>((props, ref) => <hh-progress ref={ref} {...props} />);
export const HhSkeleton = React.forwardRef<HTMLElement, HhSkeletonProps>((props, ref) => <hh-skeleton ref={ref} {...props} />);
export const HhSlider = React.forwardRef<HTMLElement, HhSliderProps>((props, ref) => <hh-slider ref={ref as React.Ref<any>} {...props} />);
export const HhPagination = React.forwardRef<HTMLElement, HhPaginationProps>((props, ref) => <hh-pagination ref={ref} {...props} />);
export const HhBreadcrumbs = React.forwardRef<HTMLElement, HhBreadcrumbsProps>((props, ref) => <hh-breadcrumbs ref={ref} {...props} />);
export const HhBreadcrumbItem = React.forwardRef<HTMLElement, HhBreadcrumbItemProps>((props, ref) => <hh-breadcrumb-item ref={ref} {...props} />);
export const HhMenu = React.forwardRef<HTMLElement, HhMenuProps>((props, ref) => <hh-menu ref={ref} {...props} />);
export const HhMenuItem = React.forwardRef<HTMLElement, HhMenuItemProps>((props, ref) => <hh-menu-item ref={ref} {...props} />);
export const HhSegmentedControl = React.forwardRef<HTMLElement, HhSegmentedControlProps>((props, ref) => <hh-segmented-control ref={ref} {...props} />);
export const HhSegmentedItem = React.forwardRef<HTMLElement, HhSegmentedItemProps>((props, ref) => <hh-segmented-item ref={ref} {...props} />);
export const HhToastRegion = React.forwardRef<HTMLElement, HhToastRegionProps>((props, ref) => <hh-toast-region ref={ref} {...props} />);
export const HhCombobox = React.forwardRef<HTMLElement, HhComboboxProps>((props, ref) => <hh-combobox ref={ref} {...props} />);
export const HhComboboxOption = React.forwardRef<HTMLElement, HhComboboxOptionProps>((props, ref) => <hh-combobox-option ref={ref} {...props} />);
export const HhDatePicker = React.forwardRef<HTMLElement, HhDatePickerProps>((props, ref) => <hh-date-picker ref={ref} {...props} />);
export const HhTimePicker = React.forwardRef<HTMLElement, HhTimePickerProps>((props, ref) => <hh-time-picker ref={ref} {...props} />);
export const HhFileUpload = React.forwardRef<HTMLElement, HhFileUploadProps>((props, ref) => <hh-file-upload ref={ref} {...props} />);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'hh-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhButtonProps;
      'hh-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhIconProps;
      'hh-icon-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhIconButtonProps;
      'hh-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhInputProps;
      'hh-textarea': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhTextareaProps;
      'hh-checkbox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { label?: string; checked?: boolean };
      'hh-radio': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { label?: string; checked?: boolean };
      'hh-switch': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { label?: string; checked?: boolean };
      'hh-select': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { label?: string; value?: string; disabled?: boolean };
      'hh-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { interactive?: boolean };
      'hh-badge': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { tone?: string };
      'hh-avatar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhAvatarProps;
      'hh-progress': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhProgressProps;
      'hh-skeleton': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhSkeletonProps;
      'hh-slider': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhSliderProps;
      'hh-pagination': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhPaginationProps;
      'hh-breadcrumbs': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhBreadcrumbsProps;
      'hh-breadcrumb-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhBreadcrumbItemProps;
      'hh-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhMenuProps;
      'hh-menu-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhMenuItemProps;
      'hh-segmented-control': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhSegmentedControlProps;
      'hh-segmented-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhSegmentedItemProps;
      'hh-toast-region': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhToastRegionProps;
      'hh-combobox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhComboboxProps;
      'hh-combobox-option': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhComboboxOptionProps;
      'hh-date-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhDatePickerProps;
      'hh-time-picker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhTimePickerProps;
      'hh-file-upload': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & HhFileUploadProps;
    }
  }
}
