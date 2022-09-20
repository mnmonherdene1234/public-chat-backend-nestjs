import { Model } from "mongoose";
import { ReadDto } from "src/dtos/find.dto";

export interface data {
  data: any[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
    };
    populate: string[];
    sort: string;
    total: number;
  };
}

export default async function read(model: Model<any>, readDto: ReadDto): Promise<data> {
    const data = await model
      .find(readDto.filter)
      .populate(readDto.populate)
      .sort(readDto.sort)
      .skip(readDto.pagination.pageSize * (readDto.pagination.page - 1))
      .limit(readDto.pagination.pageSize);

    const total: number = await model.countDocuments(readDto.filter);

    return {
      data,
      meta: {
        pagination: readDto.pagination,
        populate: readDto.populate,
        sort: readDto.sort,
        total
      },
    };
}
