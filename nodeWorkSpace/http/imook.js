var  http = require('http');
var  cheerio = require('cheerio'); 
var url = 'http://www.imooc.com/learn/348'
	function printData(data){
		data.forEach( function(item) {
			var chapterTitle = item.chapterTitle;
			console.log(chapterTitle+'\n');
			item.videos.forEach( function(item) {
				var videoTile = item.videoTile;
				var videoId = item.videoId
				console.log(videoTile+'\n')
				console.log(videoId+'\n')
			});
		});
}
	function mycontent(html){
	var $ = cheerio.load(html);
	var chapters = 	$('.chapter')
	var chapterData = [];
	chapters.each(function(itme) {
		var chapter = $(this);
		var chapterTitle = chapter.find('h3').text();
		// var chapterDescription = chapter.find('.chapter-description').text();
		var videos  =  chapter.find('.video').children('li');
		var data = {
			chapterTitle:chapterTitle,
			videos:[]
		}
		videos.each(function(item) {
			var video = $(this)
			var videoTile =video.find('a').text();
			var videoId =video.find('a').attr('href').split('/video/')[1]
			var videoData ={
				videoTile:videoTile,
				videoId:videoId
			}
			data.videos.push(videoData)
			
		});
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