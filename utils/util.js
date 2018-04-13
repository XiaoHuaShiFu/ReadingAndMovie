function convertToStarsArray(stars) {
    var array = [];
    for (var i = 0; i < 5; stars = stars - 10, i++) {
        if (stars > 0) array.push(1);
        else array.push(0);
    }
    return array;
}

function http(url,callBack) {
    var that = this;
    wx.request({
        url: url,
        success: function (res) {
            callBack(res.data);
        },
        fail: function (res) {
            console.log("failed");
        }
    })
}
function convertToCastString(casts){
    var castsjoin = "";
    for(var idx in casts){
        castsjoin = castsjoin + casts[idx].name + '/';
    }
    return castsjoin.substring(0,castsjoin.length - 2);
}

function convertToCastInfos(casts){
    var castsArray = [];
    for(var idx in casts){
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}

module.exports = {
    convertToStarsArray: convertToStarsArray,
    http:http,
    convertToCastString: convertToCastString,
    convertToCastInfos: convertToCastInfos
}