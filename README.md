Fx.Spring
===========

Looking at how animations work in some of the most popular environments such as jQuery, MooTools, CSS3, and Cocoa, I noticed that there’s a common pattern — the effects are all bound by time. Those time-bound animations generally work well with simple motions. However, the static nature of these animations becomes a limitation since the predefined movement doesn’t adapt well to situations that require adjustment.

Fx.Spring is modeled after [the physics of a spring](http://www.myphysicslab.com/spring1.html). The effect is not time-bound; instead, the effect duration is dynamic and is dictated by 2 constants: spring stiffness and friction. When friction is zero, you get a bouncy effect that goes on forever and greater spring stiffness means higher bounce frequency. When friction is present, the bounce will stop over time and greater friction means that the bounce frequency decays faster over time.

Not only does the spring animation render a realistic effect, it also adapts to varying situations more naturally as the movement is not predefined and is calculated dynamically.

![Screenshot](http://github.com/clau/Fx.Spring/raw/master/screen.png)

How to use
----------

	#HTML
        ...
        <head>
          <title>...</title>
          <script type="text/javascript" src="path/to/mootools-1.2.4-core.js"></script>
          <script type="text/javascript" src="path/to/Fx.Spring.js"></script>
          <script>
            window.addEvent('domready', function() {
              var elem = $('myElementID');

              var stepFunc = function(t) {
                elem.setStyle('left', t);
              };

              var fx = new Fx.Spring({
                'stiffness': 100,
                'friction': 5,
                'onMotion': stepFunc
              });

              fx.start(fx.get(), 300);
            });
          </script>
        </head>
        ...

Demos
----------

- You can see a simple online demo in [this blog post](http://tabqwerty.com/2010/06/11/rethink-animation.html)
- More complex demo: [Mike Matas Blog](http://www.mikematas.com)

Support
-----------
Please contact me (clau@tabqwerty.com) if you have any suggestions or comments.