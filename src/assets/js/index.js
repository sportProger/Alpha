import 'reset.css'
import '../css/style.scss'
import { PageFlip } from 'page-flip';

const
	w = window.innerWidth,
	h = window.innerHeight

document.addEventListener('DOMContentLoaded', function() {

	const pageFlip = new PageFlip(
		document.getElementById("demoBookExample"),
		{
			width: w / 2,
			height: h,
			size: 'fixed',

			maxShadowOpacity: 0.5, // Half shadow intensity
			showCover: true,
			mobileScrollSupport: false,
		}
	);

	// load pages
	pageFlip.loadFromHTML(document.querySelectorAll(".page"));

	document.querySelector(".page-total").innerText = pageFlip.getPageCount();
	document.querySelector(
		".page-orientation"
	).innerText = pageFlip.getOrientation();

	document.querySelector(".btn-prev").addEventListener("click", () => {
		pageFlip.flipPrev()
	});

	document.querySelector(".btn-next").addEventListener("click", () => {
		pageFlip.flipNext();
	});
});
