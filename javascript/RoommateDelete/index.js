/* global $ */

$(document).ready(function () {
  $('#delete-roommate').click(deleteRoommate)
})

const deleteRoommate = function () {
  if (confirm('Delete this roommate request?')) {
    const roommateId = $(this).data('id')
    $.ajax({
      url: './properties/Roommate/' + roommateId,
      dataType: 'json',
      type: 'delete',
      success: function () {
        window.location.href('./properties/Roommate/list')
      }.bind(this),
      error: function () {}.bind(this),
    })
  }
}
