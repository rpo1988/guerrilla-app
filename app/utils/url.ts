export const buildInternalImageUrl = (img: string): string => {
  return `${process.env.CUSTOM_BASE_PATH || ''}/images/${img}`;
};
