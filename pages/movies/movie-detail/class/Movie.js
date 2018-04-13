var util = require('../../../../utils/util.js');
class Movie {
    constructor(url) {
        this.url = url;
    }
    getMovieData(cb) {
        this.cb = cb;
        console.log(this);
        util.http(this.url, this.processDoubanData.bind(this));
    }
    processDoubanDat(data) {
        //data的判空
        if (!data) return;
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
        this.cb(movie);
    }
}
export {Movie};