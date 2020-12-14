import React from "react";
import { useSpring, animated } from "react-spring";
import { useDrag, useGesture } from "react-use-gesture";

const items = [1, 2, 3, 4];
const interp = (i) => (wheeled) =>
  `translate3d(0, ${
    200 * Math.sin(wheeled / 400 + (i * 100 * Math.PI) / 500)
  }px, ${200 * Math.cos(wheeled / 400 + (i * 100 * Math.PI) / 500)}px)`;

function App() {
  const [{ wheeled }, setWheel] = useSpring(() => ({ wheeled: 0 }));
  useGesture(
    {
      onWheel: ({ offset: [, y] }) => {
        setWheel({
          wheeled: y,
        });
      },
    },
    { domTarget: window }
  );
  return items.map((i) => (
    <animated.div
      key={i}
      className="whirler"
      // style={{ translateY: posY, translateZ: posZ }}
      style={{
        transform: wheeled.interpolate(interp(i)),
      }}
    >
      {wheeled.interpolate(interp(i))}
    </animated.div>
  ));
}

export default App;
