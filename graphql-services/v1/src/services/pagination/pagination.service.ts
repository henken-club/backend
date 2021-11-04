import { Injectable } from "@nestjs/common";

import { OrderDirection, PaginationArgs } from "~/entities/pagination.entities";
import {
  CursorBasedPaginationBackwardQuery,
  CursorBasedPaginationForwardQuery,
  PaginationDirection as GrpcOrderDirection,
} from "~/protogen/common/pagination";

@Injectable()
export class PaginationService {
  convertGrpcOrderDirection(direction: OrderDirection): GrpcOrderDirection {
    switch (direction) {
      case OrderDirection.ASC:
        return GrpcOrderDirection.ASC;
      case OrderDirection.DESC:
        return GrpcOrderDirection.DESC;
      default:
        throw new Error("Invalid order direction");
    }
  }

  convertGrpcPagination(
    { after, before, first, last }: PaginationArgs,
  ):
    | { forward: CursorBasedPaginationForwardQuery; backward: undefined }
    | { backward: CursorBasedPaginationBackwardQuery; forward: undefined } {
    if (first && last) {
      throw new Error("Duplicated first and last");
    } else if (first) {
      return {
        forward: { first, after: after || undefined },
        backward: undefined,
      };
    } else if (last) {
      return {
        backward: { last, before: before || undefined },
        forward: undefined,
      };
    } else {
      throw new Error("Not exist first and last");
    }
  }
}
