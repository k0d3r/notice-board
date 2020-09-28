const log = data => {
    console.log(data);
};

/*
 This markup iterates and renders the notices array from sample-data.js
 The actual data in the notices array should be returned from a DB query. JS .map() here is just for demo purposes
 The HTML structure and CSS classes should be used to render the DB resultset looped foreach() HTML output
 */
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
                    <span class="comments"><a href="#"><i class="far fa-comment"></i></a>${notice.comments.length}</span>
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

const ajaxRequest = (url, data, type) => {
    $.ajax({
        type: 'PUT',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(data),
    }).done(function () {
        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });
};

$(function() {
    // Add the notices markup to the page
    $('#notices > .row').html(noticeMarkup);

    // Comment button
    $('#notices .notice .comments a').click(function(event) {
        alert('Comments action clicked');
        event.preventDefault();
    });
    
    /*
     Like buttons - AJAX PUT request to API endpoint passing the data attr data-action param
     The insert should be +1 || -1
     If 200 (OK) reponse - no action. If not a 200 response: an alert or trigger your notification system with request failed (400/500)
     */
    $('#notices .notice .social .likes a').click(function(event) {
        alert($(this).data('action') + ' action clicked');
        event.preventDefault();
    });

    $('#notices .notice a.read-more').click(function(event) {
        const notice = notices.find(notice => notice.id == $(this).closest('.notice').data('id'));

        $('.modal').attr('id', 'notice-modal');

        const noticeModal = $('#notice-modal');

        const modalContentMarkup = `
            <div class="author">Posted by: ${notice.author}</div>
            <div class="content">${notice.content}</div>
        `;

        $('.modal-title', noticeModal).text(notice.title);
        $('.modal-body', noticeModal).html(modalContentMarkup);
        
        noticeModal.modal('show');

        event.preventDefault();
    });

    // Clear the modal contents and remove it's ID attr on close
    $('.modal').on('hidden.bs.modal', function() {
        $('.modal-title, .modal-body', $(this)).empty();
        $(this).removeAttr('id');
    });

    $('#add-notice').click(function(event) {
        $('.modal').attr('id', 'new-notice-modal');
        
        const newNoticeModal = $('#new-notice-modal');
        
        $('.modal-title', newNoticeModal).text('New Notice');
        $('.modal-body', newNoticeModal).html('Hello World, I will be a form for a new modal');
        
        newNoticeModal.modal('show');

        event.preventDefault();
    });

});
