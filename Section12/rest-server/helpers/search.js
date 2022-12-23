import { response } from "express";

import { isValidObjectId } from "mongoose";
import { Find, FindById } from "../database/helpers/index.js";

/**
 *
 * @param {response} res
 * @param {object} data {term: String, Model: mongoose model, populate?, populate2?}
 * @return response
 */
const searchByTerm = async (res = response, data) => {
  const { term, Model, populate, populate2 } = data;
  let result;

  if (isValidObjectId(term)) {
    result = await FindById(Model, { id: term, populate, populate2 });

    return res.json({
      message: result ? "Found" : `${term} not found`,
      results: result ? [result] : [],
    });
  } else {
    const regex = new RegExp(term, "i");

    result = await Find(Model, {
      filter: {
        $or: [{ name: regex }, { email: regex }, { description: regex }],
      },
      populate,
      populate2,
    });

    return res.json({
      message: result.length > 0 ? "Found" : `${term} not found`,
      results: result,
    });
  }
};

export default searchByTerm;
