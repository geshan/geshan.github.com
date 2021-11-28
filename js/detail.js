document.addEventListener('DOMContentLoaded', function () {
	const accordion = document.getElementsByClassName('accordion');
	let i;
  
	for (i = 0; i < accordion.length; i++) {
	  accordion[i].addEventListener('click', function () {
		this.classList.toggle('active');
		const panel = this.nextElementSibling;
		if (panel.style.display === 'block') {
		  panel.style.display = 'none';
		} else {
		  panel.style.display = 'block';
		}
	  });
	}
  });
  
  function goTop() {
	window.scroll({ top: 0, behavior: 'smooth' });
  }
  