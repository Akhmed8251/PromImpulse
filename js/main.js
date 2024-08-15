document.addEventListener('DOMContentLoaded', () => {
	/*
		1. по клику на пункты верхнего меню открывать дропдаун
		2. по клику (повторному) на эти пункты - закрывать дропдаун
		3. по клику в любое место сайта, кроме меню - закрывать дропдаун
	*/

	const menuBtns = document.querySelectorAll('.nav-item__btn');
	const drops = document.querySelectorAll('.nav-dropdown');

	menuBtns.forEach(el => {
		el.addEventListener('click', (e) => {
			let currentBtn = e.currentTarget;
			let drop = currentBtn.closest('.nav-item').querySelector('.nav-dropdown');

			menuBtns.forEach(el => {
				if (el !== currentBtn) {
					el.classList.remove('nav-item__btn_active');
				}
			});

			drops.forEach(el => {
				if (el !== drop) {
					el.classList.remove('nav-dropdown_active');
				}
			});

			drop.classList.toggle('nav-dropdown_active');
			currentBtn.classList.toggle('nav-item__btn_active');
		});
	});

	document.addEventListener('click', (e) => {
		if (!e.target.closest('.header-nav')) {
			menuBtns.forEach(el => {
				el.classList.remove('nav-item__btn_active');
			});

			drops.forEach(el => {
				el.classList.remove('nav-dropdown_active');
			});
		}
	});


	const resizableSwiper = (breakpoint, swiperClass, swiperSettings) => {
		let swiper;
	
		breakpoint = window.matchMedia(breakpoint);
	
		const enableSwiper = function(className, settings) {
		  swiper = new Swiper(className, settings);
		}
	
		const checker = function() {
		  if (breakpoint.matches) {
			return enableSwiper(swiperClass, swiperSettings);
		  } else {
			if (swiper !== undefined) swiper.destroy(true, true);
			return;
		  }
		};
	
		breakpoint.addEventListener('change', checker);
		checker();
	}
	
	
	resizableSwiper(
		'(max-width: 1024px)',
		'.hero-benefits__slider',
		{
			spaceBetween: 20,
			navigation: {
				nextEl: ".hero-benefits__navigation-btn_next",
				prevEl: ".hero-benefits__navigation-btn_prev"
			},
			breakpoints: {
				320: {
					slidesPerView: 1
				},
				426: {
					slidesPerView: 2
				},
				576: {
					slidesPerView: 3
				}
			}
		},
	);

	new Swiper(".partners__slider", {
		slidesPerView: 8.5,
		spaceBetween: 10,
		freeMode: {
			enabled: true
		},
		navigation: {
			nextEl: ".partners__header .partners__navigation-btn_next",
			prevEl: ".partners__header .partners__navigation-btn_prev"
		}
	})

	const objectNumbers = document.querySelectorAll('.objects__info-number')

	const animateNumbersFn = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				$(entry.target).animate({num: entry.target.dataset.number}, {
					duration: 2500,
					easing: "swing",
					step: function(num) {
						entry.target.innerHTML = num.toFixed(0)
					}
				})
				observer.unobserve(entry.target)
			}
		})
	}

	const observerForAnimateNumbers = new IntersectionObserver(animateNumbersFn)
	objectNumbers.forEach((number) => {
		observerForAnimateNumbers.observe(number)
	})

	
	const objectsMap = document.querySelector(".objects__map") 
	const objectMapLabels = document.querySelectorAll(".objects__group-label")
	const animateMapLabelsFn = (entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				objectMapLabels.forEach(label => {
					const labelOrder = parseInt(label.closest(".objects__group").dataset.order)
					const delay = 0.2 * labelOrder
					label.style.transitionDelay = `${delay.toFixed(1)}s`
					label.classList.add("objects__group-label_visible")
				})
				observer.unobserve(entry.target)
			}
		})
	}
	
	const observeForAnimateMapLabels = new IntersectionObserver(animateMapLabelsFn)
	observeForAnimateMapLabels.observe(objectsMap)


	// const objectGroups = document.querySelectorAll(".objects__group")
	// objectGroups.forEach(group => {
	// 	const groupOrder = group.dataset.order
	// 	const groupLabel = group.querySelector(".objects__group-label")

	// 	const labelByOrder = document.querySelector(`.objects__map [id=object-${groupOrder}]`)
	// 	if (labelByOrder) {
	// 		groupLabel.append(labelByOrder)
	// 	}
	// })

	// const objectGroups = document.querySelectorAll(".objects__group")
	// objectGroups.forEach(groupElem => {
	// 	groupElem.addEventListener("mouseover", function(evt) {
	// 		groupElem.classList.add("_active")
	// 		const groupOrder = groupElem.dataset.order
	// 		const objectCard = document.querySelector(`.object-card[data-group-order='${groupOrder}']`)

	// 		if (objectCard) {
	// 			const groupLabel = groupElem.querySelector(".objects__group-label")
	// 			// console.log(groupLabel.getBoundingClientRect())
	// 			// const groupLabelPosX = groupLabel.getBoundingClientRect().left
	// 			// const groupLabelPosY = groupLabel.getBoundingClientRect().top
	// 			const cardPosX = groupLabel.getBoundingClientRect().left - objectsMap.getBoundingClientRect().left
	// 			const cardPosY = groupLabel.getBoundingClientRect().top - objectsMap.getBoundingClientRect().top
	// 			objectCard.style.left = cardPosX + "px"
	// 			objectCard.style.top = cardPosY + "px"
	// 			objectCard.classList.add("_active")

	// 			objectCard.addEventListener("mouseover", function() {
	// 				objectCard.classList.add("_active")
	// 			})

	// 			objectCard.addEventListener("mouseout", function() {
	// 				objectCard.classList.remove("_active")
	// 			})
	// 		}
	// 	})

	// 	groupElem.addEventListener("mouseout", function(evt) {
	// 		groupElem.classList.remove("_active")
	// 		const groupOrder = groupElem.dataset.order
	// 		const objectCard = document.querySelector(`.object-card[data-group-order='${groupOrder}']`)
	// 		if (objectCard) {
	// 			objectCard.classList.remove("_active")
	// 		}
	// 	})
	// })

	const resetObjGroups = () => {
		objectGroups.forEach(groupItem => {
			groupItem.classList.remove("_active")

			const activeObjCard = document.querySelector(".object-card._active")
			if (activeObjCard) {
				activeObjCard.classList.remove("_active")
			}
		})
	}

	const objectGroups = document.querySelectorAll(".objects__group")
	objectsMap.addEventListener("mouseover", function(evt) {
		objectGroups.forEach(groupItem => {
			if (evt.target.parentNode == groupItem) {
				resetObjGroups()
				groupItem.classList.add("_active")

				const groupOrder = groupItem.dataset.order
				const objectCard = document.querySelector(`.object-card[data-group-order='${groupOrder}']`)
				if (objectCard) {
					const groupLabel = groupItem.querySelector(".objects__group-label")
					const groupLabelW = groupLabel.getBoundingClientRect().width
					const groupLabelH = Math.round(groupLabel.getBoundingClientRect().height)

					let cardPosX = groupLabel.getBoundingClientRect().left - objectsMap.getBoundingClientRect().left - groupLabelW - 10
					const cardPosY = groupLabel.getBoundingClientRect().top - objectsMap.getBoundingClientRect().top + groupLabelH + 10
					const clientW = window.innerWidth - 40
					const cardW = objectCard.offsetWidth
					const isOutOfClientWidth = cardPosX + objectsMap.getBoundingClientRect().left + cardW > clientW
					if (isOutOfClientWidth) {
						cardPosX -= 200
					}
					objectCard.style.left = cardPosX + "px"
					objectCard.style.top = cardPosY + "px"
					objectCard.classList.add("_active")

					objectCard.addEventListener("mouseover", function() {
						groupItem.classList.add("_active")
						objectCard.classList.add("_active")
					})
				}
			}
		})

		if (evt.target.parentNode == objectsMap) {
			const activeObjGroup = document.querySelector(".objects__group._active")
			if (activeObjGroup) {
				const activeObjCard = document.querySelector(".object-card._active")
				if (activeObjCard) {
					activeObjGroup.classList.remove("_active")
					activeObjCard.classList.remove("_active")
				}
			}
		}
	})

	const aboutMoreBtn = document.querySelector(".about__more-btn")
	aboutMoreBtn.addEventListener("click", function() {
		const aboutMoreText = document.querySelector(".about__more-text")
		
		if (aboutMoreText.classList.contains("_show")) {
			aboutMoreText.style.maxHeight = 0
			aboutMoreBtn.classList.remove("_active")
		} else {
			aboutMoreText.style.maxHeight = aboutMoreText.scrollHeight + "px"
			aboutMoreBtn.classList.add("_active")
		}

		aboutMoreText.classList.toggle("_show")
	})

	new Swiper(".about__slider", {
		navigation: {
			nextEl: ".about__navigation-btn_next",
			prevEl: ".about__navigation-btn_prev"
		}
	})

	// objectsMap.addEventListener("mouseout", function(evt) {
	// 	objectGroups.forEach(groupItem => {
	// 		if (evt.target.parentNode == groupItem) {
	// 			groupItem.classList.remove("_active")

	// 			const groupOrder = groupItem.dataset.order
	// 			const objectCard = document.querySelector(`.object-card[data-group-order='${groupOrder}']`)
	// 			if (objectCard) {
	// 				objectCard.classList.remove("_active")
	// 			}
	// 		}
	// 	})
	// })
	
});