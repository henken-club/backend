import { Args, ID, Query, Resolver } from "@nestjs/graphql";

import {
  FindBookSeriesArgs,
  FindBookSeriesPayload,
} from "./dto/find-bookseries.dto";

import { BookSeries } from "~/entities/content/bookseries.entities";
import { BookSeriesService } from "~/services/content/bookseries/bookseries.service";

@Resolver(() => BookSeries)
export class BookSeriesResolver {
  constructor(private readonly bookseries: BookSeriesService) {}

  @Query(() => BookSeries, { name: "bookseries" })
  async getBookSeries(
    @Args("id", { type: () => ID }) id: string,
  ): Promise<BookSeries> {
    return this.bookseries.getById(id);
  }

  @Query(() => FindBookSeriesPayload, { name: "findBookSeries" })
  async findBookSeries(
    @Args({ type: () => FindBookSeriesArgs }) { id }: FindBookSeriesArgs,
  ): Promise<FindBookSeriesPayload> {
    const result = await this.bookseries.findById(id);
    return { bookSeries: result };
  }
}
