import { Controller, Post } from '@nestjs/common'
import { MintTokenService } from '../services/mintToken.service'
import { MintTokenDto } from '../dtos/mintTokens.dto'

@Controller('/token')
export class MintTokenController {
  constructor(
    private readonly mintTokenService: MintTokenService
  ) {}

  @Post('/mint')
  public async mintToken(mintTokenDto: MintTokenDto): Promise<void> {
    await this.mintTokenService.mintToken(mintTokenDto)
  }
}