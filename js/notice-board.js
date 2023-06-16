/*----------------------------------------------------------------------
    Generic Functions
----------------------------------------------------------------------*/
const log = data => {
    if (window.console) {
        console.log(data)
    }
}

/*
 Strip HTML tags
 https://ourcodeworld.com/articles/read/376/how-to-strip-html-from-a-string-extract-only-text-content-in-javascript
 */
const stripHtmlTags = string => string.replace(/<[^>]+>/g, '')

const truncateString = (string, length, stripTags = true) => {
    if (stripTags) {
        string = stripHtmlTags(string)
    }

    if (string.length < length) {
        return string
    }

    return string.substring(0, length) + '...'
}

/*----------------------------------------------------------------------
    Day.js
----------------------------------------------------------------------*/

// Day.js Plugins
dayjs.extend(dayjs_plugin_relativeTime)
dayjs.extend(dayjs_plugin_advancedFormat)

/*----------------------------------------------------------------------
    Handlebars
----------------------------------------------------------------------*/

// Register just-handlebars-helpers with handlebars
H.registerHelpers(Handlebars)

// Handlebars Helpers
const handlebarsHelpers = {
    stripHtmlTags(string) {
        let output = stripHtmlTags(string)
        output = Handlebars.escapeExpression(output)
        return new Handlebars.SafeString(output)
    },
    truncateString(string, length, stripTags = true) {
        let output = truncateString(string, length)
        output = Handlebars.escapeExpression(output)
        return new Handlebars.SafeString(output)
    },
    formatDate(date, format) {
        let output = Handlebars.escapeExpression(date)
        date = dayjs(date)

        switch (format) {
            case 'fromNow':
                output = date.fromNow()
                break
            default:
                output = date.format(format)
        }

        return new Handlebars.SafeString(output)
    },
    bold(string) {
        let output = Handlebars.escapeExpression(string)
        output = `<strong>${string}</strong>`
        return new Handlebars.SafeString(output)
    }
}

Handlebars.registerHelper(handlebarsHelpers)

