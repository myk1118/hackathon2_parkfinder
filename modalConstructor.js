/**Object constructor for image and news modals*/
class Modal {
    /**constructor receives the pre-made DOM element*/
    constructor(domDisplay) {
        this.domDisplay = domDisplay;
    }

    /**createModal creates a div to display the passed in DOM element*/
    createModal() {
        var newModal = $('<div>', {
            id: 'modal',
        });

        /**modalClose is the close button for the modal, the modal is deleted when the button is clicked*/
        var modalClose = $('<button id="modalClose">&times;</button>').on('click', this.deleteModal);

        /**The modal is appended to the body, this.domDisplay is appended to the modal, and the x button is appended to this.domDisplay*/
        $('body').append(newModal);
        newModal.append(this.domDisplay);
        $(this.domDisplay).append(modalClose);
    }
    
    /**deleteModal is called when the modal's close button is clicked*/
    deleteModal() {
        var modal = $(this).parent().parent();
        modal.remove();
    }
}
