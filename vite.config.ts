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
	preview: {
    port: 3006,
  },
	server: {
		fs: {
			allow: ['CHANGELOG.md']
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
