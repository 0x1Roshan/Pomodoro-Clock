new Vue({
	el: '#app',
	data: {
		minutes: 25,
		seconds: 00,
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
			if (this.minutes == 00 && this.seconds == 00) {
				return;
			}

			if (this.seconds == 0) {
				var seconds = this.makeTwoDigit(59);
				this.seconds = seconds;

				var minutes = this.makeTwoDigit(this.minutes);
				this.minutes = minutes - 1;
			} else {
				var seconds = this.makeTwoDigit(this.seconds);
				this.seconds = seconds - 1;
			}
		},
		makeTwoDigit: function (number) {
		 	number = ("0" + number).slice(-2);

			return parseInt(number);
		}
	}
});
