/**
 * Finds all documents.
 *
 * Gets all "state" true documents and can work with limit, from and populate.
 *
 * @param {model} Model mongoose model.
 * @param {object} data {limit?: Number, from?: Number, populate?: [String], populate2?: ["String"]}.
 *
 * @return {Promise<[Number, Array<model>]>} [total entries, array of found documents].
 */
export const FindAll = async (Model, data = { limit, from }) => {
  const filter = { state: true };
  const { limit = 5, from = 0, populate, populate2 } = data;

  return await Promise.all([
    Model.countDocuments(),
    populate2
      ? Model.find(filter)
          .populate(...populate)
          .populate(...populate2)
          .skip(from)
          .limit(limit)
      : populate
      ? Model.find(filter)
          .populate(...populate)
          .skip(from)
          .limit(limit)
      : Model.find(filter).skip(from).limit(limit),
  ]);
};

/**
 * Find one document by id.
 *
 * It can work with populate.
 *
 * @param {model} Model mongoose model.
 * @param {object} data {id: String, populate?: [String]}.
 *
 * @return {object} found object.
 */
export const FindById = async (Model, data) => {
  const { id, populate, populate2 } = data;

  return populate2
    ? await Model.findById(id)
        .populate(...populate)
        .populate(...populate2)
    : populate
    ? await Model.findById(id).populate(...populate)
    : await Model.findById(id);
};

/**
 * Find one document.
 *
 * @param {model} Model mongoose model.
 * @param {object} filter
 * @return {object} found object.
 */
export const FindOne = async (Model, filter = {}) => {
  return await Model.findOne(filter);
};
