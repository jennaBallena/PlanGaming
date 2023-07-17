/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          marine: '#02295a',
          purplish: '#473dff',
          pastel: '#adbeff',
          light: '#bfe2fd',
          strawberry: '#ed3548',
          cool: '#9699ab',
          lightGray: '#d6d9e6',
          magnolia: '#f0f6ff',
          alabaster: '#fafbff',
          white: '#FFFFFF'
        },
      },
    },
  }
})