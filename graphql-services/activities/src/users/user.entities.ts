import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("User")
@Directive("@key(fields: \"id\")")
export class UserEntity {
  @Field((type) => ID)
  @Directive("@external")
  id!: string;
}
