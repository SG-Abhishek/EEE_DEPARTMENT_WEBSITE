export default {
  name: 'gallery',
  title: 'Gallery Images',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Caption / Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Upload Image',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop images in the CMS
      },
    }
  ],
};