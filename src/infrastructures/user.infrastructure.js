import UserModel from '../models/user.model';

const userInfrastructure = {
  get: async ({ condition = {}, skip = 0, limit = 200, fields = [], sort }) => {
    const result = await UserModel.find(condition)
      .skip(Number(skip))
      .limit(Number(limit))
      .sort(sort)
      .select(fields)
      .lean();
    return result;
  },
  post: async ({ objectUser }) => {
    const result = await UserModel.create(objectUser);
    return result;
  },
  update: async ({ _id, objectUser, newDocument = true, fields = [] }) => {
    const result = await UserModel.findByIdAndUpdate(_id, objectUser, {
      new: newDocument,
    })
      .select(fields)
      .lean();
    return result;
  },
  delete: async ({ _id }) => {
    await UserModel.findByIdAndDelete(_id);
  },
};

export default userInfrastructure;
