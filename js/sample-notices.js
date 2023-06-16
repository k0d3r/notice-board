const notices = [
    {
        id: 1,
        pinned: true,
        title: 'Title One',
        content: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.</p>',
        date: '2023-04-24 19:40:32',
        author: 'John James',
        likes: 6,
        dislikes: 1,
        comments: [
            {
                author: 'John Doe',
                date: '2023-04-25 09:01:02',
                comment: 'This is my comment'
            },
            {
                author: 'Jack Doe',
                date: '2023-04-25 09:02:03',
                comment: 'My insightful comment'
            }
        ],
        images: [
            {
                title: "Sample Image One",
                src: "https://placehold.jp/30/d81b60/ffffff/600x300.png?text=Sample+Image+One"
            },
            {
                title: "Sample Image Two",
                src: "https://placehold.jp/30/d81b60/ffffff/600x300.png?text=Sample+Image+Two"
            }
        ]
    },
    {
        id: 2,
        pinned: true,
        title: 'Title Two',
        content: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>',
        date: '2023-04-25 10:17:20',
        author: 'Jack Jules',
        likes: 1,
        dislikes: 2,
        comments: [
            {
                author: 'James Doe',
                date: '2023-04-25 09:03:04',
                comment: 'My comment'
            }
        ]
    },
    {
        id: 3,
        pinned: false,
        title: 'Title Three With a Really Long Title',
        content: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>',
        date: '2023-04-26 09:14:21',
        author: 'John Johnson',
        likes: 4,
        dislikes: 0,
        comments: []
    },
    {
        id: 4,
        pinned: false,
        title: 'Title Four',
        content: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.</p>',
        date: '2023-04-27 10:14:21',
        author: 'Joe James',
        likes: 7,
        dislikes: 1,
        comments: []
    },
    {
        id: 5,
        pinned: false,
        title: 'Title Five',
        content: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>',
        date: '2023-04-28 17:01:12',
        author: 'James Jackson',
        likes: 3,
        dislikes: 2,
        comments: []
    },
    {
        id: 6,
        pinned: false,
        title: 'Title Six with a Really Really Really Long Title',
        content: '<p>Tiny Comment</p>',
        date: '2023-04-29 17:03:14',
        author: 'John James',
        likes: 1,
        dislikes: 0,
        comments: []
    },
    {
        id: 7,
        pinned: false,
        title: 'Title Seven',
        content: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh.</p>',
        date: '2023-04-30 17:07:08',
        author: 'James Jackson',
        likes: 1,
        dislikes: 0,
        comments: []
    },
    {
        id: 8,
        pinned: false,
        title: 'Title Eight',
        content: '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.</p>',
        date: '2023-04-31 10:14:21',
        author: 'Joe James',
        likes: 3,
        dislikes: 1,
        comments: []
    }
]
