import { Field, ID, ObjectType } from "@nestjs/graphql";

import { ContentType } from "./content.entities";
import { Node } from "./pagination.entities";

@ObjectType("TempContent", { implements: () => [Node] })
export class TempContent implements Node {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  name!: string;

  @Field((type) => ContentType, { name: "type" })
  type!: ContentType;
}
