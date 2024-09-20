const articleService = require("../../../../services/article");
const { query } = require("../../../../utils");
const defaults = require("../../../../config/defaults");



const findAll = async (req, res, next) => {
  const page = +req.query.page || defaults.page;
  const limit = +req.query.limit || defaults.limit;
  const sortType = req.query.sort_type || defaults.sortType;
  const sortBy = req.query.sort_by || defaults.sortBy;
  const search = req.query.search || defaults.search;

  try {
    //data
    const articles = await articleService.findAll({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });


    // response generations

    // data transformation
    const data = query.getTransformedItems({items:articles,selection:["id",'title','cover','author','updatedAt','createdAt','body'],path:'/articles'})


    // pagination
    const totalItems = await articleService.count({ search });

    const pagination = query.getPagination({ totalItems, limit, page });

    //HATEOS Links
    const links = query.getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    res.status(200).json({
      data,
      pagination,
      links,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = findAll;
