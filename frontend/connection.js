import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";

const contractABI = [
  {
    "inputs": [{ "internalType": "uint256", "name": "_jobId", "type": "uint256" }],
    "name": "approveExtension",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_jobId", "type": "uint256" }],
    "name": "approveWork",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address payable", "name": "_freelancer", "type": "address" },
      { "internalType": "uint256", "name": "_deadline", "type": "uint256" }
    ],
    "name": "createJob",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_platformWallet", "type": "address" },
      { "internalType": "uint256", "name": "_platformFee", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  { "stateMutability": "payable", "type": "receive" },
  {
    "inputs": [{ "internalType": "uint256", "name": "_jobId", "type": "uint256" }],
    "name": "rejectExtension",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_jobId", "type": "uint256" }],
    "name": "rejectWork",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_jobId", "type": "uint256" },
      { "internalType": "uint256", "name": "_newDeadline", "type": "uint256" }
    ],
    "name": "requestExtension",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Connect to MetaMask 
async function getProviderAndSigner() {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return { provider, signer };
}

// Get contract instance
async function getContract() {
  const { signer } = await getProviderAndSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
}

// Create a job
export async function createJob(freelancer, deadline, amountInEth) {
  const contract = await getContract();
  const tx = await contract.createJob(
    freelancer,
    deadline,
    { value: ethers.parseEther(amountInEth) }
  );
  await tx.wait();
  console.log("Job created:", tx.hash);
}

// Request deadline extension
export async function requestExtension(jobId, newDeadline) {
  const contract = await getContract();
  const tx = await contract.requestExtension(jobId, newDeadline);
  await tx.wait();
  console.log("Extension requested:", tx.hash);
}

// Approve extension (client only)
export async function approveExtension(jobId) {
  const contract = await getContract();
  const tx = await contract.approveExtension(jobId);
  await tx.wait();
  console.log("Extension approved:", tx.hash);
}

// Approve work (client -> pay freelancer)
export async function approveWork(jobId) {
  const contract = await getContract();
  const tx = await contract.approveWork(jobId);
  await tx.wait();
  console.log("Work approved:", tx.hash);
}

// Reject work (refund client, fee goes to platform)
export async function rejectWork(jobId) {
  const contract = await getContract();
  const tx = await contract.rejectWork(jobId);
  await tx.wait();
  console.log("Work rejected:", tx.hash);
}

// Cancel job (before completion)
export async function cancelJob(jobId) {
  const contract = await getContract();
  const tx = await contract.cancelJob(jobId);
  await tx.wait();
  console.log("Job cancelled:", tx.hash);
}

