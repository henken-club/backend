import {
  Args,
  ID,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { map, Observable } from "rxjs";

import { Answer } from "../answers.entities";
import { AnswersService } from "../answers.service";

import { AnswerHenkenArgs, AnswerHenkenPayload } from "./dto/answer-henken.dto";
import { FindAnswerArgs, FindAnswerPayload } from "./dto/find-answer.dto";

import { Henken } from "~/henkens/henkens.entities";
import { HenkensService } from "~/henkens/henkens.service";

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(
    private readonly answers: AnswersService,
    private readonly henkens: HenkensService,
  ) {}

  @ResolveField((type) => Henken, { name: "henken" })
  resolveHenken({ henkenId }: Answer): Observable<Henken> {
    return this.henkens.getById(henkenId);
  }

  @Query(() => Answer, { name: "answer" })
  getAnswer(
    @Args("id", { type: () => ID }) id: string,
  ): Observable<Answer> {
    return this.answers.getById(id);
  }

  @Query(() => FindAnswerPayload, { name: "findAnswer" })
  findAnswer(
    @Args({ type: () => FindAnswerArgs }) { id }: FindAnswerArgs,
  ): Observable<FindAnswerPayload> {
    return this.answers.findById(id).pipe(map((answer) => ({ answer })));
  }

  @Mutation(() => AnswerHenkenPayload, { name: "answerHenken" })
  answerHenken(
    @Args({ type: () => AnswerHenkenArgs }) { answerType, comment, henkenId }:
      AnswerHenkenArgs,
  ): Observable<FindAnswerPayload> {
    return this.answers
      .createAnswer({ comment, henkenId, answerType })
      .pipe(map((answer) => ({ answer })));
  }
}
