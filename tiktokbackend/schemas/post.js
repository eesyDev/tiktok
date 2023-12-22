export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'caption',
            title: 'Caption',
            type: 'string',
        },
        {
            name: 'video',
            title: 'Video',
            type: 'file',
            options: {
                hotspot: true
            },
        },
        {
            name: 'userId',
            title: 'User Id',
            type: 'string',
        },
        {
            name: 'postedBy',
            title: 'Posted By',
            type: 'postedBy',
        },
        {
            name: 'comments',
            title: 'Comments',
            type: 'array',
            of: [{type: 'comment'}]
        },
        {
            name: 'likes',
            title: 'Likes',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{type: 'user'}],
            }],
        },
        {
            name: 'topic',
            title: 'Topic',
            type: 'string'
        }
    ]
}