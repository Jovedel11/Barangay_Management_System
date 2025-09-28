import type { Model } from "mongoose";

type Filter = {
  search?: string;
  model: Model<any>;
  category: string;
  data: string[];
};

type FilterResponse = {
  error?: Error;
  notFound?: boolean;
  filteredData?: Record<string, any>[] | any[];
};

const FilterCollection = async (params: Filter): Promise<FilterResponse> => {
  try {
    if (!params) throw new Error("Params are empty");
    const { search, model: CollectionModel, category, data } = params;
    if (!data) throw new Error("Data is empty");
    const searchRegex = { $regex: search?.trim() ?? "", $options: "i" };
    const query: Record<string, Record<string, string>>[] = data.map((key) => ({
      [key as string]: searchRegex,
    }));

    if (category) {
      query.push({ [category as string]: searchRegex });
    }
    const filteredData = await CollectionModel.find({
      $or: query,
    }).lean(); // Transform the response into plain JS Object

    if (!filteredData || filteredData.length === 0) {
      return { notFound: true };
    }
    return { filteredData: filteredData };
  } catch (error) {
    console.log(error);
    return { error: error as Error };
  }
};

export default FilterCollection;
