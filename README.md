# Safelance 🛡️

**Safelance** is a **Web3-powered freelance escrow platform** built on **Ethereum** that ensures **trust, transparency, and secure payments** between clients and freelancers.  
By leveraging **smart contracts**, Safelance automates payments, manages disputes, and protects both parties in the freelancing lifecycle.  

---

## 🚀 Features

- 🔒 **Escrow Payments** – Funds are securely locked in smart contracts until job completion.  
- ⚡ **Automated Payouts** – Instant release of funds after client approval (minus a small platform fee).  
- 🛡️ **Dispute Resolution** – Admin/multisig wallet ensures fair conflict handling.  
- ⏳ **Deadline Extensions** – Flexible contract extensions without risking funds.  
- 📉 **Low Fees** – Only ~2% platform fee (vs 10–20% on traditional platforms).  
- 🌐 **Decentralized File Storage** – Deliverables stored securely on IPFS.  
- ⭐ **Reputation & Ratings** – Clients and freelancers build trust through ratings.  

---

## 🛠️ Tech Stack

- **Blockchain**: Ethereum (ETH)  
- **Smart Contracts**: Solidity  
- **Framework**: Hardhat  
- **Frontend**: React.js + ethers.js + MetaMask  
- **Storage**: IPFS (for decentralized deliverables)  
- **Testnet**: Sepolia  

---

## 📂 Smart Contract Functions

- `createJob()` – Create and fund a job  
- `acceptJob()` – Freelancer accepts  
- `submitWork(ipfsHash)` – Submit deliverables  
- `approveWork()` – Client approves & releases payment  
- `cancelJob()` – Cancel with refunds/penalties  
- `raiseDispute()` – Start dispute process  
- `resolveDispute()` – Admin resolves dispute  
- `extendDeadline()` – Extend project deadline  

---

## ⚡ How Safelance Works

1. Client **creates & funds** job → ETH locked in escrow  
2. Freelancer **accepts** job → Work begins  
3. Freelancer **submits** work with IPFS hash  
4. Client **approves** → Payment auto-released  
5. **Dispute (optional)** → Admin resolves conflict  
6. **Cancellation (optional)** → Refunds or compensation applied  

---

## 📦 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/safelance.git
cd safelance

