const filter = (Product, query) => {
  // Filtering with name.
  const keyword = query.keyword
    ? {
        name: {
          $regex: query.keyword,
          $options: 'i',
        },
      }
    : {};

  // Finding product filtered with name
  Product = Product.find({ ...keyword });

  // Filtering with Category.
  const queryCopy = { ...query };

  //Removing fields from the query. Removing everything other than Category.
  const removeFields = ['keyword', 'limit', 'page'];

  removeFields.forEach((val) => delete queryCopy[val]);

  // Advance filtering for price , ratings , etc.
  let filteredQuery;
  filteredQuery = JSON.stringify(queryCopy);
  filteredQuery = filteredQuery.replace(
    /\b(gt|lt|gte|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Pagination Settings
  const resPerPage = 4;
  const currentPage = Number(query.page || 1);
  const skip = resPerPage * (currentPage - 1);

  return Product.find(JSON.parse(filteredQuery)).limit(resPerPage).skip(skip);
};

module.exports = { filter };
