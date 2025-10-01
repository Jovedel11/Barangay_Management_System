import type { Model } from "mongoose";

type Filter = {
  search?: string;
  model: Model<any>;
  category?: string;
  data: string[];
  hasUser?: boolean; // Optional flag to include user data
  userModel?: string; // Optional name of the user collection (e.g., "Account")
};

type FilterResponse = {
  error?: Error;
  notFound?: boolean;
  filteredData?: Record<string, any>[] | any[];
};

const FilterCollection = async (params: Filter): Promise<FilterResponse> => {
  try {
    if (!params) throw new Error("Params are empty");
    const {
      search,
      model: CollectionModel,
      category,
      data,
      hasUser = false,
      userModel = "accounts",
    } = params;
    if (!data) throw new Error("Data is empty");

    const pipeline: any[] = [];

    // Match stage for filtering
    const matchStage: any = {};

    // Add search conditions if search term exists
    if (search?.trim()) {
      const searchRegex = { $regex: search.trim(), $options: "i" };
      matchStage.$or = data.map((key) => ({
        [key]: searchRegex,
      }));
    }

    // Add category filter ONLY if specified and not "All Categories"
    if (category && category.trim() !== "" && category !== "All Categories") {
      matchStage.category = { $regex: `^${category}$`, $options: "i" };
    }

    // Always push $match, even if it's empty → means "match everything"
    pipeline.push({ $match: matchStage });

    // Add lookup stage for user data if hasUser is true
    if (hasUser) {
      pipeline.push(
        {
          $lookup: {
            from: userModel,
            localField: "user",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: {
            path: "$userData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            user: {
              _id: "$userData._id",
              email: "$userData.email",
              firstName: "$userData.first_name",
              lastName: "$userData.last_name",
            },
          },
        },
        {
          $project: {
            userData: 0,
          },
        }
      );
    }

    const filteredData = await CollectionModel.aggregate(pipeline);
    console.log(filteredData);

    if (!filteredData || filteredData.length === 0) {
      return { notFound: true };
    }

    return { filteredData };
  } catch (error) {
    console.log(error);
    return { error: error as Error };
  }
};

export default FilterCollection;
