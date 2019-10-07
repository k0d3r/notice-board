const log = function(data) {
    console.log(data);
};

const noticeMarkup = notices.map(notice => {
    return `
        <div class="col-md-6 col-lg-4">
            <div class="notice shadow">
                <div class="title">${notice.title}</div>
                <p class="summary">${notice.summary}</p>
                <div class="content">${notice.content}</div>
                <div class="author">Posted by: ${notice.author}</div>
                <div class="date">${notice.date}</div>
                <div class="social">
                    <div class="row">
                        <div class="col">
                            <span class="comments"><a href="#"><i class="far fa-comment"></i></a>${notice.comments}</span>
                        </div>
                        <div class="likes col text-right">
                            <a href="#" data-action="like"><i class="far fa-thumbs-up"></i></a> ${notice.likes}
                            <a href="#" data-action="dislike"><i class="far fa-thumbs-down"></i></a> ${notice.dislikes}
                        </div>
                    </div> <!-- /.row -->
                </div> <!-- /.social -->
                <div class="d-flex flex-row-reverse">
                    <a class="read-more btn btn-default" href="#" role="button">Read more</a>
                </div>
            </div>  <!-- /.notice -->
        </div>
    `;
});

$(function() {
    
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
        $('#notice-modal .modal-body').html( $(this).closest('.notice').find('.content').html() );
        $('#notice-modal').modal('show')
        event.preventDefault();
    });

    $('#notice-modal').on('hidden.bs.modal', function() {
        $('.modal-body', $(this)).empty();
    })

});
