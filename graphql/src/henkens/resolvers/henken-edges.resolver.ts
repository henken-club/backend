import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { Henken, HenkenEdge } from "../henkens.entities";
import { HenkensService } from "../henkens.service";

@Resolver(() => HenkenEdge)
export class HenkenEdgesResolver {
  constructor(private readonly henkens: HenkensService) {}

  @ResolveField((type) => Henken, { name: "node" })
  resolveNode(@Parent() { node }: HenkenEdge): Observable<Henken> {
    return this.henkens.getById(node.id);
  }
}
