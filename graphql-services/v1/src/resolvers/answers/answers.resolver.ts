import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { map, Observable } from "rxjs";

import { FindAnswerArgs, FindAnswerPayload } from "./dto/find-answer.dto";

import { Answer, AnswerEdge } from "~/entities/answer.entities";
import { AnswersService } from "~/services/answers/answers.service";

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(private readonly answers: AnswersService) {}

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
}

@Resolver(() => AnswerEdge)
export class AnswerEdgesResolver {
  constructor(private readonly answers: AnswersService) {}

  @ResolveField((type) => Answer, { name: "node" })
  resolveNode(@Parent() { node }: AnswerEdge): Observable<Answer> {
    return this.answers.getById(node.id);
  }
}
