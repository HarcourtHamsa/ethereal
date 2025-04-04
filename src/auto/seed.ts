import { DEFAULT_ROLES } from "../constants";
import { RoleModel } from "../models/role";

const seedRole = async () => {
  const roles = await RoleModel.countDocuments({});

  if (roles > 0) {
    return;
  }

  await RoleModel.insertMany(DEFAULT_ROLES);
  console.log("Roles seeded successfully");
};

export const runSeed = async () => {
  await seedRole();
};
