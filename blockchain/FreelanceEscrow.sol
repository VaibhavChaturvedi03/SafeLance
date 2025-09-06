// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FreelanceEscrow {
    struct Job {
        uint256 id;
        address payable client;
        address payable freelancer;
        uint256 amount;        // total escrowed amount
        uint256 deadline;      // project deadline (timestamp)
        bool funded;
        bool completed;
        bool cancelled;
    }

    address public platformWallet;
    uint256 public platformFee; // in basis points (200 = 2%)

    mapping(uint256 => Job) public jobs;
    uint256 public jobCounter;

    event JobCreated(uint256 indexed jobId, address client, address freelancer, uint256 amount);
    event JobApproved(uint256 indexed jobId, uint256 freelancerAmount, uint256 platformFee);
    event JobRejected(uint256 indexed jobId, uint256 refundAmount, uint256 platformFee);
    event JobCancelled(uint256 indexed jobId);

    constructor(address _platformWallet, uint256 _platformFee) {
        platformWallet = _platformWallet;
        platformFee = _platformFee; // e.g., 200 = 2%
    }

    // Client creates a job and deposits ETH
    function createJob(address payable _freelancer, uint256 _deadline) external payable {
        require(msg.value >= 0, "Must fund job with ETH");

        jobCounter++;
        jobs[jobCounter] = Job({
            id: jobCounter,
            client: payable(msg.sender),
            freelancer: _freelancer,
            amount: msg.value,
            deadline: _deadline,
            funded: true,
            completed: false,
            cancelled: false
        });

        emit JobCreated(jobCounter, msg.sender, _freelancer, msg.value);
    }

    // Client approves work -> pay freelancer (98%) and platform (2%)
    function approveWork(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.client, "Only client can approve");
        require(job.funded, "Job not funded");
        require(!job.completed, "Already completed");
        require(!job.cancelled, "Job cancelled");

        job.completed = true;

        uint256 fee = (job.amount * platformFee) / 10000;
        uint256 payout = job.amount - fee;

        // Send to freelancer
        (bool successFreelancer, ) = job.freelancer.call{value: payout}("");
        require(successFreelancer, "Freelancer payment failed");

        // Send fee to platform
        (bool successPlatform, ) = platformWallet.call{value: fee}("");
        require(successPlatform, "Platform fee payment failed");

        emit JobApproved(_jobId, payout, fee);
    }

    // Client rejects work -> refund client (98%) and platform still takes 2%
    function rejectWork(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.client, "Only client can reject");
        require(job.funded, "Job not funded");
        require(!job.completed, "Already completed");
        require(!job.cancelled, "Job cancelled");

        job.cancelled = true;

        uint256 fee = (job.amount * platformFee) / 10000;
        uint256 refund = job.amount - fee;

        // Refund client (minus fee)
        (bool successClient, ) = job.client.call{value: refund}("");
        require(successClient, "Refund to client failed");

        // Send fee to platform
        (bool successPlatform, ) = platformWallet.call{value: fee}("");
        require(successPlatform, "Platform fee payment failed");

        emit JobRejected(_jobId, refund, fee);
    }

    // Fallback in case ETH is sent directly
    receive() external payable {}
}
