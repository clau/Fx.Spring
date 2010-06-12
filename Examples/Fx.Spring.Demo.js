/*
---
script: Fx.Spring.Demo.js
description: Fx.Spring Demo

authors:
  - Chi Wai Lau (http://tabqwerty.com)

license:
  - MIT-style license

requires:
  core/1.2.4:   '*'

...
*/
window.addEvent('domready', function() {
	new Fx.Spring.Demo();
});

Fx.Spring.Demo = new Class({
	initialize: function() {
		this.container = $('mangosteen-container');
		this.mangosteen = $('mangosteen');

		this.xSpring = new Fx.Spring({
			'onMotion': this.xStep.bind(this)
		});

		this.ySpring = new Fx.Spring({
			'onMotion': this.yStep.bind(this)
		});

		this.timeFx = new Fx.Morph(this.mangosteen, {
			duration: 300,
			link: 'cancel'
		});

		this.selectTransition = $('fxTransition');
		this.selectEase = $('fxEase');
		this.easeCol = $('ease');
		this.timeCol = $$('.time');
		this.physicsCol = $$('.physics');
		$$(this.selectEase, this.selectTransition).addEvent('change', this.updateTransition.bind(this));
		this.selectEase.fireEvent('change');

		$('fxDuration').addEvent('keyup', this.updateDuration.bind(this));
		$('fxStiffness').addEvent('keyup', this.updateStiffness.bind(this));
		$('fxFriction').addEvent('keyup', this.updateFriction.bind(this));

		this.container.addEvent('mousemove', this.mousemove.bind(this));
	},
	
	updateTransition: function() {
		var transition = this.selectTransition.get('value');
		this.onSpringFx = transition == 'Spring';

		if (this.onSpringFx) {
			this.timeCol.setStyle('display', 'none');
			this.physicsCol.setStyle('display', 'block');

			this.xSpring.set(this.mangosteen.getLeft());
			this.ySpring.set(this.mangosteen.getTop());
		} else {
			this.timeCol.setStyle('display', 'block');
			this.physicsCol.setStyle('display', 'none');

			this.timeFx.set({
				'top': this.mangosteen.getTop(),
				'left': this.mangosteen.getLeft()
			});

			if (transition == 'linear'){
				this.easeCol.setStyle('display', 'none');
				this.timeFx.options.transition = Fx.Transitions.linear;
			} else {
				this.easeCol.setStyle('display', 'block');
				var ease = this.selectEase.get('value');
				this.timeFx.options.transition = Fx.Transitions[transition][ease];
			}
		}
	},
	
	updateDuration: function(e) {
		this.timeFx.options.duration = parseFloat(e.target.get('value'));
	},
	
	updateStiffness: function(e) {
		var val = parseFloat(e.target.get('value'));
		this.xSpring.options.stiffness = this.ySpring.options.stiffness = val;
	},
	
	updateFriction: function(e) {
		var val = parseFloat(e.target.get('value'));
		this.xSpring.options.friction = this.ySpring.options.friction = val;
	},
	
	mousemove: function(e) {
		if (e.target.id == 'mangosteen-container') {
			if (this.onSpringFx) {
				this.xSpring.start(this.xSpring.get(), e.page.x);
				this.ySpring.start(this.ySpring.get(), e.page.y);
			} else {
				this.timeFx.start({
					'top': e.page.y,
					'left': e.page.x
				});
			}
			e.stop();
		}
	},
	
	xStep: function(t) {
		this.mangosteen.setStyle('left', t);
	},
	
	yStep: function(t) {
		this.mangosteen.setStyle('top', t);
	}
});