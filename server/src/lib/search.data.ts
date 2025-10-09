import type { Model } from "mongoose";
import { Types } from "mongoose";

type Filter = {
  search?: string;
  model: Model<any>;
  category?: string;
  status?: string;
  data: string[];
  hasUser?: boolean;
  userModel?: string;
  userID?: string; // 👈 new param
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
      status,
      data,
      hasUser = false,
      userModel = "accounts",
      userID,
    } = params;

    if (!data) throw new Error("Data is empty");

    const pipeline: any[] = [];
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
          $project: { userData: 0 },
        }
      );
    }
    const matchStage: any = {};
    if (search?.trim()) {
      const searchRegex = { $regex: search.trim(), $options: "i" };
      const searchConditions = data.map((key) => ({ [key]: searchRegex }));

      if (hasUser) {
        searchConditions.push(
          { "user.firstName": searchRegex },
          { "user.lastName": searchRegex },
          { "user.email": searchRegex }
        );
      }

      matchStage.$or = searchConditions;
    }

    // Filter by category
    if (category && category.trim() !== "" && category !== "All Categories") {
      matchStage.category = { $regex: `^${category}$`, $options: "i" };
    }

    // Filter by status
    if (status && status.trim() !== "") {
      matchStage.status = { $regex: `^${status}$`, $options: "i" };
    }
    if (userID && Types.ObjectId.isValid(userID)) {
      console.log("Filtered by User ID");
      matchStage["user._id"] = new Types.ObjectId(userID);
    }

    pipeline.push({ $match: matchStage });
    const filteredData = await CollectionModel.aggregate(pipeline);

    if (!filteredData || filteredData.length === 0) {
      return { notFound: true };
    }

    return { filteredData };
  } catch (error) {
    console.error(error);
    return { error: error as Error };
  }
};

export default FilterCollection;
