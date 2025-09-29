import { Address, Hex } from "viem";

/**
 * {
 *  "requestId":"389eea12-a3fd-4f6c-b073-78f11409da54",
 * "approval":{
 * "to":"0xdAC17F958D2ee523a2206206994597C13D831ec7",
 * "value":"0x00",
 * "from":"0x5EeD72Ccc5A6118912571c0d3428f4B149697374",
 * "data":"0x095ea7b3000000000000000000000000000000000022d473030f116ddee9f6b43ac78ba3ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
 * "maxFeePerGas":"724996781",
 * "maxPriorityFeePerGas":"483245053",
 * "gasLimit":"56608",
 * "chainId":1
 * },
 * "cancel":null,
 * "gasFee":"41040617778848",
 * "gasEstimates":[{"type":"eip1559","strategy":{"baseFeeMultiplier":1,"maxPriorityFeeGwei":9,"minPriorityFeeGwei":2,"baseFeeHistoryWindow":20,"limitInflationFactor":1.15,"priceInflationFactor":1.5,"minPriorityFeeRatioOfBaseFee":0.2,"percentileThresholdFor1559Fee":75,"thresholdToInflateLastBlockBaseFee":0.75},"gasLimit":"56608","gasFee":"41040617778848","maxFeePerGas":"724996781","maxPriorityFeePerGas":"483245053"}]
 * }
 *
 */

type Approval = {
  to: Address;
  value: string;
  from: Address;
  data: Hex;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  gasLimit: string;
  chainId: number;
};

type GasEstimate = {
  type: string;
  strategy: {
    baseFeeMultiplier: number;
    maxPriorityFeeGwei: number;
    minPriorityFeeGwei: number;
    baseFeeHistoryWindow: number;
    limitInflationFactor: number;
    priceInflationFactor: number;
    minPriorityFeeRatioOfBaseFee: number;
    percentileThresholdFor1559Fee: number;
    thresholdToInflateLastBlockBaseFee: number;
  };
  gasLimit: string;
  gasFee: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
};

interface CheckApprovalResponse {
  requestId: string;
  approval: Approval | null;
  cancel: null;
  gasFee: string;
  gasEstimates: GasEstimate[];
}

export const checkApproval = async (
  walletAddress: Address,
  tokenAddress: Address
): Promise<CheckApprovalResponse> => {
  const res = await fetch(`/api/check_approval`, {
    method: "POST",
    body: JSON.stringify({
      walletAddress,
      tokenAddress,
    }),
  });
  const data = await res.json();
  return data;
};
