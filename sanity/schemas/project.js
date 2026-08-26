export default {
  name: 'project',
  title: 'Student Projects',
  type: 'document',
  fields: [
    { name: 'title', title: 'Project Title', type: 'string' },
    { name: 'team', title: 'Team Members', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'image', title: 'Project Image', type: 'image', options: { hotspot: true } },
  ],
};