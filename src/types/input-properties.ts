// the pattern is to use label as a key so make sure to use unique label names
export interface InputProperties {
  type: string;
  label: string;
  icon?: string;
  hint?: string;
  showPassword?: boolean;
  counter?: number;
  value: string;
  validationRules?: ((v: string) => true | string)[];
}
