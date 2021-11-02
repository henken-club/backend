import { NotFoundException } from "@nestjs/common";
import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";

import { FindHenkenArgs, FindHenkenPayload } from "./dto/find-henken.dto";

import { Henken, HenkenEdge } from "~/entities/henken.entities";
import { HenkensService } from "~/services/henkens/henkens.service";

@Resolver(() => Henken)
export class HenkensResolver {
  constructor(private readonly henkens: HenkensService) {}

  @Query(() => Henken, { name: "henken" })
  async getHenken(
    @Args("id", { type: () => ID }) id: string,
  ): Promise<Henken> {
    const result = await this.henkens.getById(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Query(() => FindHenkenPayload, { name: "findHenken" })
  async findHenken(
    @Args({ type: () => FindHenkenArgs }) { id }: FindHenkenArgs,
  ): Promise<FindHenkenPayload> {
    const result = await this.henkens.findById(id);

    return { henken: result };
  }
}

@Resolver(() => HenkenEdge)
export class HenkenEdgesResolver {
  constructor(private readonly henkens: HenkensService) {}

  @ResolveField((type) => Henken, { name: "node" })
  async resolveNode(
    @Parent() { node }: HenkenEdge,
  ): Promise<Henken> {
    return this.henkens.getById(node.id);
  }
}
