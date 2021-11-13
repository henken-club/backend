import { Metadata } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { Observable } from "rxjs";

import {
  FollowingController as IFollowingController,
  FollowingControllerMethods,
  FollowUserRequest,
  FollowUserResponse,
  GetFollowingRequest,
  GetFollowingResponse,
  GetPairRequest,
  GetPairResponse,
  HENKENCLUB_CORE_PACKAGE_NAME,
  ManyFollowingsRequest,
  ManyFollowingsResponse,
} from "~/protogen/core/following";

@FollowingControllerMethods()
@Controller(HENKENCLUB_CORE_PACKAGE_NAME)
export class FollowingController implements IFollowingController {
  constructor() {}

  getFollowing(
    request: GetFollowingRequest,
    metadata?: Metadata,
  ): Observable<GetFollowingResponse> {
    throw new Error("Method not implemented.");
  }

  getPair(
    request: GetPairRequest,
    metadata?: Metadata,
  ): Observable<GetPairResponse> {
    throw new Error("Method not implemented.");
  }

  manyFollowings(
    request: ManyFollowingsRequest,
    metadata?: Metadata,
  ): Observable<ManyFollowingsResponse> {
    throw new Error("Method not implemented.");
  }

  followUser(
    request: FollowUserRequest,
    metadata?: Metadata,
  ): Observable<FollowUserResponse> {
    throw new Error("Method not implemented.");
  }
}
