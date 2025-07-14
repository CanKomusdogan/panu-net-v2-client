export interface InputProperties {
  id: string;
  type: 'text' | 'number' | 'tel' | 'email' | 'password' | 'date' | 'checkbox' | 'url' | 'search';
  label: string;
  icon?: string;
  hint?: string;
  showPassword?: boolean;
  counter?: number;
  value: string;
  validationRules?: ((v: string) => true | string)[];
  neverResetValue?: boolean;
}
