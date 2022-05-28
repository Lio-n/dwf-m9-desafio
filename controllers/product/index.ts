import { getOneProduct, getProducts } from "lib";

const getProductsByLimitAndOffset = async ({
  limit,
  offset,
  query,
}: LimitOffsetQueryParams): Promise<{ hits; nbHits; newLimit; newOffset }> => {
  const { newLimit, newOffset } = checkOffsetAndLimit({ limit, offset });

  const { hits, nbHits } = await getProducts({ newLimit, newOffset, query });
  return { hits, nbHits, newLimit, newOffset };
};

const checkOffsetAndLimit = ({
  limit = 10,
  offset = 0,
  maxLimit = 100,
  maxOffset = 10000,
}: getOffsetAndLimitParams): { newLimit; newOffset } => {
  if (limit > maxLimit) limit = maxLimit;
  if (offset > maxOffset) offset = 0;

  return { newLimit: limit, newOffset: offset };
};

const getProductById = async (id: string): Promise<Product> => {
  return await getOneProduct(id);
};
export { getProductsByLimitAndOffset, getProductById };
