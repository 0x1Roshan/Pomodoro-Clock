new Vue({
	el: '#app',
	data: {
		minutes: 24,
		seconds: 59,
	},
	methods: {
		start: function () {
			setInterval(this.countDown, 1000);
		},
		countDown: function () {
			if (this.minutes == 0 && this.seconds == 0) {
				return;
			}

			if (this.seconds == 0) {
				this.seconds = 59;
				this.minutes--;
			} else {
				this.seconds--;
			}
		}
	}
});
