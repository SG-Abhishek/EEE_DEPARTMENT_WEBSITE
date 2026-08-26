export default {
  name: 'announcement',
  title: 'Announcements',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date Published',
      type: 'date',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['General', 'Exams', 'Workshops', 'IEEE'],
      },
    },
    {
      name: 'content',
      title: 'Content / Details',
      type: 'text',
    },
    {
      name: 'file',
      title: 'PDF Document / Circular (Optional)',
      type: 'file',
    },
  ],
};