var postData = require('../../data/posts-data.js')

Page({
    data: {
       
    },

    onPostTap: function (event) {
        var postId = event.currentTarget.dataset.postid;
        //currentTaget指的是事件捕获的组件，target指的是点击的组件
        wx.navigateTo({
            url: 'post-detail/post-detail?id=' + postId,  //传递变量id=postId给post-detail.js
        })
    },

    onLoad: function (options) {
    
        this.setData({
            posts_key:postData.postList
        });
    }
})