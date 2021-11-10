import { ContentType as GrpcContentType } from "~/protogen/content/type";

export { ContentType as PrismaContentType } from "@prisma/client";

export { ContentType as GrpcContentType } from "~/protogen/content/type";

export type ContentType = "author" | "book" | "book_series";

export type HenkenEntity =
  & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    fromUserId: string;
    toUserId: string;
    comment: string;
    answerId: string | null;
  }
  & (
    | { tempContent: { id: string } }
    | { realContent: { id: string; type: ContentType } }
  );

export type GrpcHenkenEntity =
  & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    fromUserId: string;
    comment: string;
    toUserId: string;
    answerId: string | undefined;
  }
  & ({
    content: {
      $case: "tempContent";
      tempContent: { id: string };
    };
  } | {
    content: {
      $case: "realContent";
      realContent: { id: string; type: GrpcContentType };
    };
  });
