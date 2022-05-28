import algoliasearch from "algoliasearch";
const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY } = process.env;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const products_index = client.initIndex("products");

type GetProductsParams = {
  newLimit: number;
  newOffset: number;
  query: string;
};
const getProducts = async ({
  newLimit,
  newOffset,
  query,
}: GetProductsParams): Promise<{ hits; nbHits }> => {
  const { hits, nbHits } = await products_index.search(query, {
    offset: newOffset,
    length: newLimit,
  });
  return { hits, nbHits };
};

const getOneProduct = async (id: string): Promise<Product> => {
  try {
    return await products_index.getObject(id);
  } catch (error) {
    throw error.message;
  }
};

export { getProducts, getOneProduct };
