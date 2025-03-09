import { builtinModules } from 'node:module'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { dependencies, name } from './package.json'

/**
 * Core modules could be imported in two ways, with or without the `node:`
 * specifier, so we create a list of all possible core modules.
 */
const allCoreModules = builtinModules.flatMap(moduleName => [
	moduleName,
	`node:${moduleName}`
])

const globalsForAllCoreModules = allCoreModules.reduce(
	(acc, moduleName) => {
		const [prefix, namePart] = moduleName.split(':')
		acc[moduleName] = prefix === 'node' ? namePart : moduleName
		return acc
	},
	{} as Record<string, string>
)

/**
 * Extract the external dependencies but keep monorepo workspace packages as part of
 * the bundle.
 */
const externalDependencies = Object.entries(dependencies)
	.filter(([, value]) => value !== 'workspace:*')
	.map(([key]) => key)

export default defineConfig({
	build: {
		target: 'node22',
		lib: {
			entry: resolve(__dirname, './index.ts'),
			name,
			fileName: 'index',
			formats: ['es']
		},
		sourcemap: true,
		outDir: 'dist',
		rollupOptions: {
			external: [...allCoreModules, ...externalDependencies],
			output: {
				globals: globalsForAllCoreModules,
				inlineDynamicImports: true
			}
		}
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './')
		}
	}
})
