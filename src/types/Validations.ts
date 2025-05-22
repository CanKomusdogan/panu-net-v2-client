export const noEmptyRule = (v: string) => !!v || 'Boş bırakılamaz';
export const emailRule = (v: string) =>
  /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(v) ||
  'Geçerli bir e-posta adresi giriniz';
export const passwordRule = (v: string) => v.length >= 8 || 'Şifre en az 8 karakter olmalıdır';

export const emailRules = [noEmptyRule, emailRule];

export const passwordRules = [noEmptyRule, passwordRule];
