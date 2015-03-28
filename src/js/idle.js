var $ = require('jquery'),
	idle = function($target) {
		return function() {
			$target.addClass('idle');
			$target.data('timer', undefined);
		};
	},
	activity = function($target) {
		return function() {
			var timer = $target.data('timer');
			
			$target.removeClass('idle');

			if(timer) {
				clearTimeout(timer);
			}

			$target.data('timer', setTimeout(idle($target), 2000));
		}
	};

module.exports = function(target) {
	var $target = $(target);

	$(target).on('mousemove', activity($target));
	$(target).on('click', activity($target));
}