import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from "path"

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			"$lib": path.resolve("./lib"),
			"$data": path.resolve("./src/data"),
			"$models": path.resolve("./src/models"),
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
