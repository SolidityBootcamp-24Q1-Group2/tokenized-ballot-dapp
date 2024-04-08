import { Injectable } from '@nestjs/common';
import { MintTokenDto } from '../dtos/mintTokens.dto';
import { ConfigService } from '@nestjs/config';
import * as chains from 'viem/chains';
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
  publicClient: PublicClient;
  constructor(private configService: ConfigService) {
    const rpc_endpoint = this.configService.get<string>('RPC_ENDPOINT_URL');
    const transport = http(rpc_endpoint);
    console.log(rpc_endpoint);

    this.walletClient = createWalletClient({
      account: privateKeyToAccount(
        this.configService.get<string>(
          'MINTER_WALLET_PRIVATE_KEY',
        ) as `0x${string}`,
      ),
      transport: transport,
      chain: chains.sepolia,
    });

    this.publicClient = createPublicClient({
      chain: chains.sepolia,
      transport: transport,
    });
  }
  public async mintToken(mintTokenDto: MintTokenDto): Promise<boolean> {
    const hash = await this.walletClient.writeContract({
      account: this.walletClient.account,
      chain: chains.sepolia,
      abi: tokenJson.abi,
      address: this.configService.get<string>(
        'CONTRACT_ADDRESS',
      ) as `0x${string}`,
      functionName: 'mint',
      args: [mintTokenDto.address, parseEther(mintTokenDto.amount.toString())],
    });

    const transaction_receipt = await this.publicClient.getTransactionReceipt({
      hash,
    });

    console.log(transaction_receipt);

    return true;
  }
}
