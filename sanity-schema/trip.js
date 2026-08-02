export default {
  name: 'trip',
  title: 'Trip',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID (Unique Slug)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: ['USD', 'EUR', 'GBP', 'EGP'],
      },
      initialValue: 'USD',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Historical', 'Sea', 'Adventure', 'Cruise', 'Relaxation'],
      },
    },
    {
      name: 'image',
      title: 'Main Image URL (or upload)',
      type: 'string',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 4.8,
    },
    {
      name: 'reviews',
      title: 'Review Count',
      type: 'number',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'included',
      title: 'What is Included',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'groupSize',
      title: 'Group Size',
      type: 'string',
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'string',
    },
    {
      name: 'hot',
      title: 'Hot Deal / Bestseller',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'discount',
      title: 'Discount Percentage',
      type: 'number',
    },
  ],
};
