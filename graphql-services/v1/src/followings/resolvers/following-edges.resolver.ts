import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { Following, FollowingEdge } from "../followings.entities";
import { FollowingsService } from "../followings.service";

@Resolver(() => FollowingEdge)
export class FollowingEdgesResolver {
  constructor(private readonly followings: FollowingsService) {}

  @ResolveField((type) => Following, { name: "node" })
  resolveNode(@Parent() { node }: FollowingEdge): Observable<Following> {
    return this.followings.getById(node.id);
  }
}
