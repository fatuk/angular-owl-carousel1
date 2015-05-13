(function () {
	'use strict';
	angular
		.module('angular-owl-carousel', [])
		.directive('owlCarousel', [
			'$parse',
			owlCarouselDirective
		]);

	function owlCarouselDirective($parse) {

		var owlOptions = [
			'items',
			'itemsDesktop',
			'itemsDesktopSmall',
			'itemsTablet',
			'itemsTabletSmall',
			'itemsMobile',
			'itemsCustom',
			'singleItem',
			'itemsScaleUp',
			'slideSpeed',
			'paginationSpeed',
			'rewindSpeed',
			'autoPlay',
			'stopOnHover',
			'navigation',
			'navigationText',
			'rewindNav',
			'scrollPerPage',
			'pagination',
			'paginationNumbers',
			'responsive',
			'responsiveRefreshRate',
			'responsiveBaseWidth',
			'baseClass',
			'theme',
			'lazyLoad',
			'lazyFollow',
			'lazyEffect',
			'autoHeight',
			'jsonPath',
			'jsonSuccess',
			'dragBeforeAnimFinish',
			'mouseDrag',
			'touchDrag',
			'addClassActive',
			'transitionStyle',
			// Callbacks
			'beforeUpdate',
			'afterUpdate',
			'beforeInit',
			'afterInit',
			'beforeMove',
			'afterMove',
			'afterAction',
			'startDragging',
			'afterLazyLoad'
		];

		return {
			restrict: 'A',
			transclude: true,
			link: function (scope, element, attributes, controller, $transclude) {

				var options = {},
					$element = $(element),
					owlCarousel = null,
					propertyName = attributes.owlCarousel;

				for (var i = 0; i < owlOptions.length; i++) {
					var opt = owlOptions[i];
					if (attributes[opt] !== undefined) {
						options[opt] = $parse(attributes[opt])();
					}
				}

				scope.$watchCollection(propertyName, function (newItems, oldItems) {
					if (owlCarousel) {
						owlCarousel.destroy();
					}
					$element.empty();

					for (var i in newItems) {
						$transclude(function (clone, scope) {
							scope.item = newItems[i];
							$element.append(clone[1]);
						});
					}


					$element.owlCarousel(options);
					owlCarousel = $element.data('owlCarousel');
				});
			}
		};
	}

})();