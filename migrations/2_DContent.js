// eslint-disable-next-line no-undef
const DContent = artifacts.require("DContent");

module.exports = (deployer) => {
	deployer.deploy(DContent);
};
