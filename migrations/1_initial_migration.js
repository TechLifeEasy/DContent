// eslint-disable-next-line no-undef
const Migrations = artifacts.require("Migrations");
// eslint-disable-next-line no-undef
const DContent = artifacts.require("DContent");

module.exports = function (deployer) {
	deployer.deploy(Migrations);
	deployer.deploy(DContent);
};
