import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const params = await request.json();

  const amount = "306026175208549401";

  const body = {
    token: params.tokenAddress,
    amount,
    chainId: 1,
    tokenOut: "0x0000000000000000000000000000000000000000",
    gasStrategies: [
      {
        baseFeeMultiplier: 1,
        maxPriorityFeeGwei: 9,
        minPriorityFeeGwei: 2,
        baseFeeHistoryWindow: 20,
        limitInflationFactor: 1.15,
        priceInflationFactor: 1.5,
        displayLimitInflationFactor: 1,
        minPriorityFeeRatioOfBaseFee: 0.2,
        percentileThresholdFor1559Fee: 75,
        thresholdToInflateLastBlockBaseFee: 0.75,
      },
    ],
    walletAddress: params.walletAddress,
    includeGasInfo: true,
    tokenOutChainId: 1,
  };

  const res = await fetch(
    "https://trading-api-labs.interface.gateway.uniswap.org/v1/check_approval",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
        "x-api-key": "JoyCGj29tT4pymvhaGciK4r1aIPvqW6W53xT1fwo",
        "x-app-version": "",
        "x-request-source": "uniswap-web",
        "x-uniquote-enabled": "false",
        "x-universal-router-version": "2.0",
        "x-viem-provider-enabled": "false",
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to check approval" },
      { status: 500 }
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}
