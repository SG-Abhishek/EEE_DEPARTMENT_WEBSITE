export default {
  name: 'academicDoc',
  title: 'Syllabus and PYQs',
  type: 'document',
  fields: [
    { name: 'title', title: 'Document Title', type: 'string' },
    { 
      name: 'category', 
      title: 'Category', 
      type: 'string',
      options: { list: ['PYQs', 'Syllabus'] }
    },
    { 
      name: 'semester', 
      title: 'Semester', 
      type: 'string',
      options: { list: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'] }
    },
    { name: 'file', title: 'PDF File', type: 'file' },
  ],
};