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
    const filters: any = {};

    // Only add search filter if there's a search term
    if (search?.trim()) {
      const searchRegex = { $regex: search.trim(), $options: "i" };
      filters.$or = data.map((key) => ({
        [key as string]: searchRegex,
      }));
    }

    if (category && category !== "All Categories") {
      filters.category = { $regex: `^${category}$`, $options: "i" };   
    }

    const filteredData = await CollectionModel.find(filters).lean(); // Transform the response into plain JS Object
    console.log(filteredData);
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
