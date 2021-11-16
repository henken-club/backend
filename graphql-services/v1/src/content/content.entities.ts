import { createUnionType, registerEnumType } from "@nestjs/graphql";

import { Author } from "~/authors/author.entities";
import { Book } from "~/books/books.entities";
import { BookSeries } from "~/bookseries/bookseries.entities";

export enum ContentType {
  BOOK,
  BOOK_SERIES,
  AUTHOR,
}
registerEnumType(ContentType, { name: "ContentType" });

export const ContentUnion = createUnionType({
  name: "ContentUnion",
  types: () => [Book, Author, BookSeries],
  resolveType({ type }: { type: ContentType }) {
    switch (type) {
      case ContentType.BOOK:
        return Book;
      case ContentType.BOOK_SERIES:
        return BookSeries;
      case ContentType.AUTHOR:
        return Author;
    }
    return null;
  },
});
