import slugify from 'slugify';

export const slugifyString = (value: string) => {
  return slugify(value, {
    lower: true,
    replacement: '_',
  });
};
