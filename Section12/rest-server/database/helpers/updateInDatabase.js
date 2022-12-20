/**
 * Updates a document.
 *
 * @param {model} Model mongoose model.
 * @param {object} data {id: String, updatedData: object, populate?: [String]}
 * @return {object} updated document.
 */
export const Update = async (
  Model,
  data = {
    id,
    updatedData,
  }
) => {
  const { id, updatedData, populate } = data;

  return populate
    ? await Model.findByIdAndUpdate(id, updatedData).populate(...populate)
    : await Model.findByIdAndUpdate(id, updatedData);
};
