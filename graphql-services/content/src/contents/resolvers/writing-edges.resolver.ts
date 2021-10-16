import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import {
  WritingEdgeEntity,
  WritingEntity,
} from "~/contents/entities/writings.entities";
import { WritingsService } from "~/contents/services/writings.service";

@Resolver(() => WritingEdgeEntity)
export class WritingEdgesResolver {
  constructor(private readonly writings: WritingsService) {}

  @ResolveField(() => WritingEntity, { name: "node" })
  async resolveNode(
    @Parent() { node }: { node: { id: string } },
  ): Promise<WritingEntity> {
    return this.writings.getById(node.id);
  }
}
