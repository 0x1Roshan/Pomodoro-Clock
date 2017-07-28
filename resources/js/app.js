new Vue({
	el: '#app',
	data: {
		minutes: 24,
		seconds: 59,
		running: false
	},
	methods: {
		start: function () {
			if (!this.running) {
				this.running = true;
				setInterval(this.countDown, 1000);
			} else {
				return;
			}
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
