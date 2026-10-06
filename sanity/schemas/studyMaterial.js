export default {
  name: 'studyMaterial',
  title: 'Study Material',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'materialType',
      title: 'Material Type',
      type: 'string',
      options: {
        list: [
          { title: 'Notes', value: 'notes' },
          { title: 'Previous Year Questions (PYQ)', value: 'pyq' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'scheme',
      title: 'Scheme',
      type: 'string',
      options: {
        list: [
          { title: '2019 Scheme', value: '2019' },
          { title: '2024 Scheme', value: '2024' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'academicYear',
      title: 'Academic Year',
      type: 'string',
      options: {
        list: [
          { title: '1st Year', value: 'year1' },
          { title: '2nd Year', value: 'year2' },
          { title: '3rd Year', value: 'year3' },
          { title: '4th Year', value: 'year4' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'file',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
    {
      name: 'externalLink',
      title: 'External Link (Drive / Dropbox)',
      type: 'url',
    },
  ],
};