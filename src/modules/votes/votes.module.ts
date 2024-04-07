import { Module } from "@nestjs/common";
import { MintTokenController } from "./controller/mint.controller";
import { MintTokenService } from "./services/mintToken.service";

@Module({
  controllers: [MintTokenController],
  providers: [MintTokenService]
})
export class VotesModule {

}