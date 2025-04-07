export const getHotelsPipeline = ({
  skip,
  limit,
  status,
  name,
  cordinates,
}: {
  skip: number;
  limit: number;
  status?: string;
  name?: string;
  cordinates?: { lat: number; lng: number };
}) => {
  const pipeline: any[] = [];

  if (cordinates) {
    pipeline.push({
      $lookup: {
        from: "address",
        localField: "address",
        foreignField: "_id",
        as: "address",
      },
    });

    pipeline.push({
      $unwind: "$address",
    });

    pipeline.push({
      $match: {
        "address.cordinates": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [cordinates.lng, cordinates.lat],
            },
            $maxDistance: 10000,
          },
        },
      },
    });
  } else {
    // pipeline.push(
    //   {
    //     $lookup: {
    //       from: "Address",
    //       localField: "address",
    //       foreignField: "_id",
    //       as: "address",
    //     },
    //   },
    //   {
    //     $unwind: "$address",
    //   }
    // );
  }

  if (name) {
    pipeline.push({
      $match: {
        name: { $regex: name, $options: "i" },
      },
    });
  }
  if (status) pipeline.push({ $match: { status } });

  pipeline.push(
    {
      $skip: skip,
    },
    {
      $limit: limit,
    }
  );

  return pipeline;
};
