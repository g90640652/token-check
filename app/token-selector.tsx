"use client";

import { useState } from "react";
import { Token, TOKENS } from "./constants";

interface TokenSelectorProps {
  selectedToken: Token;
  onTokenSelect: (token: Token) => void;
  className?: string;
}

export default function TokenSelector({
  selectedToken,
  onTokenSelect,
  className = "",
}: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {selectedToken.symbol.charAt(0)}
            </span>
          </div>
          <div className="text-left">
            <p className="text-white font-semibold">{selectedToken.symbol}</p>
            <p className="text-white/60 text-xs">{selectedToken.name}</p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-white/60 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl z-50 max-h-60 overflow-y-auto">
          {TOKENS.map((token) => (
            <button
              key={token.address}
              onClick={() => {
                onTokenSelect(token);
                setIsOpen(false);
              }}
              className={`w-full p-4 hover:bg-white/10 transition-colors duration-200 flex items-center space-x-3 ${
                selectedToken.address === token.address
                  ? "bg-white/10"
                  : ""
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {token.symbol.charAt(0)}
                </span>
              </div>
              <div className="text-left flex-1">
                <p className="text-white font-semibold">{token.symbol}</p>
                <p className="text-white/60 text-xs">{token.name}</p>
              </div>
              {selectedToken.address === token.address && (
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
