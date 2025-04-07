import { DEFAULT_AMENITIES, DEFAULT_ROLES } from "../constants";
import { AmenityModel } from "../models/amenity";
import { RoleModel } from "../models/role";

const seedRole = async () => {
  const roles = await RoleModel.countDocuments({});

  if (roles > 0) {
    return;
  }

  await RoleModel.insertMany(DEFAULT_ROLES);
  console.log("Roles seeded successfully");
};

const seedAmenities = async () => {
  const amenities = await AmenityModel.countDocuments({});

  if (amenities > 0) {
    return;
  }

  await AmenityModel.insertMany(DEFAULT_AMENITIES);

  console.log("Amenities seeded successfully");
};

export const runSeed = async () => {
  await seedRole();
  await seedAmenities();
};
