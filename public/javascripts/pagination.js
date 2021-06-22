window.onload = () => {
	let link = window.location.href;
	let page = parseInt(link.split('/').pop().split('?')[0]);
	let query = link.split('=').pop();
	let pageCount = parseInt(document.getElementById('pagination-forward').children[0].href.split('/').pop());
	console.log('pagecount: ', pageCount)

    let btnBack = document.getElementById('pagination-back');
    let btn1 = document.getElementById('pagination-1');
    let btn2 = document.getElementById('pagination-2');
    let btn3 = document.getElementById('pagination-3');
    let btnForward = document.getElementById('pagination-forward');

	btnBack.children[0].href = query == link ? "/p/1" : "/p/1?query=" + query;
	btnForward.children[0].href = query == link ? `/p/${pageCount}` : `/p/${pageCount}?query=${query}`;

	if (page <= 1 && pageCount > 2) {
		btn1.classList.add('active');
		btn1.children[0].href = query == link ? "/p/1" : "/p/1?query=" + query;
		btn1.children[0].innerHTML = 1;
		btn2.children[0].href = query == link ? "/p/2" : "/p/2?query=" + query;
		btn2.children[0].innerHTML = 2;
		btn3.children[0].href = query == link ? "/p/3" : "/p/3?query=" + query;
		btn3.children[0].innerHTML = 3;
	} else if (page >= pageCount && pageCount > 2) {
		btn3.classList.add('active');
		btn1.children[0].href = query == link ? `/p/${page - 2}` : `/p/${page - 2}?query=` + query;
		btn1.children[0].innerHTML = page - 2;
		btn2.children[0].href = query == link ? `/p/${page - 1}` : `/p/${page - 1}?query=` + query;
		btn2.children[0].innerHTML = page - 1;
		btn3.children[0].href = query == link ? `/p/${page}` : `p//${page}?query=` + query;
		btn3.children[0].innerHTML = page;
	} else if (page >= pageCount) {
		console.log('a');
		btn1.classList.add('active');
		btn1.children[0].href = query == link ? `/p/${page}` : `/p/${page}?query=` + query;
		btn1.children[0].innerHTML = page;
		btn2.remove();
		btn3.remove();
		btnBack.remove();
		btnForward.remove();
	} else {
        btn2.classList.add('active');
		btn1.children[0].href = query == link ? `/p/${page - 1}` : `/p/${page - 1}?query=` + query;
		btn1.children[0].innerHTML = page - 1;
		btn2.children[0].href = query == link ? `/p/${page}` : `/p/${page}?query=` + query;
		btn2.children[0].innerHTML = page;
		btn3.children[0].href = query == link ? `/p/${page + 1}` : `/p/${page + 1}?query=` + query;
		btn3.children[0].innerHTML = page + 1;
    }
}