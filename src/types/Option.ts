export type Option = {
  label: string;
  value?: string | number;
  onSelect?: () => void; // Optional function to execute when the option is selected
};
