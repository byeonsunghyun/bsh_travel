function toggleAdminCreate() {
	const box = document.getElementById('adminCreateBox');
	box.classList.toggle('collapsed');
}

function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('active');
    }
    /*function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('active');
    }*/
    // 각 섹션으로 스크롤하는 함수
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
	document.querySelectorAll('.place-link').forEach(link => {
	    link.addEventListener('click', function (e) {
	        e.preventDefault(); // 🔥 기본 앵커 점프 막기
	        const targetId = this.getAttribute('href').substring(1);
	        const target = document.getElementById(targetId);
	        if (target) {
	            target.scrollIntoView({
	                behavior: 'smooth',
	                block: 'start'
	            });
	        }
	    });
	});
    // 스크롤 시 버튼 보이게
    window.addEventListener('scroll', function () {
        const button = document.getElementById('scrollTopButton');
        if (window.scrollY > 100) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });
	window.addEventListener('scroll', () => {
		const adminCreate = document.querySelector('.admin-create-fixed');
		if (!adminCreate) return;

		if (window.scrollY > 700) {
			adminCreate.classList.add('show');
		} else {
			adminCreate.classList.remove('show');
		}
	});
    // 스크롤 맨 위로 이동
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const slides = document.querySelectorAll(".image-slide");
    let currentIndex = 0;
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }
    document.addEventListener("DOMContentLoaded", function () {
        const modal = document.getElementById("image-modal");
        const modalImg = document.getElementById("modal-img");
        const caption = document.getElementById("caption");
        const closeBtn = document.querySelector(".close-btn");
        let currentSlides = [];
        let currentIndex = 0;
        // 슬라이드 보여주는 함수
        function showSlide(index) {
            if (index >= 0 && index < currentSlides.length) {
                modalImg.src = currentSlides[index].src;
                caption.textContent = currentSlides[index].alt || "";
            }
        }
        // 모든 슬라이더 처리
        document.querySelectorAll('.outer-slider-container').forEach(container => {
            const slides = container.querySelectorAll(".image-slide");
            const leftBtn = container.querySelector(".left-btn");
            const rightBtn = container.querySelector(".right-btn");
            // 페이지 슬라이더 좌우 버튼
            if (slides.length > 1) {
                let index = 0;
                function showPageSlide(i) {
                    slides.forEach((slide, idx) => {
                        slide.classList.toggle("active", idx === i);
                    });
                }
                leftBtn?.addEventListener("click", () => {
                    index = (index - 1 + slides.length) % slides.length;
                    showPageSlide(index);
                });
                rightBtn?.addEventListener("click", () => {
                    index = (index + 1) % slides.length;
                    showPageSlide(index);
                });
                showPageSlide(index);
            } else {
                // 슬라이드가 하나면 버튼 숨김
                leftBtn?.style.setProperty("display", "none");
                rightBtn?.style.setProperty("display", "none");
                slides[0]?.classList.add("active");
            }
            // 이미지 클릭 시 모달 열기
            slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    modal.style.display = "flex";
                    currentSlides = Array.from(slides);
                    currentIndex = idx;
                    showSlide(currentIndex);
                });
            });
        });
        // 모달 이미지 클릭 시 다음 슬라이드
        modalImg.addEventListener("click", () => {
            if (currentSlides.length > 0) {
                currentIndex = (currentIndex + 1) % currentSlides.length;
                showSlide(currentIndex);
            }
        });
        // 모달 닫기
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    });
    document.querySelectorAll('.desc').forEach(el => {
    	  let raw = el.textContent;

    	  let html = raw
    	  	
    	    // 줄바꿈
    	    .replace(/\r?\n/g, '<br>')
    	    
    	    .replace(
  /\[b\](.*?)\[\/b\]/g,
  '<strong>$1</strong>'
)


    	    // 🔗 링크 [link:url]text[/link]
    	    .replace(
    	      /\[link:(https?:\/\/[^\]]+)\](.*?)\[\/link\]/g,
    	      '<a href="$1" target="_blank" class="desc-link">$2</a>'
    	    )

    	    // 🌸 컬러 [color:xxx]text[/color]
    	    .replace(
    	      /\[color:(.*?)\](.*?)\[\/color\]/g,
    	      '<span style="color:$1">$2</span>'
    	    );

    	  el.innerHTML = html;
    	});
