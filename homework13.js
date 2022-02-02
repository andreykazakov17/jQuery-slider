// Инициализируем глобальные переменные и функции

const $form = $("#search-form");
const $sliderWrapper = $(".carousel-inner");

let $videoElem;
const $prevBtn = $(".carousel-control-prev")[0];
const $nextBtn = $(".carousel-control-next")[0];
let text;

const noContent = () => {
	if($sliderWrapper.children().length === 0) {
		let $infoElem = $("<p class='h5'>No data.</p>");
		$sliderWrapper[0].append($infoElem[0]);
	}
};
noContent();

console.log($("body"));


// Обработка запроса

const getVideos = (text) => {
	$.get("https://itunes.apple.com/search?limit=10&entity=musicVideo&", { term: text})
		.done((response) => viewVideo(response))
		.fail((error) => console.log(error));
};

$form.on("submit", (event) => {
	event.preventDefault();

	text = $("input").val();

	if(text.trim()) {
		getVideos(text);
	}

	if($sliderWrapper.children().length !== 0) {
		$sliderWrapper.empty();
	}

	if(($sliderWrapper.children().length === 0) && !text.trim()) {
		noContent();
	}
});


// Создание контента на странице и обработчики событий на кнопках

const viewVideo = (response) => {
	
	let arr = JSON.parse(response);
	let results = arr.results;
	console.log(results);
	let videosArr = [];

	let $artistTitle = $(`<h5 class='title mb-4'>Клипы по запросу: ${text}</h5>`);
	$sliderWrapper[0].prepend($artistTitle[0]);


	for(let i = 0; i < results.length; i++) {
		$videoElem = $("<video class='carousel-item'></video>");
		
		$videoElem.attr({
			src: results[i].previewUrl,
			controls: true
		});
		
		$sliderWrapper[0].append($videoElem[0]);

		if(i === 0) {
			$videoElem.addClass("active");
		}

		videosArr.push($videoElem);
	}

	let $videosColl = $sliderWrapper.children("video");
	console.log($videosColl);
	

	$('#carouselExampleControls').on('click', function (e) {

		console.log(e.target);

		// Нативный js

		// if(!e.target.classList.contains("active")) {
		// 	for(let vid of $videosColl) {
		// 		vid.pause();
		// 	}
		// }

		if(!e.target.classList.contains("active")) {
			$("video").each((idx, el) => {
				el.pause();
			});
		}
	});
};