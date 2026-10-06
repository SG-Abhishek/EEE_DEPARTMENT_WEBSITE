export default {
  name: 'library',
  title: 'Library',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Book / Material Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author / Editor',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'file',
      title: 'Upload File (PDF)',
      type: 'file',
    },
    {
      name: 'externalUrl',
      title: 'External Link',
      type: 'url',
    },
  ],
};