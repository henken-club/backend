import { Controller } from "@nestjs/common";

import { HenkensService } from "./henken.service";

import { PaginationDirection } from "~/protogen/common/pagination";
import {
  CreateHenkenRequest,
  CreateHenkenResponse,
  FindHenkenRequest,
  FindHenkenResponse,
  GetHenkenRequest,
  GetHenkenResponse,
  HenkenController as IHenkenController,
  HenkenControllerMethods,
  HenkenOrderField,
  ManyHenkensRequest,
  ManyHenkensResponse,
} from "~/protogen/core/henken";
import { HENKENCLUB_CORE_PACKAGE_NAME } from "~/protogen/core/user";
import { Code } from "~/protogen/google/rpc/code";

@HenkenControllerMethods()
@Controller(HENKENCLUB_CORE_PACKAGE_NAME)
export class HenkenController implements IHenkenController {
  constructor(private readonly henkens: HenkensService) {}

  getHenken({ id }: GetHenkenRequest): Promise<GetHenkenResponse> {
    return this.henkens.getById(id)
      .then((henken) => {
        const converted = this.henkens.convertToGrpcEntity(henken);
        return (
          {
            status: { code: Code.OK, message: "Got henken successfully" },
            henken: converted,
          }
        );
      }).catch(() => (
        {
          status: { code: Code.NOT_FOUND, message: "Henken not found" },
          henken: undefined,
        }
      ));
  }

  async findHenken(
    { query }: FindHenkenRequest,
  ): Promise<FindHenkenResponse> {
    if (query && query.$case === "id") {
      return this.henkens.findById(query.id)
        .then((henken) => {
          return (
            {
              status: { code: Code.OK, message: "Got henken successfully" },
              henken: henken
                ? this.henkens.convertToGrpcEntity(henken)
                : undefined,
            }
          );
        });
    } else {
      return {
        status: { code: Code.INVALID_ARGUMENT, message: "Required id" },
        henken: undefined,
      };
    }
  }

  async manyHenkens(
    { order, paginationQuery }: ManyHenkensRequest,
  ): Promise<ManyHenkensResponse> {
    if (!order && !paginationQuery) {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Required order and pagination query",
        },
        connection: undefined,
      };
    } else if (!order) {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Required order",
        },
        connection: undefined,
      };
    } else if (!paginationQuery) {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Required pagination query",
        },
        connection: undefined,
      };
    }

    const direction = (
      (direction) => {
        switch (direction) {
          case PaginationDirection.ASC:
            return "asc";
          case PaginationDirection.DESC:
            return "desc";
          default:
            return null;
        }
      }
    )(order.direction);
    if (!direction) {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Invalid order direction",
        },
        connection: undefined,
      };
    }

    const orderBy = (
      (field, direction: "asc" | "desc"):
        | null
        | { createdAt: "asc" | "desc" }
        | { updatedAt: "asc" | "desc" } => {
        switch (field) {
          case HenkenOrderField.HENKEN_CREATED_AT:
            return { createdAt: direction };
          case HenkenOrderField.HENKEN_UPDATED_AT:
            return { updatedAt: direction };
          default:
            return null;
        }
      }
    )(order.field, direction);
    if (!orderBy) {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Invalid order field",
        },
        connection: undefined,
      };
    }

    if (
      paginationQuery.$case !== "backward"
      && paginationQuery.$case !== "forward"
    ) {
      return {
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Required either forward or backward query",
        },
        connection: undefined,
      };
    } else if (paginationQuery.$case === "backward") {
      return this.henkens
        .getMany({
          last: paginationQuery.backward.last,
          before: paginationQuery.backward.before || null,
        }, orderBy)
        .then((connection) => ({
          status: {
            code: Code.OK,
            message: "Got many users successfully",
          },
          connection,
        }));
    } else {
      return this.henkens
        .getMany({
          first: paginationQuery.forward.first,
          after: paginationQuery.forward.after || null,
        }, orderBy)
        .then((connection) => ({
          status: {
            code: Code.OK,
            message: "Got many users successfully",
          },
          connection,
        }));
    }
  }

  async createHenken(
    { comment, fromUserId, toUserId, content }: CreateHenkenRequest,
  ): Promise<CreateHenkenResponse> {
    if (!content) {
      return ({
        status: {
          code: Code.INVALID_ARGUMENT,
          message: "Content must be specified",
        },
        henken: undefined,
      });
    }
    return this.henkens.create({
      comment,
      fromUserId,
      toUserId,
      content: content.$case === "tempContent"
        ? { tempContent: { id: content.tempContent.id } }
        : {
          realContent: {
            id: content.realContent.id,
            type: this.henkens.convertFromGrpcContentType(
              content.realContent.type,
            ),
          },
        },
    }).then(
      (henken) => ({
        status: { code: Code.OK, message: "Created user successfully" },
        henken: this.henkens.convertToGrpcEntity(henken),
      }),
    ).catch(
      () => ({
        status: { code: Code.INTERNAL, message: "Internal error" },
        henken: undefined,
      }),
    );
  }
}
