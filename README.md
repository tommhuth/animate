# animate
A simple, bare bones animation utility for time-based animations of numbers and hex color values. 

```js
  import animate from "@huth/animate"
  
  let stop = animate({
      from: 0,
      to: 100,
      duration: 750,
      delay: 200,
      easing: "easeOutCubic",
      render: (value) => console.log(value),
      start: () => console.log("animation started"),
      end: () => console.log("animation complete"),
      cancel: () => console.log("animation stopped"),
  })
  
  // stop() call me to stop animation  
```

- `from` and `to` can be either a number or a full CSS string hex color value (`#FF0000`), or an object with those values. 
- `duration` timing in milliseconds.
- `delay` time before animation starts, in milliseconds.
- `easing` easing function name (see https://easings.net/) or a custom easing function that returns a value between `0` and `1`.
- `render` callback called with the interpolated value for every animation step 
- `start` callback called when the animation starts (after delay)
- `end` callback called when the animation has finished
- `cancel` callback called if the animation was stopped before it had a chance to finish

In addition, the `animate` method returns a function that when called will kill the animation (and trigger any `cancel` callback).
