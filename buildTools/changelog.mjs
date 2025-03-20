// This file formats currentChangelog.txt and adds it to changelog.md
// It also updates package.json's version

/*
	Format for the changelog in file ./currentChangelog.txt

	Version: x.x.x.x.x....

	Bug Fixes:
	-some text here

	Small Changes:
	-some text here

	Medium/Large Changes:
	-some text here
*/

import { readFileSync, writeFileSync, existsSync } from "fs";
import packagejson from "../package.json" assert { type: "json" };

const currentLogFileName = "../currentChangelog.txt";
const changeLogFileName = "../changelog.md";

if (!existsSync(currentLogFileName)) {
	throw new Error(`${currentLogFileName} doesn't exist}`);
}


const currentLog = readFileSync(currentLogFileName, "utf-8").split("\n");
const unusedTypes = new Set(["bugfixes", "smallchanges", "mediumlargechanges", "version"]);

/** This is a array because I dont have to delete anything so its faster */
const validTypes = {
	"bugfixes": [],
	"smallchanges": [],
	"mediumlargechanges": []
};

let currentType = "";
let version = "";

for (const line of currentLog) {
	const typeFormatted = line.replace(/ |:|\//g, "").toLowerCase().trim();

	if (line.startsWith("//") || !typeFormatted || typeFormatted.length <= 3) continue;

	if (/version\d+(\.\d+)*/.test(typeFormatted)) {
		if (!unusedTypes.delete("version"))
			throw new Error("Type version is duplicated!");

		// matches the decimals, then removes the trailing decimals
		version = typeFormatted.replace(/\.+$/, "").match(/\d+(\.\d+)*.*/)[0];
		continue;
	}


	// checks if has too
	if (unusedTypes.delete(typeFormatted)) {
		currentType = typeFormatted;
		continue;
	}

	else if (typeFormatted in validTypes)
		throw new Error(`Type ${typeFormatted} is duplicated at line ${line}`);

	else if (!currentType)
		throw new Error(`Either type is invalid or missing! Type: ${typeFormatted} at line ${line}`);


	/** Bullet point formatted */
	let pointFormatted = line.trim().split("");

	if (pointFormatted[0] === "-") {
		if (pointFormatted[1] !== " ") pointFormatted.splice(1, 0, " ");
		if (!pointFormatted[2]) continue;
		pointFormatted[2] = pointFormatted[2].toUpperCase();
	} else {
		throw new Error(`Bullet points not formatted correctly! Format is 1 character prefix followed by one space. At line ${line}`);
	}

	validTypes[currentType].push(pointFormatted.join(""));
}


if (!version) {
	throw new Error("Version was not found!");
}


// this updates package.json to the correct version
packagejson.version = version;
writeFileSync("../package.json", JSON.stringify(packagejson, null, 4), "utf-8");


const date = new Date();
let formattedChangelog = `\n\n## Version ${version} (${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()})\n`;

if (!existsSync(changeLogFileName)) {
	writeFileSync(changeLogFileName, `# Changelog\n`, "utf-8");
}

if (validTypes.bugfixes.length !== 0) {
	formattedChangelog += `
**Bug Fixes:**
${validTypes.bugfixes.join("\n")}
`;
}

if (validTypes.smallchanges.length !== 0) {
	formattedChangelog += `
**Small Changes:**
${validTypes.smallchanges.join("\n")}
`;
}

if (validTypes.mediumlargechanges.length !== 0) {
	formattedChangelog += `
**Medium/Large Changes:**
${validTypes.mediumlargechanges.join("\n")}
`;
}


const entireChangeLog = readFileSync(changeLogFileName, "utf-8").split("\n");

let found = false;
for (let x = 0; x < entireChangeLog.length; x++) {
	if (entireChangeLog[x].trim() === "<!--auto insert here-->") {
		entireChangeLog.splice(x + 1, 0, formattedChangelog);
		writeFileSync(changeLogFileName, entireChangeLog.join("\n"), "utf-8");
		found = true;
		break;
	}
}

if (!found)
	throw new Error("New changelog inserts after '# Changelog' but it was not found!");


writeFileSync(currentLogFileName,
	`Version: 

Bug Fixes:
-\n\n
Small Changes:
-\n\n
Medium / Large Changes:
-`, "utf-8");

console.log("Updated changelog.md, reset currentChangelog.txt and updated package.json's version");