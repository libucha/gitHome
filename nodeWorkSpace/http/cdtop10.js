var  http = require('https');
var  cheerio = require('cheerio'); 
var url = 'https://www.cnbeta.com/top10.htm'
	function printData(data){
		data.forEach( function(item) {
			var chapterTitle = item.chapterTitle;
			console.log(chapterTitle+'\n');
			console.log(item.content+'\n');
		});
}
	function mycontent(html){
	var $ = cheerio.load(html);
	var chapters = 	$('.item')
	var chapterData = [];
	chapters.each(function(itme) {
		var chapter = $(this);
		var chapterTitle = chapter.find('dt').children('a').text();
		// var chapterDescription = chapter.find('.chapter-description').text();
		var content  =  chapter.find('dd').children('p').text();
		var data = {
			chapterTitle:chapterTitle,
			content:content
		}
		// videos.each(function(item) {
		// 	var video = $(this)
		// 	var videoTile =video.find('a').text();
		// 	var videoId =video.find('a').attr('href').split('/video/')[1]
		// 	var videoData ={
		// 		videoTile:videoTile,
		// 		videoId:videoId
		// 	}
		// 	data.videos.push(videoData)
			
		// });
		chapterData.push(data);
	});

		return chapterData;
}
http.get(url,function(res){
	var html =''
	res.on('data', function(data) {
		html +=data;
	})
	res.on('end', function(){
		var data = mycontent(html)
		printData(data);
	})

}).on('error', function() {
		console.log('获取页面失败')
	})