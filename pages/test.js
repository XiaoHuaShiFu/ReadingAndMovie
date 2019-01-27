Page({
    data:{
        tempFilePath:"/images/welcome/image1.jpg"
    },

    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    formReset: function () {
        console.log('form发生了reset事件')
    },

    ontap : function(e) {
        var that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                that.setData({
                    tempFilePath: tempFilePaths[0]
                })
            }
        })
    }
})