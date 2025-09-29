"use client";

import { useSendTransaction } from "wagmi";
import { Address, encodeFunctionData, erc20Abi, maxUint256 } from "viem";
import { useQuery } from "@tanstack/react-query";
import { Token } from "./constants";
import { checkApproval } from "./api";

interface ApproveButtonProps {
  address: Address;
  token: Token;
  spenderAddress: Address;
  children?: React.ReactNode;
}

export default function ApproveButton({
  address,
  token,
  spenderAddress,
  children,
}: ApproveButtonProps) {
  const {
    sendTransaction,
    isPending: isSending,
    isError: isSendError,
    error: sendError,
  } = useSendTransaction();

  const { data, isLoading } = useQuery({
    queryKey: ["approval", address, token.address, spenderAddress],
    queryFn: () => checkApproval(address, token.address as `0x${string}`),
    enabled: !!address,
  });

  const handleApprove = async () => {
    const approval = data?.approval;
    if (!approval) {
      return;
    }

    const functionData = encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [spenderAddress, maxUint256],
    });

    sendTransaction({
      to: approval.to,
      data: functionData,
      value: BigInt(approval.value),
      maxFeePerGas: BigInt(approval.maxFeePerGas),
      maxPriorityFeePerGas: BigInt(approval.maxPriorityFeePerGas),
      gas: BigInt(approval.gasLimit),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 text-white font-medium">
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        <span>Checking approval...</span>
      </div>
    );
  }

  return (
    <>
      {isSendError && (
        <div className="p-4 rounded-lg bg-red-500/50 text-sm text-red-300">
          {sendError.message}
        </div>
      )}
      <button
        onClick={() => handleApprove()}
        disabled={isSending}
        className={`
        w-full bg-gradient-to-r from-blue-500 to-cyan-500 
        hover:from-blue-600 hover:to-cyan-600 
        disabled:from-gray-500 disabled:to-gray-600 
        disabled:cursor-not-allowed 
        text-white font-semibold py-3 px-6 rounded-2xl 
        transition-all duration-300 transform 
        hover:scale-105 hover:shadow-lg 
        active:scale-95 
        disabled:transform-none disabled:shadow-none
      `}
      >
        {isSending ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Approving...</span>
          </div>
        ) : isSendError ? (
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Approval Failed</span>
          </div>
        ) : (
          children || `Approve ${token.symbol}`
        )}
      </button>
    </>
  );
}
