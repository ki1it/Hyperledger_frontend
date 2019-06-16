const fetch = require("node-fetch");
async function getParticipantName(id) {
    let type = id.split('.')[3].split('#')
    let personId = type[1]
    type = type[0]
    let response
    let url = process.env.API_IP+'api/'+type+'/'+personId
    response = await fetch(url,{ method: 'GET'})
    return await response.json()

}

function intersection(setA, setB) {
    var _intersection = new Set();
    for (var elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}

function difference(setA, setB) {
    var _difference = new Set(setA);
    for (var elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}
function formatDate(date) {var dd = date.getDate(); if (dd < 10) dd = '0' + dd; var mm = date.getMonth() + 1; if (mm < 10) mm = '0' + mm; var yyyy = date.getFullYear() ; return dd + '.' + mm + '.' + yyyy;}


module.exports.getParticipantName = getParticipantName
module.exports.intersection = intersection
module.exports.difference = difference
module.exports.formatDate = formatDate