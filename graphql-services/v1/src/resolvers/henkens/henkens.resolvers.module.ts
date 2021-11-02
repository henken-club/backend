import { Module } from "@nestjs/common";

import { HenkenEdgesResolver, HenkensResolver } from "./henkens.resolver";

import { HenkensModule } from "~/services/henkens/henkens.module";

@Module({
  imports: [HenkensModule],
  providers: [HenkensResolver, HenkenEdgesResolver],
})
export class HenkensResolversModule {}
