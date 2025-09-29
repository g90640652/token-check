"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { Address } from "viem";
import { useState } from "react";
import { SPENDER_ADDRESS, TOKENS, Token } from "./constants";
import ApproveButton from "./approve-button";
import TokenSelector from "./token-selector";
import Allowance from "./allowance";
import Balance from "./balance";

export default function Home() {
  const { open } = useAppKit();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const [selectedToken, setSelectedToken] = useState<Token>(TOKENS[0]); // Default to USDT
  const [spenderAddress, setSpenderAddress] =
    useState<Address>(SPENDER_ADDRESS); // Default to SPENDER_ADDRESS

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Web3 Wallet</h1>
            <p className="text-white/70">Connect your wallet to get started</p>
          </div>

          {!isConnected ? (
            /* Connect Wallet State */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Connect Your Wallet
                </h2>
              </div>

              <button
                onClick={() => open()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Connect Wallet
              </button>
            </div>
          ) : (
            /* Connected State */
            <div className="space-y-6">
              {/* Token Selector */}
              <TokenSelector
                selectedToken={selectedToken}
                onTokenSelect={setSelectedToken}
              />
              {/* Spender Address Input */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="mb-1">
                  <p className="text-white/60 text-sm mb-2">Spender Address</p>
                  <input
                    type="text"
                    value={spenderAddress}
                    onChange={(e) =>
                      setSpenderAddress(e.target.value as Address)
                    }
                    placeholder="Enter spender address (0x...)"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <Balance selectedToken={selectedToken} userAddress={address!} />
              <Allowance
                selectedToken={selectedToken}
                userAddress={address!}
                spenderAddress={spenderAddress}
              />

              {address && (
                <ApproveButton
                  address={address}
                  token={selectedToken}
                  spenderAddress={spenderAddress}
                />
              )}
              {/* Disconnect Button */}
              <div>
                <button
                  onClick={() => disconnect()}
                  className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold py-3 px-6 rounded-2xl transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
                >
                  Disconnect Wallet
                </button>
                <div className="text-gray-400 text-sm text-center mt-4">
                  {address}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
