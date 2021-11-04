import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { filter, map, Observable } from "rxjs";

import { User } from "~/entities/user.entities";
import { USER_SERVICE_NAME, UserClient } from "~/protogen/core/user";

@Injectable()
export class UsersService implements OnModuleInit {
  private client!: UserClient;

  constructor(
    @Inject("CoreGrpcClient") private readonly grpcClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.client = this.grpcClient.getService<UserClient>(USER_SERVICE_NAME);
  }

  getById(id: string): Observable<User> {
    return this.client.getUser({ id })
      .pipe(
        map(({ user }) => {
          if (!user) throw new Error();
          return ({ avatar: user.avatarUrl, ...user });
        }),
      );
  }

  findById(id: string): Observable<User | null> {
    return this.client.findUser({ id, alias: undefined })
      .pipe(
        map(({ user }) => {
          if (!user) return null;
          return ({ avatar: user.avatarUrl, ...user });
        }),
      );
  }

  findByAlias(alias: string): Observable<User | null> {
    return this.client.findUser({ alias, id: undefined }).pipe(
      map(({ user }) => {
        if (!user) return null;
        return ({ avatar: user.avatarUrl, ...user });
      }),
    );
  }
}
