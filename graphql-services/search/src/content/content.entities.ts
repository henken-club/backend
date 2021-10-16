import {
  Directive,
  Field,
  ID,
  InterfaceType,
  ObjectType,
} from "@nestjs/graphql";

export type ContentType = "book" | "bookseries" | "author";

@InterfaceType("SearchContent", {
  resolveType({ type }: Content) {
    switch (type) {
      case "book":
        return BookEntity;
      case "bookseries":
        return BookSeriesEntity;
      case "author":
        return AuthorEntity;
    }
    return null;
  },
})
export abstract class Content {
  @Field((type) => ID)
  id!: string;

  type!: ContentType;
}

@ObjectType("Author", { implements: () => [Content] })
@Directive("@extends")
@Directive("@key(fields: \"id\")")
export class AuthorEntity implements Content {
  @Field((type) => ID)
  @Directive("@external")
  id!: string;

  type!: "author";
}

@ObjectType("Book", { implements: () => [Content] })
@Directive("@extends")
@Directive("@key(fields: \"id\")")
export class BookEntity implements Content {
  @Field((type) => ID)
  @Directive("@external")
  id!: string;

  type!: "book";
}

@ObjectType("BookSeries", { implements: () => [Content] })
@Directive("@extends")
@Directive("@key(fields: \"id\")")
export class BookSeriesEntity implements Content {
  @Field((type) => ID)
  @Directive("@external")
  id!: string;

  type!: "bookseries";
}
