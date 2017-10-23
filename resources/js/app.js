new Vue({
	el: '#app',
	data: {
		minutes: 25,
		seconds: 0,
		running: false,
		breakMinutes: 5,
		breakSeconds: 0,
		lengthMinutes: 20,
		lengthSeconds: 0
	},
	methods: {
		startPomodoro: function () {
			if (!this.running) {
				this.running = true;
				timer = setInterval(this.countDown, 1000, "pomodoro");
			} else {
				return;
			}
		},
		startBreak: function (prevBreakMinutes) {
			setInterval(this.countDown, 1000, "break", prevBreakMinutes);
		},
		countDown: function (type, prevBreakMinutes) {
			if ( type == "pomodoro" ) {
				if ( this.seconds == 0 ) {
					if ( this.minutes != 0 ) {
						var seconds = this.makeTwoDigit( 59 );
						this.seconds = seconds;

						var minutes = this.makeTwoDigit( this.minutes );
						this.minutes = minutes - 1;
					} else {
						this.minutes = this.lengthMinutes;
						this.seconds = this.lengthSeconds;
						this.running = false;
						clearInterval(timer);
					}
				} else {
					var seconds = this.makeTwoDigit( this.seconds );
					this.seconds = seconds - 1;
				}
			}

			if ( type=="break" ) {
				if (this.breakMinutes == 0 && this.breakSeconds == 0 ) {
					this.breakMinutes = prevBreakMinutes;

					this.running = false;
					return;
				}

				if ( this.breakSeconds == 0 ) {
					var seconds = this.makeTwoDigit( 59 );
					this.breakSeconds = seconds;

					var minutes = this.makeTwoDigit( this.breakMinutes );
					this.breakMinutes = minutes - 1;
				} else {
					var seconds = this.makeTwoDigit( this.breakSeconds );
					this.breakSeconds = seconds - 1;
				}
			}
		},

		makeTwoDigit: function (number) {
		 	number = ("0" + number).slice( -2 );

			return parseInt( number );// [FIXME RC]parseInt isnot working as expected
		},

		minusBreakMinutes: function () {
			if (this.breakMinutes == 0) {
				return;
			}

			this.breakMinutes--;
		},

		plusBreakMinutes: function () {
			if ( this.breakMinutes == 10 ) {
				return;
			}

			this.breakMinutes++;
		},

		minusLengthMinutes: function () {
			if (this.lengthMinutes == 0) {
				return;
			}

			this.lengthMinutes--;

			if (!this.running) {
				this.minutes = this.lengthMinutes;
			}
		},

		plusLengthMinutes: function () {
			if (this.lengthMinutes == 25) {
				return;
			}

			this.lengthMinutes++;

			if (!this.running) {
				this.minutes = this.lengthMinutes;
			}
		}
	},

	mounted: function () {
		this.minutes = this.lengthMinutes;
	}
});
