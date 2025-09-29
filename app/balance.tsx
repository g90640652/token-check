"use client";

import { useReadContract } from "wagmi";
import { Address, erc20Abi, formatUnits } from "viem";
import { Token } from "./constants";

interface BalanceProps {
  selectedToken: Token;
  userAddress: Address;
  className?: string;
}

export default function Balance({
  selectedToken,
  userAddress,
  className = "",
}: BalanceProps) {
  // Check token balance for the user address
  const { data: tokenBalance, isLoading: tokenBalanceLoading } =
    useReadContract({
      address: selectedToken.address as `0x${string}`,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [userAddress],
    });

  const formatTokenBalance = (
    balance: bigint | undefined | unknown,
    decimals: number
  ) => {
    if (!balance || typeof balance !== "bigint") return "0.00";
    return formatUnits(balance, decimals);
  };

  return (
    <div className={`bg-white/5 rounded-2xl p-4 border border-white/10 ${className}`}>
      <p className="text-white/60 text-sm mb-3">
        {selectedToken.symbol} Balance
      </p>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            {tokenBalanceLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <p className="text-white font-semibold text-lg">
                {formatTokenBalance(tokenBalance, selectedToken.decimals)}{" "}
                {selectedToken.symbol}
              </p>
            )}
          </div>
        </div>

        {/* Token icon */}
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {selectedToken.symbol.charAt(0)}
          </span>
        </div>
      </div>
    </div>
  );
}
