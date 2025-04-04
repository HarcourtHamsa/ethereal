import { AccountRole } from "./types/account";

export const DEFAULT_REDIS_QUEUE = "DEFAULT_ETHERAL_QUEUE";

export const DEFAULT_ROLES = [
  {
    name: AccountRole.Admin,
  },
  {
    name: AccountRole.User,
  },
];
