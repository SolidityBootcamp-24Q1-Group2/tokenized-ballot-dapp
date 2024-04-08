import { Body, Controller, Post } from '@nestjs/common';
import { MintTokenService } from '../services/mintToken.service';
import { MintTokenDto } from '../dtos/mintTokens.dto';

@Controller('/token')
export class MintTokenController {
  constructor(private readonly mintTokenService: MintTokenService) {}

  @Post('/mint')
  public async mintToken(
    @Body() mintTokenDto: MintTokenDto,
  ): Promise<{ result: boolean }> {
    console.log('mintTokenDto', mintTokenDto)
    const result = await this.mintTokenService.mintToken(mintTokenDto);

    return { result };
  }
}
