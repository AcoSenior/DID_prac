// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider((network = 'goerli'), API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
