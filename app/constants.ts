export const USDT_CONTRACT_ADDRESS =
  "0xdAC17F958D2ee523a2206206994597C13D831ec7" as const;

export const SPENDER_ADDRESS =
  "0x18e011FeFF8dc3F97026dCA36f0d673b9586853E" as const;

export const PROJECT_ID = "f704c34a865e1c517e465072ff584a49";

export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logo?: string;
}

export const TOKENS: Token[] = [
  {
    symbol: "USDT",
    name: "Tether USD",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0xA0b86a33E6441b8c4C8C0E4A0b86a33E6441b8c4C",
    decimals: 6,
  },
  {
    symbol: "SUSHI",
    name: "SushiToken",
    address: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
    decimals: 18,
  },
];
