import { Injectable } from '@nestjs/common';
import { MintTokenDto } from '../dtos/mintTokens.dto';

@Injectable()
export class MintTokenService {
  public async mintToken(mintTokenDto: MintTokenDto): Promise<void> {
    // Mint token logic
  }
}