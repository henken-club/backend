import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Observable } from "rxjs";

import { Answer, AnswerEdge } from "~/entities/answer.entities";
import { AnswersService } from "~/services/answers/answers.service";

@Resolver(() => AnswerEdge)
export class AnswerEdgesResolver {
  constructor(private readonly answers: AnswersService) {}

  @ResolveField((type) => Answer, { name: "node" })
  resolveNode(@Parent() { node }: AnswerEdge): Observable<Answer> {
    return this.answers.getById(node.id);
  }
}
