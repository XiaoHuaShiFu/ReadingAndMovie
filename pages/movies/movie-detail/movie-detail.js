var util = require('../../../utils/util.js');
var app = getApp();
// import {Movie} from 'class/Movie.js';
Page({
    data: {
        movie: {}
    },
    // onLoad: function (options){
    //     var movieId = options.id;
    //     var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    //     var movie = new Movie(url);
    //     movie.getMovieData(this.getData);
    // },
    // getData:function(data){
    //     this.setData({
    //         movie:data
    //     })
    // },
    

    onLoad: function (options) {
        var movieId = options.id;
        var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
        util.http(url, this.processDoubanData);
    },
    processDoubanData: function (data) {
        //data的判空
        if(!data) return;
        var director = {
            avatar: "",
            name: "",
            id: ""
        }
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                //avatars 是data的二级属性，如果不判空，在directors[0]为null时，编译器会报错
                director.avatar = data.directors[0].avatars.large
            }
            director.name = data.directors[0].name;
            director.id = data.directors[0].id;
        }
        var movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            genres: data.genres.join("、"),
            stars: util.convertToStarsArray(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: util.convertToCastString(data.casts),
            castsInfo: util.convertToCastInfos(data.casts),
            summary: data.summary
        }
        console.log(movie);
        this.setData({
            movie: movie
        })
    },
    viewMoviePostImg:function(event){
        var src = event.currentTarget.dataset.src;
        wx.previewImage({
            current:src,//当前显示图片的http链接
            urls:[src]//需要预览的图片http链接列表
        })
    }
})