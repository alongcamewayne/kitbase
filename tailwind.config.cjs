const defaultTheme = require('tailwindcss/defaultTheme');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				// display: ['', ...defaultTheme.fontFamily.sans],
				// sans: ['', ...defaultTheme.fontFamily.sans],
				// serif: ['', ...defaultTheme.fontFamily.serif],
				// mono: ['', ...defaultTheme.fontFamily.mono],
			},
		},
	},

	plugins: [forms, typography],
};

module.exports = config;
