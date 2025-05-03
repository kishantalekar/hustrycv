export interface CheckboxProps {
  checked: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  color?: string;
  size?: number;
}
