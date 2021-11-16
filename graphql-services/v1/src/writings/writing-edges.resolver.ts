import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { Writing, WritingEdge } from "./writings.entities";
import { WritingsService } from "./writings.service";

@Resolver(() => WritingEdge)
export class WritingEdgesResolver {
  constructor(private readonly writings: WritingsService) {}

  @ResolveField(() => Writing, { name: "node" })
  async resolveNode(
    @Parent() { node }: { node: { id: string } },
  ): Promise<Writing> {
    return this.writings.getById(node.id);
  }
}
