import { ethers } from "ethers";

import contractABI from "abhi btata hu";

const CONTRACT_ADDRESS = "abhi bhej dunga";

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
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
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
  const tx = await contract.requestDeadlineExtension(jobId, newDeadline);
  await tx.wait();
  console.log("Extension requested:", tx.hash);
}

// Approve extension (client only)
export async function approveExtension(jobId) {
  const contract = await getContract();
  const tx = await contract.approveDeadlineExtension(jobId);
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
