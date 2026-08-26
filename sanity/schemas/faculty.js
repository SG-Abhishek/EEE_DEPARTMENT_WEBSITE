export default {
  name: 'faculty',
  title: 'Faculty Members',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Designation / Role',
      type: 'string',
    },
    {
      name: 'isHod',
      title: 'Head of Department (HOD)?',
      type: 'boolean',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};