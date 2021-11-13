import { Injectable } from "@nestjs/common";

import { Timestamp } from "~/protogen/google/protobuf/timestamp";

@Injectable()
export class TimestampService {
  convert(timestamp: Timestamp): string {
    return "";
  }
}
