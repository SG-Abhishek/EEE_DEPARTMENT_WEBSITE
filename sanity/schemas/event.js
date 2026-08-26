export default {
  name: 'event',
  title: 'Events & Activities',
  type: 'document',
  fields: [
    { name: 'title', title: 'Event Title', type: 'string' },
    { name: 'date', title: 'Date', type: 'date' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'image', title: 'Cover Image', type: 'image', options: { hotspot: true } },
  ],
};