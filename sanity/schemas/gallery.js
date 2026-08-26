export default {
  name: 'gallery',
  title: 'Gallery Images',
  type: 'document',
  fields: [
    { name: 'title', title: 'Caption / Title', type: 'string' },
    { name: 'date', title: 'Date Taken', type: 'date' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
  ],
};