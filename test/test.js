const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const writeJsonFile = require('write-json-file');
const readPackageUp = require('read-pkg-up');
const pkgDir = require('pkg-dir');
// 	const packageFile = await readPkgUp();

// 	result = await exec('git init');

async function initPackage() {
	let result;
	result = await execCwd('npm init -y');
}

async function installEslint() {
	let result;
	result = await execCwd('npm i eslint --save-dev');
	result = await execCwd('npm i eslint-config-gamma --save-dev');
}

async function installTestRelatedPackages() {
	let result;
	result = await execCwd('npm i jest-extended --save-dev');
	result = await execCwd('npm i jest --save-dev');
}

// 	const packageFile = await readPkgUp();
async function addScriptsToJSON() {
	const packageFile = await readPackageUp();
	const applicationRoot = pkgDir.sync(__dirname);
	const packageJSONPath = path.join(applicationRoot, 'package.json');
	packageFile.package.scripts = {
		test: "jest --watchAll",
		unit: "jest -c jest.config.unit.js",
		integration: "jest -c jest.config.integration.js",
	};
	await writeJsonFile(packageJSONPath, packageFile.package);
}

async function execCwd(cmd) {
	return await exec(cmd, { cwd: process.cwd() });
}

async function initGitRepository() {
	result = await execCwd('git init',);
	result = await execCwd('git checkout -b development');
}
async function makeTestDirs() {
	result = await execCwd('mdir test');
	result = await execCwd('mdir unit');
}

