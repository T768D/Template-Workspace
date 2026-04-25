import type { BunPlugin, OnLoadResult } from "bun";
import { readdirSync, readFileSync, writeFileSync } from "fs";


export const bundleMimifyPlugin: BunPlugin = {
	name: "mimifyBundleHTMLCSS",
	setup(build) {
		build.onLoad({ filter: /ui\.css$/ }, () => loadCSS(true));
		build.onLoad({ filter: /ui\.html$/ }, () => loadMimifiedHTML(true));
	}
} as const;

export const bundlePlugin: BunPlugin = {
	name: "mimifyBundleHTMLCSS",
	setup(build) {
		build.onLoad({ filter: /ui\.css$/ }, () => loadCSS(false));
		build.onLoad({ filter: /ui\.html$/ }, () => loadMimifiedHTML(false));
	}
} as const;


export const mimifyHTML = (html: string, mimify: boolean) =>
	mimify ?
		html
			.replaceAll(/<!--.*-->/g, "")
			.replaceAll(/[\r\t\n]/g, "")
			.replaceAll("\" ", "\"")
		:
		html
			.replaceAll(/[\r]/g, "");


export const mimifyCSS = (css: string, mimify: boolean) =>
	mimify ?
		css
			.replaceAll(/[\n\r]|\/\*.+\*\//g, "")
			.replaceAll(/\s+/g, " ")
			.replaceAll(/ ?{ ?/g, "{")
			.replaceAll(/ ?: ?/g, ":")
			.replaceAll(/ ?; ?/g, ";")
			.replaceAll(/;\}/g, "}")
			.replaceAll(/ *\/ */g, "/")
			.replaceAll(", ", ",")
		:
		css
			.replaceAll(/\r/g, "");


function loadCSS(mimify: boolean): OnLoadResult {

	let css = "";
	function readAllCSS(dir: string) {
		const filesOrFolders = readdirSync(dir);

		for (const item of filesOrFolders) {
			const path = `${dir}/${item}`;

			if (item === "dist")
				continue;

			if (!item.includes(".")) {
				readAllCSS(path);
				continue;
			}

			if (item.endsWith(".css"))
				css += readFileSync(path, "utf8") + "\n";
		}
	}
	readAllCSS("../src");

	css = mimifyCSS(css, mimify);
	writeFileSync("../dist/main.css", css, "utf8");

	return {
		contents: `export default \`${css}\``,
		loader: "ts"
	} as const;
}

function loadMimifiedHTML(mimify: boolean): OnLoadResult {
	return {
		contents: `export default \`${mimifyHTML(readFileSync("../src/ui/ui.html", "utf8"), mimify)}\``,
		loader: "ts"
	} as const;
}