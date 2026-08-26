export default {
  name: 'placement',
  title: 'Placements',
  type: 'document',
  fields: [
    { name: 'studentName', title: 'Student Name', type: 'string' },
    { name: 'company', title: 'Company Name', type: 'string' },
    { name: 'role', title: 'Job Role', type: 'string' },
    { name: 'batch', title: 'Batch (Year)', type: 'string' },
    { name: 'image', title: 'Student Photo', type: 'image', options: { hotspot: true } },
  ],
};