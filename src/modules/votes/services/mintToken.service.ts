import { Injectable } from '@nestjs/common';
import { MintTokenDto } from '../dtos/mintTokens.dto';
import { ConfigService } from '@nestjs/config';
import { sepolia } from 'viem/chains';
import {
  http,
  parseEther,
  createWalletClient,
  WalletClient,
  PublicClient,
  createPublicClient,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import * as tokenJson from '../../../../assets/MyToken.json';

@Injectable()
export class MintTokenService {
  walletClient: WalletClient;
  publicClient;
  constructor(private configService: ConfigService) {
    const rpc_endpoint = this.configService.get<string>('RPC_ENDPOINT_URL');

    this.walletClient = createWalletClient({
      account: privateKeyToAccount(
        this.configService.get<string>(
          'MINTER_WALLET_PRIVATE_KEY',
        ) as `0x${string}`,
      ),
      transport: http(rpc_endpoint),
      chain: sepolia,
    });

    this.publicClient = createPublicClient({
      chain: sepolia,
      transport: http(rpc_endpoint),
    });
  }

  public async mintToken(mintTokenDto: MintTokenDto): Promise<boolean> {
    const hash = await this.walletClient.writeContract({
      account: this.walletClient.account,
      chain: sepolia,
      abi: tokenJson.abi,
      address: this.configService.get<string>(
        'CONTRACT_ADDRESS',
      ) as `0x${string}`,
      functionName: 'mint',
      args: [mintTokenDto.address, parseEther(mintTokenDto.amount)],
    });

    await this.publicClient.waitForTransactionReceipt({
      hash,
    });

    const transaction_receipt = await this.publicClient.getTransactionReceipt({
      hash,
    });

    return true ? transaction_receipt.status === 'success' : false;
  }
}
