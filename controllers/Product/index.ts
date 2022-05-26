import { getProducts } from "lib";

const getProductsByLimitAndOffset = async ({
  limit,
  offset,
  query,
}): Promise<{ hits; nbHits; newLimit; newOffset }> => {
  const { newLimit, newOffset } = checkOffsetAndLimit({ limit, offset });

  const { hits, nbHits } = await getProducts({ newLimit, newOffset, query });
  return { hits, nbHits, newLimit, newOffset };
};

type getOffsetAndLimitParams = {
  limit: number;
  offset: number;
  maxLimit?: number;
  maxOffset?: number;
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
export default getProductsByLimitAndOffset;
