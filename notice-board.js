const log = function(data) {
    console.log(data);
};

const noticeMarkup = notices.map(notice => {
    return `
        <div class="col-md-6 col-lg-4">
            <div class="notice shadow" data-id="${notice.id}">
                <div class="title">${notice.title}</div>
                <p class="summary">${notice.summary}</p>
                <div class="content">${notice.content}</div>
                <div class="author">Posted by: ${notice.author}</div>
                <div class="date">${notice.date}</div>
                <div class="social">
                    <span class="comments"><a href="#"><i class="far fa-comment"></i></a>${notice.comments}</span>   
                    <span class="likes">
                        <a href="#" data-action="like"><i class="far fa-thumbs-up"></i></a> ${notice.likes}
                        <a href="#" data-action="dislike"><i class="far fa-thumbs-down"></i></a> ${notice.dislikes}
                    </span>
                </div> <!-- /.social -->
                <div class="d-flex flex-row-reverse">
                    <a class="read-more btn btn-default" href="#" role="button">Read more</a>
                </div>
            </div> <!-- /.notice -->
        </div>
    `;
});

$(function() {
    
    const noticeModal = $('#notice-modal');

    $('#notices > .row').html(noticeMarkup);

    $('#notices .notice .social .likes a').click(function(event) {
        alert($(this).data('action') + ' action clicked');
        event.preventDefault();
    });
    
    $('#notices .notice .comments a').click(function(event) {
        alert('Comments action clicked');
        event.preventDefault();
    });

    $('#notices .notice a.read-more').click(function(event) {
        const notice = notices.find(notice => notice.id == $(this).closest('.notice').data('id'));

        const modalContentMarkup = `
            <div class="author">Posted by: ${notice.author}</div>
            <div class="content">${notice.content}</div>
        `;

        $('.modal-title', noticeModal).text(notice.title);
        $('.modal-body', noticeModal).html(modalContentMarkup);
        
        noticeModal.modal('show');

        event.preventDefault();
    });

    noticeModal.on('hidden.bs.modal', function() {
        $('.modal-body', $(this)).empty();
    })

    /* Show the modal automatically - DELETE */
    //$('#notice-modal .modal-body').html('<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.</p>');
    //$('#notice-modal').modal('show');

});
