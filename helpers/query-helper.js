const db = require('./collections');
const sendResponse = require('./response');

exports.create = async (collection, data = {}) => {

  try {

    if (!collection || !db[collection]) return { status: false, message: 'Collection not found' }

    let result = await db[collection].create(data)

    if (result) return { status: true, data: result }
    else if (!result) return { status: false, message: 'Data not found' }

  } catch (err) {
    return { status: false, message: err.message }

  }
}

exports.find = async (collection, query = {}, projection = {}, options = {}) => {

  try {

    if (!collection || !db[collection]) return { status: false, message: 'Collection not found' }

    let data = await db[collection].find(query, projection, options)

    if (data) return { status: true, data }
    else if (!data) return { status: false, message: 'Data not found' }


  } catch (err) {
    return { statuts: false, message: err.message }

  }
}


exports.findOne = async (collection, query = {}, projection = {}, options = {}) => {

  try {

    if (!collection || !db[collection]) return { status: false, message: 'Collection not found' }

    let result = await db[collection].findOne(query, projection, options)

    if (result) return { status: true, data: result }
    else if (!result) return { status: false, message: 'Data not found' }

  } catch (err) {
    return { status: false, message: err.message }

  }
}

exports.updateOne = async (collection, findQuery = {}, updateQuery = {}) => {

  try {

    if (!collection) return { status: false, message: 'Collection not found' }

    let result = await db[collection].findOne(findQuery)
    if (result) {

      let updated = await db[collection].updateOne(findQuery, updateQuery)
      if (!updated) return { status: false, message: 'Something went wrong' }
      else return { status: true, data: updated, message: 'Updated Successfully' }

    }
    else if (!result) {

      return { status: false, message: 'Data not found' }
    }

  } catch (err) {

    return { status: false, message: err.message }

  }
}


exports.findOneAndUpdate = async (collection, findQuery = {}, updateQuery = {}, options = { returnDocument: "after" }) => {

  try {

    if (!collection || !db[collection]) return { status: false, message: 'Collection not found' }

    let updated = await db[collection].findOneAndUpdate(findQuery, updateQuery, options)
    if (!updated) return { status: false, message: 'Data not found' }
    else return { status: true, data: updated, message: 'Updated Successfully' }

  } catch (err) {

    return { status: false, message: err.message }

  }
}

exports.aggregate = async (collection, aggregation) => {
  try {
    let schema = db[collection]

    const { matchData, convert, joinCollection, projection, limit, sort, unwind, skip, skiptop, } = aggregation;

    let aggregated = schema.aggregate();
    if (convert) {
      for (let key1 in convert) {
        aggregated.addFields(convert[key1]);
      }
    }
    if (joinCollection) {
      aggregated.lookup({
        'from': joinCollection['from'],
        'localField': joinCollection['localField'],
        'foreignField': joinCollection['foreignField'],
        'as': joinCollection['returnName']
      });
    }
    if (unwind) {
      aggregated.unwind({ path: "$" + unwind, preserveNullAndEmptyArrays: true });
    }
    if (projection) {
      aggregated.project(projection);
    }
    if (matchData) {
      aggregated.match(matchData);
    }
    if (sort) {
      aggregated.sort(sort);
    }
    if (skip && skiptop) {
      aggregated.skip(Number(skip));
    }
    if (skip && !skiptop) {
      aggregated.skip(Number(skip));
    }
    if (limit) {
      aggregated.limit(limit);
    }
    aggregated.allowDiskUse(true);

    let data = await aggregated.exec()
    if (!data) return sendResponse(response, false)

    let count = await aggregateCount({ schema, matchData, joinCollection, projection, unwind })
    return { status: true, data, count }

  } catch (err) {
    return { status: false, message: err.message }

  }

}


let aggregateCount = async (obj, collectionName) => {

  let { schema, matchData, joinCollection, projection, unwind } = obj;
  schema = schema ? schema : db[collectionName];

  let aggregated = schema.aggregate();
  if (joinCollection) {
    aggregated.lookup({
      'from': joinCollection['from'],
      'localField': joinCollection['localField'],
      'foreignField': joinCollection['foreignField'],
      'as': joinCollection['returnName']
    });
  }
  if (unwind) {
    aggregated.unwind({ path: "$" + unwind, preserveNullAndEmptyArrays: true });
  }
  if (projection) {
    aggregated.project(projection);
  }
  if (matchData) {
    aggregated.match(matchData);
  }

  let count = await aggregated.exec()
  if (!count) return 0
  return count.length

}
module.exports.aggregateCount = aggregateCount;

exports.countDocuments = async (collection, query) => {
  try {

    if (!collection || !db[collection]) return { status: false, message: 'Collection not found' }

    let count = await db[collection].countDocuments(query)
    return { status: true, count }

  } catch (err) {
    return { status: false, message: err.message }

  }
};

exports.findWithCount = async (collection, query = {}, projection = {}, options = {}) => {

  try {

    if (!collection) return { status: false, message: 'Collection not found' }

    let { limit, skip, sort } = options

    let count = await db[collection].find(query).countDocuments()
    let data = await db[collection].find(query, projection).limit(limit).skip(skip).sort(sort)

    if (count && data) {

      return { status: true, data, count }
    }
    else if (!count) {

      return { status: false, message: 'Data not found' }
    }

  } catch (err) {
    return { status: false, message: err.message }

  }
}


exports.deleteOne = async (collection, query) => {

  try {
    if (!query) return { status: false, message: 'Query is required' }
    else if (!collection || !db[collection]) return { status: false, message: 'Collection not found' }

    let result = await db[collection].deleteOne(query)

    if (result) return { status: true, data: result }
    else if (!result) return { status: false, message: 'Data not found' }

  } catch (err) {
    return { status: false, message: err.message }

  }
}

exports.updateMany = async (collection, findQuery = {}, updateQuery = {}, _projection = {}, optionsQuery = {}
) => {
  try {

    if (!collection) return false

    let updated = await db[collection].updateMany(findQuery, updateQuery, optionsQuery)

    if (!updated) return { status: false, message: 'Data not found' }
    else return { status: true, data: updated, message: 'Updated Successfully' }

  } catch (err) {

    return false

  }
}

exports.deleteMany = async (collection, query) => {

  try {
    if (!query) return { status: false, message: 'Query is required' }
    else if (!collection || !db[collection]) return { status: false, message: 'Collection not found' }

    let result = await db[collection].deleteMany(query)

    if (result) return { status: true, data: result }
    else if (!result) return { status: false, message: 'Data not found' }

  } catch (err) {
    return { status: false, message: err.message }

  }
}
