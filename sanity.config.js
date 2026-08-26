import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas'; // Import schemaTypes

export default defineConfig({
  name: 'default',
  title: 'EEE Department CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id_here',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes, // Pass the schemaTypes array here
  },
});