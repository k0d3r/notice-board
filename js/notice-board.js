const log = data => {
    console.log(data);
};

/*
 Strip HTML tags
 https://ourcodeworld.com/articles/read/376/how-to-strip-html-from-a-string-extract-only-text-content-in-javascript
 */
const stripHtmlTags = string => string.replace(/<[^>]+>/g, '');

const truncateString = (string, length) => {
    string = stripHtmlTags(string);

    if (string.length < length) {
        return string;
    }

    return string.substring(0, length) + '...';
};

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

/*
 This markup iterates and renders the notices array from sample-data.js
 The actual data in the notices array should be returned from a DB query. JS .map() here is just for demo purposes
 The HTML structure and CSS classes should be used to render the DB resultset looped foreach() HTML output
 */
const noticeMarkup = notices.map(notice => {
    return `
        <div class="col-md-6 col-lg-4">
            <div class="notice shadow" data-id="${notice.id}">
                <div class="title">${stripHtmlTags(notice.title)}</div>
                <div class="content">${truncateString(notice.content, 120)}</div>
                <div class="author">${notice.author}</div>
                <div class="date">${notice.date}</div>
                <div class="row">
                    <div class="col-sm-8">
                        <div class="social">
                            <span class="comments"><a href="#"><i class="far fa-comment"></i></a>${notice.comments.length}</span>
                            <span class="likes">
                                <a href="#" data-action="like"><i class="far fa-thumbs-up"></i></a> ${notice.likes}
                                <a href="#" data-action="dislike"><i class="far fa-thumbs-down"></i></a> ${notice.dislikes}
                            </span>
                        </div> <!-- /.social -->
                    </div>
                    <div class="col-sm-4 d-flex flex-row-reverse">
                        <a class="view btn btn-default" href="#" role="button">View</a>
                    </div>
                </div> <!-- /.row -->
            </div> <!-- /.notice -->
        </div>
    `;
});

$(function() {
    // Add the notices markup to the page
    $('#notices > .row').html(noticeMarkup);

    // Comment button
    // ToDo: This should open the notice modal and scroll to the comments section OR do nothing
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

    // View a notice in a modal
    $('#notices .notice a.view').click(function(event) {
        const notice = notices.find(notice => notice.id == $(this).closest('.notice').data('id'));

        $('.content-modal').attr('id', 'notice-modal');

        const noticeModal = $('#notice-modal');

        // ToDo: Could this be in a template tag? How to pass in JS template strings?
        const modalContentMarkup = `
            <div class="author">Posted by: ${notice.author}</div>
            <div class="content">${notice.content}</div>
        `;

        $('.modal-title', noticeModal).text(notice.title);
        $('.modal-body', noticeModal).html(modalContentMarkup);
        
        // Allow closing of the modal on a background click
        noticeModal.modal({ backdrop: true, keyboard: true });

        event.preventDefault();
    });

    // Show the form for adding a new notice in a modal
    $('#add-notice').click(function(event) {
        $('.content-modal').attr('id', 'add-notice-modal');
        
        const addNoticeModal = $('#add-notice-modal');
        
        $('.modal-title', addNoticeModal).text('Add Notice');
        $('.modal-body', addNoticeModal).html( $('#add-notice-form-template').html() );

        // Prevent closing of the modal on a background click
        addNoticeModal.modal({ backdrop: 'static', keyboard: false });

        event.preventDefault();
    });

    // Show an confirm/cancel dialog box on cancel on the new notice form
    $(document).on('click', '#add-notice-form .btn-cancel', function() {
        const confirmCancelModal = $('#confirm-cancel-modal');
        
        $('.modal-body > h3', confirmCancelModal).text('Your notice will not be added');

        // Prevent closing of the modal on a background click
        confirmCancelModal.modal({ backdrop: 'static', keyboard: false });
    });

    // Prevent the submit event on the new notice form
    $(document).on('submit', '#add-notice-form', function(event) {
        alert($(this).attr('id') + ' form submitted');
        event.preventDefault();
    });

    // Close the parent modal from inside the modal
    $(document).on('click', '.close-parent-modal', function() {
        const modal = $(this).closest('.modal');
        modal.modal('hide');
    });

    // Close all modals with a class of .modal
    $(document).on('click', '.close-modals', function() {
        $('.modal').modal('hide');
    });

    // Clear the content modal and reset it on hide
    $('.content-modal').on('hidden.bs.modal', function() {
        $('.modal-title, .modal-body', $(this)).empty();
        $(this).removeAttr('id');
        $(this).removeData('bs.modal'); // Remove the bs.modal data variable to reinitialize the modal
        log('.content-modal closed'); //ToDo: Remove this
    });

});
