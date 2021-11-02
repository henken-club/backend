import {
  BadRequestException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { Args, ID, Query, Resolver } from "@nestjs/graphql";

import { FindUserArgs, FindUserPayload } from "./dto/find-users.dto";

import { Viewer, ViewerType } from "~/auth/viewer.decorator";
import { ViewerGuard } from "~/auth/viewer.guard";
import { User } from "~/entities/user.entities";
import { AccountsService } from "~/services/account/accounts.service";
import { UsersService } from "~/services/users/users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly users: UsersService,
    private readonly accounts: AccountsService,
  ) {}

  @Query(() => User, { name: "user" })
  async getUser(@Args("id", { type: () => ID }) id: string): Promise<User> {
    const result = await this.users.getById(id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @Query(() => FindUserPayload, { name: "findUser" })
  async findUser(
    @Args({ type: () => FindUserArgs }) args: FindUserArgs,
  ): Promise<FindUserPayload> {
    if (args.alias) {
      return { user: await this.users.findByAlias(args.alias) };
    } else if (args.id) {
      return { user: await this.users.findById(args.id) };
    }
    throw new BadRequestException();
  }

  @Query(() => User, {
    name: "viewer",
    nullable: true,
    description: "Return current user. Return `null` if user not registered",
  })
  @UseGuards(ViewerGuard)
  async getViewer(
    @Viewer() { accountId }: ViewerType,
  ): Promise<User | null> {
    const userId = await this.accounts.getUserId(accountId);

    if (!userId) {
      return null;
    }
    return this.users.getById(userId);
  }
}
