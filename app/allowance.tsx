"use client";

import { useReadContract } from "wagmi";
import { Address, formatUnits } from "viem";
import { Token } from "./constants";

interface AllowanceProps {
  selectedToken: Token;
  userAddress: Address;
  spenderAddress: Address;
  className?: string;
}

export default function Allowance({
  selectedToken,
  userAddress,
  spenderAddress,
  className = "",
}: AllowanceProps) {
  // Check allowance for current user
  const { data: allowance, isLoading: allowanceLoading } = useReadContract({
    address: selectedToken.address as `0x${string}`,
    abi: [
      {
        constant: true,
        inputs: [
          { name: "_owner", type: "address" },
          { name: "_spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ name: "", type: "uint256" }],
        type: "function",
      },
    ],
    functionName: "allowance",
    args: [userAddress, spenderAddress],
    query: {
      enabled: !!userAddress,
    },
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
        {selectedToken.symbol} Allowance
      </p>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            {allowanceLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                {allowance &&
                typeof allowance === "bigint" &&
                allowance > BigInt(0) ? (
                  <p className="text-white font-semibold text-lg">
                    {formatTokenBalance(allowance, selectedToken.decimals)}{" "}
                    {selectedToken.symbol}
                  </p>
                ) : (
                  <p className="text-white font-semibold text-lg">No allowance set</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Token icon */}
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {selectedToken.symbol.charAt(0)}
          </span>
        </div>
      </div>
    </div>
  );
}
