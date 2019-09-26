#!/usr/bin/env node

// console.log("__dirname", __dirname); // global pck dir
// console.log("process.cwd()", process.cwd()); // command line dir

const { Spinner } = require('cli-spinner');

class SpinnerExt extends Spinner {
	constructor(args) {
		super(args);
		this.setSpinnerString('▁▂▃▄▅▆▇█▇▆▅▄▃▁');
	}
}

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { argv } = require('yargs');
const fs = require('fs-extra');
const path = require('path');

async function execCwd(cmd) {
	return await exec(cmd, { cwd: process.cwd() });
}

async function installTestRelatedPackages() {
	const spinner = new SpinnerExt('%s Install jest');
	spinner.start();
	await execCwd('npm i jest jest-extended --save-dev');
	spinner.stop();
	console.log("\n");
}

async function installEslint() {
	const spinner = new SpinnerExt('%s Install eslint');
	spinner.start();
	await execCwd('npm i eslint-config-ndpkg eslint --save-dev');
	spinner.stop();
	console.log("\n");
}
async function initGitRepository() {
	const spinner = new SpinnerExt('%s Init git repository');
	spinner.start();
	await execCwd('git init');
	await execCwd('git add .');
	await execCwd('git commit -m "Add first commit"');
	spinner.stop();
	console.log("\n");
}

(async function() {
	const posArgs = argv._;
	console.log("Start new project.");
	if (posArgs.includes('new')) {
		console.log("Copy blueprint");
		await copyBlueprint();
	} else {
		return;
	}
	await initGitRepository();
	// --no-eslint
	await installEslint();
	await installTestRelatedPackages();
	console.log("\n New project created.");
})();

async function copyBlueprint() {
	try {
		fs.copySync(path.join(__dirname, 'blueprint'), process.cwd());
		console.log('Blueprint copied.');
	} catch (err) {
		console.error(err);
	}
}
