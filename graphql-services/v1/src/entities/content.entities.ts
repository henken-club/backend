import { Field, ID, InterfaceType } from "@nestjs/graphql";

import { Author } from "./author.entities";
import { Book } from "./books.entities";
import { BookSeries } from "./bookseries.entities";

export enum ContentType {
  BOOK,
  BOOK_SERIES,
  AUTHOR,
}

@InterfaceType("Content", {
  resolveType(value: Content) {
    switch (value.type) {
      case ContentType.BOOK:
        return Book;
      case ContentType.BOOK_SERIES:
        return BookSeries;
      case ContentType.AUTHOR:
        return Author;
    }
    return null;
  },
})
export abstract class Content<TType extends ContentType = ContentType> {
  @Field((type) => ID)
  id!: string;

  type!: TType;
}
