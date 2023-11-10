import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import Ufonts from 'unplugin-fonts/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte'
		}),
		Ufonts({
			google: {
				preconnect: false,
				display: 'block',
				injectTo: 'head',
				families: [
					{
						name: 'Josefin Sans',
						styles: 'wght@100;200;300;400;500;600;700;800;900'
					},
					{
						name: 'Overpass',
						styles: 'wght@100;200;300;400;500;600;700;800;900'
					}
				]
			}
		})
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use 'src/lib/scss/variables.scss' as *;`
			}
		}
	}
});
