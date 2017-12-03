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
		startPomodoro() {
			if (!this.running) {
				this.running = true;
				timer = setInterval(this.countDown, 1000, "pomodoro");
			} else {
				return;
			}
		},
		startBreak(prevBreakMinutes) {
			timer = setInterval(this.countDown, 1000, "break", prevBreakMinutes);
		},
		countDown(type, prevBreakMinutes) {
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

						this.startBreak(this.breakMinutes);
					}
				} else {
					var seconds = this.makeTwoDigit( this.seconds );
					this.seconds = seconds - 1;
				}
			}

			if ( type=="break" ) {
				if ( this.breakSeconds == 0 ) {
					var seconds = this.makeTwoDigit( 59 );
					this.breakSeconds = seconds;

					var minutes = this.makeTwoDigit( this.breakMinutes );
					this.breakMinutes = minutes - 1;
				} else {
					var seconds = this.makeTwoDigit( this.breakSeconds );
					this.breakSeconds = seconds - 1;
				}

				if ( this.breakMinutes == 0 && this.breakSeconds == 0 ) {
					this.breakMinutes = prevBreakMinutes;
					this.running = false;
					clearInterval(timer);

					this.startPomodoro();
				}
			}
		},

		makeTwoDigit(number) {
		 	number = ("0" + number).slice( -2 );

			return parseInt( number );// [FIXME RC]parseInt isnot working as expected
		},

		minusBreakMinutes() {
			if (this.breakMinutes == 0) {
				return;
			}

			this.breakMinutes--;
		},

		plusBreakMinutes() {
			if ( this.breakMinutes == 10 ) {
				return;
			}

			this.breakMinutes++;
		},

		minusLengthMinutes() {
			if (this.lengthMinutes == 0) {
				return;
			}

			this.lengthMinutes--;

			if (!this.running) {
				this.minutes = this.lengthMinutes;
			}
		},

		plusLengthMinutes() {
			if (this.lengthMinutes == 25) {
				return;
			}

			this.lengthMinutes++;

			if (!this.running) {
				this.minutes = this.lengthMinutes;
			}
		}
	},

	mounted() {
		this.minutes = this.lengthMinutes;
	}
});
