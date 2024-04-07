import { Injectable } from '@nestjs/common';
import { MintTokenDto } from '../dtos/mintTokens.dto';
import { ConfigService } from '@nestjs/config';
import * as chains from 'viem/chains';
import { http, parseEther, createWalletClient, WalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import * as tokenJson from '../../../../assets/MyToken.json';

@Injectable()
export class MintTokenService {
  walletClient: WalletClient;
  constructor(private configService: ConfigService) {
    this.walletClient = createWalletClient({
      account: privateKeyToAccount(
        this.configService.get<string>(
          'MINTER_WALLET_PRIVATE_KEY',
        ) as `0x${string}`,
      ),
      transport: http(this.configService.get<string>('RPC_ENDPOINT_URL')),
    });
  }
  public async mintToken(mintTokenDto: MintTokenDto): Promise<void> {
    this.walletClient.writeContract({
      account: this.walletClient.account,
      chain: chains.sepolia,
      abi: tokenJson.abi,
      address: '0x1231321312' as `0x${string}`,
      functionName: 'mint',
      args: [mintTokenDto.address, parseEther(mintTokenDto.amount.toString())],
    });
  }
}
