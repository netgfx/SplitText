# [Split Text]

Split Text is an attempt to immitate the "SplitText" plugin of the greensock 
AS3 functionality with JQuery and GSAP (Greensock javascript library)


## Quick start

Choose one of the following options:

-> var split = $(".splitText").splitText({'type':'words','animation':'explode','useLite':true});

-> split.animate();

or

-> split.reverse();

## Features

* HTML5 ready. Use the new elements with confidence.
* Options Inlcude:
1. type = 'lines', 'words', 'letters', 'sentences (new)'
2. animation = 'explode', 'slide', 'opacity', '3D', 'colorize', 'smoke', 'glowOnHover','typography3D','scramble','blackout','matrix', 'machinegun text (new)'
3. justSplit = boolean (just split only returns the splited text based on type, no animation)
4. duration = ...in seconds
5. colorize = color hex (if effect is colorize or glowOnHover)
6. scale    = boolean
7. useLite  = boolean (TimelineMax or TimelineLite)
8. useCSS   = boolean (use external css, like splitText.css)

## Examples

* You can view examples of this plugin [here](http://www.netgfx.com/trunk/splitText/examples/examples.html)


## Documentation

Will be coming soon...

## Browser compatibility

Firefox 3.5+, Google Chrome, Safari 4+, IE 8+, Opera 10+.

* Of course some effects are more jerky in some browsers than others.

## Contributing

Anyone and everyone is welcome to [contribute](CONTRIBUTING.md).
