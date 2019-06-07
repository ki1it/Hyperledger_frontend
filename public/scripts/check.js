// $("#inputNum").change(function() {
//     // alert('ddddd');
//     checkNum();
// });
//
// function checkNum()
// {
//     var num = document.getElementById('inputNum');
//     console.log(num.value)
//     if (num.value !== '') {
//         var request = new XMLHttpRequest();
//         request.open('GET', '/addDocument/checkNum?Num=' + num.value, true);
//         request.send();
//         request.onreadystatechange = function (response) {
//             if (request.responseText === "null") {
//                 alert('Документ с этим номером уже существует. Введите другой');
//                 num.value = '';
//             }
//         }
//     }
// }
//
// $("#inputType").change(function() {
//     // alert('ddddd');
//     checkType();
// });
//
// function checkType()
// {
//     var num = document.getElementById('inputType');
//     if (num.value !== '') {
//         var request = new XMLHttpRequest();
//         request.open('GET', '/addDocument/checkType?Name=' + num.value, true);
//         request.send();
//         request.onreadystatechange = function (response) {
//             if (request.responseText === "null") {
//                 alert('Такого типа не существует. Введите другой');
//                 num.value = '';
//             }
//         }
//     }
// }