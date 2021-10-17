import { Field, Int, InterfaceType } from "@nestjs/graphql";

import { Edge } from "./edge.interface";
import { PageInfoEntity } from "./page-info.entity";

@InterfaceType()
export abstract class Connection {
  @Field((type) => [Edge])
  edges!: Edge[];

  @Field((type) => PageInfoEntity)
  pageInfo!: PageInfoEntity;

  @Field((type) => Int)
  totalCount!: number;
}
