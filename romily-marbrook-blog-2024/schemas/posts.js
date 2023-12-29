export default {
  title: 'Posts',
  name: 'Posts',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      title: 'Published at',
      name: 'published_at',
      type: 'date',
    },
  ],
}
