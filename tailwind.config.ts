/** @type {import('tailwindcss').Config}*/
import { join } from 'path';
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {},
		backgroundSize: {
			auto: 'auto',
			cover: 'cover',
			contain: 'contain',
			sw: '100% auto'
		}
	},
	plugins: [
		forms,
		typography,
		iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all icon collections you have installed
      collections: getIconCollections(),
    }),
		skeleton({
			themes: {
				preset: [{
					name: "crimson",
					enhancements: true
				}]
			}
		})
	]
}  satisfies Config;

export default config
