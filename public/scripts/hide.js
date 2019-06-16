// $("#commentArea").hide();
// $("#commentSendButton").hide();
$('.hideThis').hide();
//клик по далее
$('.commentBut').click(function () {
    id=$(this).data('id');
    // console.log(id);
    let str1 = "#commentArea"+id
    let str2 = "#commentSendButton"+id
    $(str1).show();
    $(str2).show();
});

function sendComment(userid,DocId) {
    console.log(DocId)
    $.ajax({
        type: 'POST',
        url: '/signdocs/comment',
        data: {UserId: userid , DocId:  DocId , Comment:  document.getElementById('commentArea'+id).value }
    });
    location.reload();
}
