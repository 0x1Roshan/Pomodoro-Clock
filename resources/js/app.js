new Vue({
	el: '#app',
	data: {
		minutes: 25,
		seconds: 0,
		running: false,
		breakMinutes: 5,
		breakSeconds: 0,
		lengthMinutes: 20,
		lengthSeconds: 0,
		showBreakProgress: false,
		length: {
			totalSeconds : 0,
			currentSeconds : 0,
			percent : 100
		},
		progress: {
			width : ""
		}
	},
	methods: {
		startPomodoro() {
			if (!this.running) {
				this.running = true;
				this.showBreakProgress = false;
				this.init('start');
				timer = setInterval(this.countDown, 1000, "pomodoro");
			} else {
				return;
			}
		},
			
		startBreak(prevBreakMinutes) {
			this.init('break');
			this.showBreakProgress = true;
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

				this.length.currentSeconds--;
				this.length.percent = ( 100 / this.length.totalSeconds ) * this.length.currentSeconds;

				this.progress.width = "width: " + this.length.percent + "%";  
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

				this.length.currentSeconds--;
				this.length.percent = ( 100 / this.length.totalSeconds ) * this.length.currentSeconds;

				this.progress.width = "width: " + this.length.percent + "%";
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
			this.length.totalSeconds = this.lengthMinutes * 60;
			this.length.currentSeconds = this.length.totalSeconds;

			if (!this.running) {
				this.minutes = this.lengthMinutes;
			}
		},

		plusLengthMinutes() {
			if (this.lengthMinutes == 25) {
				return;
			}

			this.lengthMinutes++;
			this.length.totalSeconds = this.lengthMinutes * 60;
			this.length.currentSeconds = this.length.totalSeconds;
			
			if (!this.running) {
				this.minutes = this.lengthMinutes;
			}
		},
		init(type) {
			this.minutes = this.lengthMinutes;

			if (type == 'start') {
				this.length.totalSeconds = this.lengthMinutes * 60;
			} else {
				this.length.totalSeconds = this.breakMinutes * 60;
			}

			this.length.currentSeconds = this.length.totalSeconds;

			this.length.percent = 100;

			this.progress.width = "width: " + this.length.percent + "%";
		}
	},

	mounted() {
		this.init('start');	
	}
});
