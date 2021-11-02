import { Field, ID, InterfaceType } from "@nestjs/graphql";

import { Author } from "./author.entities";
import { Book } from "./books.entities";
import { BookSeries } from "./bookseries.entities";

@InterfaceType("Content", {
  resolveType(value: Content) {
    switch (value.type) {
      case "BOOK":
        return Book;
      case "BOOK_SERIES":
        return BookSeries;
      case "AUTHOR":
        return Author;
    }
    return null;
  },
})
export abstract class Content {
  @Field((type) => ID)
  id!: string;

  type!: "BOOK" | "BOOK_SERIES" | "AUTHOR";
}
