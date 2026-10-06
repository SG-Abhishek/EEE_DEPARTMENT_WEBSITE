export default {
  name: 'studyMaterial',
  title: 'Study Material',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Subject / Topic Name (e.g., Ethics in Engineering)',
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
      name: 'semester',
      title: 'Semester',
      type: 'string',
      options: {
        list: [
          { title: 'Semester 1 (S1)', value: 's1' },
          { title: 'Semester 2 (S2)', value: 's2' },
          { title: 'Semester 3 (S3)', value: 's3' },
          { title: 'Semester 4 (S4)', value: 's4' },
          { title: 'Semester 5 (S5)', value: 's5' },
          { title: 'Semester 6 (S6)', value: 's6' },
          { title: 'Semester 7 (S7)', value: 's7' },
          { title: 'Semester 8 (S8)', value: 's8' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'files',
      title: 'PDF Files / Modules (Batch Upload)',
      type: 'array',
      of: [
        {
          type: 'file',
          options: { accept: '.pdf' },
          fields: [
            {
              name: 'fileTitle',
              title: 'Module / Custom Title (Optional)',
              type: 'string',
            },
            {
              name: 'externalLink',
              title: 'External Link (Optional)',
              type: 'url',
            },
          ],
          preview: {
            select: {
              customTitle: 'fileTitle',
              originalName: 'asset.originalFilename',
            },
            prepare({ customTitle, originalName }) {
              return {
                title: customTitle || originalName || 'PDF Document',
              };
            },
          },
        },
      ],
    },
  ],
};