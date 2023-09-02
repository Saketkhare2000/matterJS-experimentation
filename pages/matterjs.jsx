import React, { useEffect, useLayoutEffect } from "react";
import Matter from "matter-js";

const MatterJS = () => {
  // module aliases
  const matterRef = React.useRef(null);
  useLayoutEffect(() => {
    const canvas = matterRef.current;
    const thickness = 10;
    let Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint;

    // // create an engine
    let engine = Engine.create();

    // // create a renderer
    let render = Render.create({
      element: canvas,
      engine: engine,
      options: {
        wireframes: false,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });

    // // create two boxes and a ground
    let boxA = Bodies.circle(150, 50, 40, {
      render: {
        sprite: {
          texture: "/outstanding.png",
          xScale: 0.25,
          yScale: 0.25,
        },
      },
    });
    let boxB = Bodies.circle(350, 50, 40, {
      render: {
        sprite: {
          texture: "/perfect.png",
          xScale: 0.25,
          yScale: 0.25,
        },
      },
    });

    let boxC = Bodies.rectangle(450, 50, 40, 40, {
      render: {
        sprite: {
          texture: "/pill.png",
          xScale: 0.25,
          yScale: 0.25,
        },
      },
    });

    let boxD = Bodies.circle(550, 50, 40, {
      render: {
        sprite: {
          texture: "/pill.png",
          xScale: 0.25,
          yScale: 0.25,
        },
      },
    });

    let boxE = Bodies.circle(150, 50, 40, {
      render: {
        sprite: {
          texture: "/outstanding.png",
          xScale: 0.25,
          yScale: 0.25,
        },
      },
    });
    let boxF = Bodies.circle(350, 50, 40, {
      render: {
        sprite: {
          texture: "/perfect.png",
          xScale: 0.25,
          yScale: 0.25,
        },
      },
    });

    let ground = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight,
      window.innerWidth,
      60,
      { isStatic: true }
    );
    let roof = Bodies.rectangle(
      window.innerWidth / 2,
      -thickness / 2,
      window.innerWidth,
      thickness,
      { isStatic: true }
    );

    let wallLeft = Bodies.rectangle(
      -thickness / 2,
      window.innerHeight / 2,
      thickness,
      window.innerHeight,
      { isStatic: true }
    );
    let wallRight = Bodies.rectangle(
      window.innerWidth + thickness / 2,
      window.innerHeight / 2,
      thickness,
      window.innerHeight,
      { isStatic: true }
    );
    // add all of the bodies to the world
    Composite.add(engine.world, [
      boxA,
      boxB,
      boxC,
      boxD,
      boxE,
      boxF,
      ground,
      wallLeft,
      wallRight,
      roof,
    ]);

    // run the renderer
    Render.run(render);

    // create runner
    let runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    // add mouse control
    let mouse = Mouse.create(render.canvas);
    let mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(engine.world, mouseConstraint);
  }, []);

  console.log(Matter);
  return <div ref={matterRef}></div>;
};

export default MatterJS;
