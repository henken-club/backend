import { Inject, Injectable } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { map, Observable } from "rxjs";

import { Author } from "~/entities/author.entities";
import { ContentType } from "~/entities/content.entities";
import { AUTHOR_SERVICE_NAME, AuthorClient } from "~/protogen/content/author";

@Injectable()
export class AuthorsService {
  private client!: AuthorClient;

  constructor(
    @Inject("GrpcContentClient") private readonly grpcClient: ClientGrpc,
  ) {
    this.client = this.grpcClient.getService<AuthorClient>(AUTHOR_SERVICE_NAME);
  }

  getById(id: string): Observable<Author> {
    return this.client.getAuthor({ id })
      .pipe(
        map(({ author }) => {
          if (!author) {
            throw new Error();
          }
          return ({
            ...author,
            type: ContentType.AUTHOR,
          });
        }),
      );
  }
}
