import { Parent, ResolveField, Resolver } from "@nestjs/graphql";

import { Writing, WritingEdge } from "~/entities/writings.entities";
import { WritingsService } from "~/services/writings/writings.service";

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