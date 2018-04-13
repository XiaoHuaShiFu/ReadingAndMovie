var postsData = require('../../../data/posts-data.js')
Page({
    data: {

    },

    onLoad: function (options) {
        var postId = options.id;
        this.data.currentPostId = postId;
        var postData = postsData.postList[postId];
        this.setData({
            postData: postData
        })

        var postsCollected = wx.getStorageSync('posts_Collected');
        if (postsCollected) {
            var postCollected = postsCollected[postId];
            this.setData({
                collected: postCollected
            })
        }
        else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_Collected', postsCollected);
        }
    },

    onCollectionTap: function (event) {
        this.getPostsCollectedSyc();
    },

    getPostsCollectedSyc:function(){
        var that = this.data.currentPostId;
        var postsCollected = wx.getStorageSync('posts_Collected');
        var postCollected = postsCollected[that];
        postCollected = !postCollected;

        postsCollected[that] = postCollected;
        this.showToast(postCollected, postsCollected);
    },
    
    getPostsCollectedAsy:function(){   
        var that = this;
        wx.getStorage({
            key:"posts_collected",
            success:function(res){
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.currentPostId];
                postCollected = !postCollected;
                postsCollected[that.data.currentPostId] = postCollected;
                that.showToast(postCollected, postsCollected);
            }
        })
    },

    showToast: function (postCollected, postsCollected) {
        wx.showToast({
            title: postCollected ? '收藏成功' : '取消成功',
            icon: 'success',
            duration: 1000
        })
        
        wx.setStorageSync('posts_Collected', postsCollected);
        this.setData({
            collected: postCollected
        })
    },
    onShareTap:function(event){
        var itemList = [
            '分享给微信好友',
            '分享到朋友圈',
            '分享到QQ',
            '分享到微博'
        ];
        wx.showActionSheet({
            itemList: itemList,
            success: function (res) {
                wx.showModal({
                    title: itemList[res.tapIndex],
                    content:"是否要" + itemList[res.tapIndex] + "？"
                })
            }
        })
    }

})