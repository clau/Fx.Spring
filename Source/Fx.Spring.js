/*
---
script: Fx.Spring.js
description: Fx.Spring

authors:
  - Chi Wai Lau (http://tabqwerty.com)
  - Nefaur Khandker (http://www.nefaurk.info)

license:
  - MIT-style license

requires:
  core/1.2.4:   '*'

provides:
  - Fx.Spring
...
*/
Fx.Spring = new Class({
	Extends: Fx,

	options: {
		stiffness: 70,
		friction: 10,
		threshold: 0.03
	},

	initialize: function(options) {
		this.parent(options);
		this.threshold = this.options.threshold;
		this.dt = 1 / this.options.fps;
		this.velocity = 0;
		this.acceleration = 0;
		this.from = 0;
		this.inMotion = false;
	},

	step: function() {
		if (this.inMotion) {
			this.acceleration = this.options.stiffness*(this.to-this.from) - this.options.friction*this.velocity;
			this.velocity += this.acceleration*this.dt;
			this.from += this.velocity*this.dt;
			this.inMotion = Math.abs(this.acceleration) >= this.threshold ||
							Math.abs(this.velocity) >= this.threshold;
			this.fireEvent('motion', this.from);
		} else {
			this.complete();
		}
	},

	complete: function() {
		if (this.stopTimer()) {
			this.velocity = 0;
			this.acceleration = 0;
			this.from = this.to;
			this.fireEvent('motion', this.from);
			this.onComplete();
		}
		return this;
	},

	start: function(from, to) {
		this.from = from;
		this.to = to;

		if (!this.timer) {
			this.inMotion = true;
			this.onStart();
			this.startTimer();
		}

		return this;
	},

	get: function() {
		return this.from || 0;
	},

	set: function(val) {
		this.from = val;
	}
});