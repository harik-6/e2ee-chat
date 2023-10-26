import React, { useEffect } from "react";
import anime from "animejs";

import "./demo.styles.scss";

const xdist = "50%";
const radius = "7";
let origin = "0%";
let interval = undefined;
const animationFlow = [
  {
    cy: "5%",
    cindex: 1
  },
  {
    cy: "22%",
    cindex: 2
  },
  {
    cy: "41%",
    cindex: 3
  },
  {
    cy: "59%",
    cindex: 4
  },
  {
    cy: "78%",
    cindex: 5
  },
  {
    cy: "95%",
    cindex: 6
  }
]

const TimeLine = ({ setActiveIndex, msg }) => {
  useEffect(() => {
    if (interval !== undefined) clearInterval(interval);
    for (let i = 1; i <= 6; i++) {
      setTimeout(() => {
        const classes = document.getElementsByClassName(`c${i}`);
        classes[0].setAttribute("class", `com-circle c${i}`);
      }, 500);
    }
    anime({
      targets: ".com-line-anim",
      y2: [origin, "0%"],
      easing: "linear",
      duration: 1000,
    });
    origin = "0%";
    startAnimation();
    // eslint-disable-next-line
  }, [msg]);

  const startAnimation = () => {
    let animationIndex = 0;
    interval = setInterval(() => {
      let index = animationIndex;
      let flowAttributes = animationFlow[index];
      animationIndex += 1;
      animateTo({ target: { getAttribute: () => flowAttributes.cy } }, flowAttributes.cindex);
      if (animationIndex >= animationFlow.length) {
        clearInterval(interval);
        interval = undefined;
      }
    }, 1000)
  }


  const animateTo = (e, cirindex) => {
    if (cirindex !== 0) {
      setActiveIndex(cirindex);
      let dest = e.target.getAttribute("cy");
      if (dest > "90%") dest = "100%";
      for (let i = 1; i <= cirindex; i++) {
        const classes = document.getElementsByClassName(`c${i}`);
        classes[0].setAttribute("class", `com-circle c${i} active`);
      }
      for (let i = cirindex + 1; i <= 6; i++) {
        const classes = document.getElementsByClassName(`c${i}`);
        classes[0].setAttribute("class", `com-circle c${i}`);
      }
      anime({
        targets: ".com-line-anim",
        y2: [origin, dest],
        easing: "linear",
        duration: 1000,
      });
      origin = dest;
    }
  };

  return (
    <React.Fragment>
      <svg height="100%" width="100%" className="time-line">
        <line
          x1={xdist}
          y1="0%"
          x2={xdist}
          y2="100%"
          className="com-line"
        ></line>
        <line x1={xdist} y1="0%" x2={xdist} className="com-line-anim"></line>

        <circle
          // onClick={(e) => animateTo(e, 1)}
          cx={xdist}
          cy="5%"
          r={radius}
          className="com-circle c1"
        ></circle>

        <circle
          // onClick={(e) => animateTo(e, 2)}
          cx={xdist}
          cy="22%"
          r={radius}
          className="com-circle c2"
        ></circle>

        <circle
          // onClick={(e) => animateTo(e, 3)}
          cx={xdist}
          cy="41%"
          r={radius}
          className="com-circle c3"
        ></circle>
        <circle
          // onClick={(e) => animateTo(e, 4)}
          cx={xdist}
          cy="59%"
          r={radius}
          className="com-circle c4"
        ></circle>
        <circle
          // onClick={(e) => animateTo(e, 5)}
          cx={xdist}
          cy="78%"
          r={radius}
          className="com-circle c5"
        ></circle>
        <circle
          // onClick={(e) => animateTo(e, 6)}
          cx={xdist}
          cy="95%"
          r={radius}
          className="com-circle c6"
        ></circle>
      </svg>
    </React.Fragment>
  );
};

export default TimeLine;
