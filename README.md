

# Resources

 * [Playground](https://pixiplayground.com/#/edit/2Aaza6S_L2Gp8fJ_1WCgB)
 * [Documentation](https://pixijs.io/guides/basics/interaction.html)
 * [Collision Detection Library P2](https://www.npmjs.com/package/p2#demos)
 * [Multiplayer](https://dev.to/ably/building-a-realtime-multiplayer-browser-game-in-less-than-a-day-part-3-4-4bbm)


# TODO

 [ ] eslint
 [ ] typescript
 

# Animated bullets

https://greensock.com/forums/topic/26090-animate-path-points-in-canvaspixijs/

```
canvas.appendChild(app.view);

let value = {
  to: 150
};


let line = new PIXI.Graphics();

app.stage.addChild(line);

function updateLine() {
  line.lineStyle(2, 0xFF0000);
  line.moveTo(100, 100);
  line.lineTo(300, value.to);
}

updateLine();
gsap.to(value, {to: 350, duration: 1, onUpdate: updateLine});
```
