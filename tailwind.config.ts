import type { Config } from 'tailwindcss'
const { createThemes } = require('tw-colors');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extends: { 
    },
  },
  plugins: [
    createThemes({
      gryffindor: {
        'primary': '#AE0001',
        'contrast': '#ffc100',
        'lighter': '#d28c8c',
        'darker': '#740001',
        'background': '#140000',
      },
      slytherin: {
        'primary': '#2A623D',
        'contrast': '#d6d6d6',
        'lighter': '#9bd0ae',
        'darker': '#1A472A',
        'background': '#000603'
      },
      ravenclaw: {
        'primary': '#223164',
        'contrast': '#cc9541',
        'lighter': '#9fb5ff',
        'darker': '#0F1D4A',
        'background': '#000107'
      },
      hufflepuff: {
        'primary': '#b08a28',
        'contrast': '#fce7a2',
        'lighter': '#f7f0da',
        'darker': '#785e1b',
        'background': '#000000'
      }
    })
  ]
}
export default config
