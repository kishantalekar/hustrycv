/**
 * Types for the DateInputRow component
 */
export interface DateInputRowProps {
  /**
   * The start date value
   */
  startDate: string;

  /**
   * The end date value
   */
  endDate: string;

  /**
   * Callback function when start date changes
   */
  onStartDateChange: (text: string) => void;

  /**
   * Callback function when end date changes
   */
  onEndDateChange: (text: string) => void;

  /**
   * Helper text for the start date input
   */
  startDateHelperText?: string;

  /**
   * Helper text for the end date input
   */
  endDateHelperText?: string;

  /**
   * Additional styles for the component
   */
  style?: any;

  /**
   * Whether the user is currently working at this position
   * When true, the end date label will show as "Status" instead of "End Date"
   */
  current?: boolean;
}
