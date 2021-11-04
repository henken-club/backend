import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { map, Observable } from "rxjs";

import { FindHenkenArgs, FindHenkenPayload } from "./dto/find-henken.dto";

import { Henken, HenkenEdge } from "~/entities/henken.entities";
import { HenkensService } from "~/services/henkens/henkens.service";

@Resolver(() => Henken)
export class HenkensResolver {
  constructor(private readonly henkens: HenkensService) {}

  @Query(() => Henken, { name: "henken" })
  getHenken(
    @Args("id", { type: () => ID }) id: string,
  ): Observable<Henken> {
    return this.henkens.getById(id);
  }

  @Query(() => FindHenkenPayload, { name: "findHenken" })
  findHenken(
    @Args({ type: () => FindHenkenArgs }) { id }: FindHenkenArgs,
  ): Observable<FindHenkenPayload> {
    return this.henkens.findById(id).pipe(map((henken) => ({ henken })));
  }
}

@Resolver(() => HenkenEdge)
export class HenkenEdgesResolver {
  constructor(private readonly henkens: HenkensService) {}

  @ResolveField((type) => Henken, { name: "node" })
  resolveNode(@Parent() { node }: HenkenEdge): Observable<Henken> {
    return this.henkens.getById(node.id);
  }
}
