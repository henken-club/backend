export type ContentDocument = {
  id: string;
  type: "book" | "bookseries" | "author";
};

export type AuthorDocument = { id: string; name: string };
export type BookDocument = { id: string; name: string };
export type BookSeriesDocument = { id: string; name: string };
