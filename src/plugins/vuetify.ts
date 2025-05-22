import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import 'vuetify/styles';

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#1b2119',
          surface: '#0e150e',
          'surface-dim': '#0e150e',
          'surface-bright': '#343b32',
          'on-surface': '#dde5d8',
          outline: '#879483',
          'outline-variant': '#3e4a3c',
          primary: '#66df6e',
          'on-primary': '#00390c',
          secondary: '#92d78e',
          'on-secondary': '#00390c',
          tertiary: '#b1ceab',
          'on-tertiary': '#1e361d',
          error: '#ffb4ab',
          'on-error': '#690005',
          'surface-light': '#343b32',
        },
        dark: true,
        variables: {
          'overlay-background': '#131e12',
        },
      },
    },
  },
});
