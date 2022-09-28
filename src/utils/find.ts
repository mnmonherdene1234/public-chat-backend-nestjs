import { Model } from 'mongoose';
import { FindDto } from 'src/validations/find.dto';

export interface data {
  data: any[];
  meta: {
    filter: {};
    pagination: {
      page: number;
      pageSize: number;
    };
    populate: string | string[];
    sort: string;
    total: number;
    modelName: string
  };
}

export default async function find(
  model: Model<any>,
  findDto: FindDto,
): Promise<data> {
  const data = await model
    .find(findDto.filter)
    .populate(findDto.populate)
    .sort(findDto.sort)
    .skip(findDto.pagination.pageSize * (findDto.pagination.page - 1))
    .limit(findDto.pagination.pageSize);

  const total: number = await model.countDocuments(findDto.filter);

  return {
    data,
    meta: {
      filter: findDto.filter,
      pagination: findDto.pagination,
      populate: findDto.populate,
      sort: findDto.sort,
      total,
      modelName: model.modelName
    },
  };
}