$(function() {

    /*----------------------------------------------------------------------
        Notice Display
    ----------------------------------------------------------------------*/

    /*
     Load the HTML templates into the DOM and display the notices
     The templates need to be present to render the notices
     These templates could also be just added to the main index.html page
     */
    const injectTemplates = (url) => {
        return $.ajax({
            url,
            type: 'GET',
            dataType: 'html',
            success(templates) {
                $('body').append(templates)
                addNoticesToDom()
                addAdsToDom()
            },
            error(error) {
                log(`An error occurred loading a template file from '${url}'. Response: ${error.status} | ${error.statusText}`)
            }
        })
    }

    /*
     Add the notices markup to the page

     This function iterates and renders the notices array from sample-notices.js
     The actual data in the notices array should be returned from a DB query or API endpoint
     If you want to render the notices server-side remove this function but use the HTML structure and CSS class properties from the template
     */
    const addNoticesToDom = () => {
        const noticeTemplate = Handlebars.compile($('#notice-template').html())
        const noticeMarkup = notices.map(notice => noticeTemplate(notice))
        $('#notices > .row').html(noticeMarkup)
        equalHeightNotices('pageLoad')
    }

    /*
     Add the ads markup to the page

     This function iterates and renders the ads array from sample-ads.js
     The actual data in the ads array should be returned from a DB query or API endpoint
     If you want to render the ads server-side remove this function but use the HTML structure and CSS class properties from the template
     */
     const addAdsToDom = () => {
        const adTemplate = Handlebars.compile($('#ad-template').html())
        const adMarkup = ads.map(ad => adTemplate(ad))
        $('#ads > .row').html(adMarkup)
    }

    /*
     Like buttons - AJAX PUT request to API endpoint passing solely the data attr data-action param
     The insert should be +1 AND -1 so both can be displayed AND/OR a ratio can be displayed on the frontend or computed on the backend for most liked etc
     If 200 (OK) reponse - no action. If not a 200 response: an alert or trigger your notification system with request failed (400 (Bad Request)/500 (Server Error))

     Only 1 like or dislike per person, their userID is stored along with their action. They can change their like to a dislike or vice-versa
     If notices are sorted by a like filter, do the notices get reloaded into the DOM when the API returns a successful like insert?
     */
    $(document).on('click', '#notices .notice .social .likes a', function(event) {
        alert(sprintf('%s action clicked', $(this).data('action')))
        event.preventDefault()
    })

    // View a notice in a modal
    $(document).on('click', '#notices .notice a.view', function(event) {
        const notice = notices.find(notice => notice.id == $(this).closest('.notice').data('id'))

        $('.content-modal').attr('id', 'notice-modal')

        const noticeModal = $('#notice-modal')
        const noticeModalTemplate = Handlebars.compile($('#notice-modal-template').html())

        $('.modal-title', noticeModal).text(notice.title)
        $('.modal-body', noticeModal).html(noticeModalTemplate(notice))

        // Allow closing of the modal on a background click
        noticeModal.modal({ backdrop: true, keyboard: true })

        event.preventDefault()
    })
    
    /*----------------------------------------------------------------------
        Add a Comment Form
    ----------------------------------------------------------------------*/

    // Show the comment form
    $(document).on('click', '#notice-modal a#show-comment-form', event => {
        $('#add-comment-form').slideDown(500)
        event.preventDefault()
    })

    // Hide the comment form
    $(document).on('click', '#add-comment-form .btn-cancel', event => {
        $('#add-comment-form').slideUp(500)
        event.preventDefault()
    })

    // Add comment submit event
    $(document).on('submit', '#add-comment-form', function(event) {
        /*
        Sample AJAX call for form data POST
        $.ajax({
            url: 'endpoint-uri',
            type: 'POST',
            dataType: 'json',
            data: $(this).serialize(),
            success(reponse) {
                
            },
            error(error) {
                log(`Response: ${error.status} | ${error.statusText}`)
            }
        })
        */

        alert(sprintf('%s form submit event', $(this).attr('id')))

        event.preventDefault()
    })

    /*----------------------------------------------------------------------
        Add a Notice Form
    ----------------------------------------------------------------------*/

    // Show the form for adding a new notice in a modal
    $('#add-notice').click(function(event) {
        $('.content-modal').attr('id', 'add-notice-modal')
        
        const addNoticeModal = $('#add-notice-modal')
        
        $('.modal-title', addNoticeModal).text('Add Notice')
        $('.modal-body', addNoticeModal).html($('#add-notice-form-template').html())

        // Prevent closing of the modal on a background click
        addNoticeModal.modal({ backdrop: 'static', keyboard: false })

        event.preventDefault()
    })

    // Capture the submit event on the new notice form
    $(document).on('submit', '#add-notice-form', function(event) {
        alert( sprintf('Form #%s submit event', $(this).attr('id')) )
        event.preventDefault()
    })

    $(document).on('click', '#add-notice-form .btn-cancel', function() {
        const confirmCancelDialogContent = confirmCancelDialog({ title: 'Your notice will not be added.' })
        $(this).closest('.modal-content').append(confirmCancelDialogContent)
    })

    /*----------------------------------------------------------------------
        Content Modal
    ----------------------------------------------------------------------*/

    /*
     Clear the content modal and reset it on hide
     All .modal contents could also be cleared on hide
     */
    $('.content-modal').on('hidden.bs.modal', function() {
        $('.modal-title, .modal-body', $(this)).empty()
        $(this).removeAttr('id')
        $(this).removeData('bs.modal') // Remove the bootstrap internal data var bs.modal to reinitialize the modal
    })

    /*----------------------------------------------------------------------
        Generic Modal Events/Functions
    ----------------------------------------------------------------------*/

    // Stop extra padding being applied to elements when a modal is shown
    $('.modal').on('shown.bs.modal', function() {
        $('body').css({ 'padding': 0 })
        $(this).css({ 'padding': 0 })
    })

    // Close all modals with a class of .modal
    $(document).on('click', '.close-modals', function() {
        $('.modal').modal('hide')
    })

    // Close the parent modal from inside the modal
    $(document).on('click', '.close-parent-modal', function() {
        const modal = $(this).closest('.modal')
        modal.modal('hide')
    })
    
    /*----------------------------------------------------------------------
        Confirm/Cancel Dialog Box
    ----------------------------------------------------------------------*/

    /*
     Cloning DOM Elements: https://stackoverflow.com/questions/6636622/create-element-from-template-element

     @param {string} title - The title of the confirm/cancel dialog box. Element is hidden if no value
     @param {string} message - The message of the confirm/cancel dialog box. Element has a default value
     @param {string} vAlign - Alignment of the confirm/cancel dialog box. Default top, 'center' vertically aligns center
     */
    const confirmCancelDialog = (options = {}) => {
        const template = $( $('#confirm-cancel-dialog-template').html() )
        const clone = template.clone()

        const { title, message, vAlign } = options

        // If a title option is present show it, otherwise bold the message content
        title ? $('.title', clone).text(title).removeClass('d-none') : $('.message', clone).addClass('font-weight-bold')

        if (message) {
            $('.message', clone).text(message)
        }
        
        if (vAlign && vAlign === 'center') {
            clone.addClass('v-align-center')
        }
        
        return clone
    }

    // Remove the confirm/cancel dialog box from the DOM when any button inside it is clicked
    $(document).on('click', '.confirm-cancel-dialog .btn', function() {
        $(this).closest('.confirm-cancel-dialog').remove()
    })

    /*----------------------------------------------------------------------
        Equal Height Notices
    ----------------------------------------------------------------------*/

    // https://getbootstrap.com/docs/4.6/layout/overview/
    const layoutType = () => {
        const viewportWidth = window.innerWidth

        // Bootstrap layout breakpoints
        const small = 576
        const medium = 768
        const large = 992
        const extraLarge = 1200
        
        if (viewportWidth < small) return 'extraSmall'
        if (viewportWidth >= small && viewportWidth < medium) return 'small'
        if (viewportWidth >= medium && viewportWidth < large) return 'medium'
        if (viewportWidth >= large && viewportWidth < extraLarge) return 'large'
        if (viewportWidth >= extraLarge) return 'extraLarge'
    }

    const equalHeightNotices = (event) => {
        let noticesPerRow = 1
        let row = 1
        let noticeMaxHeight = 0
        const noticeRowHeights = new Map()
        const notices = $('#notices .notice')

        if (notices.length === 0) {
            return
        }

        switch(layoutType()) {
            case 'medium':
                noticesPerRow = 2
                break
            case 'large':
            case 'extraLarge':
                noticesPerRow = 3
                break
        }

        if (event === 'pageLoad') {
            $('.content', notices).append($('<div>', { class: 'equal-height-padding' }))
        }

        if (noticesPerRow === 1 || event === 'pageResize') {
            $('.content > .equal-height-padding', notices).height(0)
        }

        notices.each(function(index, notice) {
            $(notice).attr('data-row', row)
            
            let noticeHeight = Math.round($(notice).height())
            
            if (noticeHeight > noticeMaxHeight) {
                noticeMaxHeight = noticeHeight
                noticeRowHeights.set(row, noticeMaxHeight)
            }

            // Increment the row and reset the max height per row based on how many notices are in a row for the layout type
            if ((index + 1) % noticesPerRow === 0) {
                row++
                noticeMaxHeight = 0
            }
        })

        notices.each(function(index, notice) {
            const row = parseInt($(notice).attr('data-row'))
            const noticeHeight = Math.round($(notice).height())
            const heightDifference = noticeRowHeights.get(row) - noticeHeight

            $('.content > .equal-height-padding', notice)
                .text(`Row: ${row} Height: ${noticeHeight} Height Diff: ${heightDifference}`)
                .height(heightDifference)
        })
    }

    /*----------------------------------------------------------------------
        Ads
    ----------------------------------------------------------------------*/

    // Ad click event
    $(document).on('click', '#ads .ad', function() {
        const href = $(this).attr('data-href')
        if (href !== '') {
            window.open(href)
        }
    })

    /*----------------------------------------------------------------------
        Page Load Events
    ----------------------------------------------------------------------*/

    injectTemplates('templates.html')

    // Disable in-built browser form validation
    $('form').attr('novalidate', 'novalidate')

    /*----------------------------------------------------------------------
        Page Resize Events
    ----------------------------------------------------------------------*/

    window.addEventListener('resize', () => {
        equalHeightNotices('pageResize')
    })
    
})
