$("#commentArea").hide();
$("#commentSendButton").hide();
//клик по далее
$('#commentShowButton').click(function () {
    id=$(this).data('id');
    console.log(id);
    $("#commentArea"+id).show();
    $("#commentSendButton"+id).show();
});