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
    Event = Matter.Events;
    console.log(Mouse);
    console.log(MouseConstraint.mouse);
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

    let pill = Bodies.rectangle(450, 0, 180, 56, {
      friction: 0.2,
      frictionAir: 0.00001,
      restitution: 0.8,
      bounds: {
        min: {
          x: 10,
          y: 10,
        },
        max: {
          x: 10,
          y: 10,
        },
      },
      render: {
        fillStyle: "transparent",
        sprite: {
          texture: "/pill-5.svg",
        },
      },
    });

    let pill1 = Bodies.rectangle(150, 50, 180, 56, {
      friction: 0.2,
      frictionAir: 0.00001,
      restitution: 0.5,
      bounds: {
        min: {
          x: 1,
          y: 1,
        },
        max: {
          x: 10,
          y: 10,
        },
      },
      render: {
        fillStyle: "transparent",
        sprite: {
          texture: "/pill-1.svg",
        },
      },
    });
    console.log(pill1);

    const pill2 = Bodies.rectangle(550, 20, 250, 56, {
      friction: 0.8,
      frictionAir: 0.00001,
      restitution: 0.9,
      bounds: {
        min: {
          x: 1,
          y: 1,
        },
        max: {
          x: 10,
          y: 10,
        },
      },
      render: {
        fillStyle: "transparent",
        sprite: {
          texture: "/pill-3.svg",
        },
      },
    });

    const pill3 = Bodies.rectangle(650, 120, 200, 56, {
      friction: 0.2,
      frictionAir: 0.00001,
      restitution: 0.5,
      bounds: {
        min: {
          x: 1,
          y: 1,
        },
        max: {
          x: 10,
          y: 10,
        },
      },

      render: {
        fillStyle: "transparent",
        sprite: {
          texture: "/pill-3.svg",
        },
      },
    });
    const pill4 = Bodies.rectangle(850, 100, 180, 56, {
      friction: 0.2,
      frictionAir: 0.00001,
      restitution: 0.8,
      bounds: {
        min: {
          x: 1,
          y: 1,
        },
        max: {
          x: 10,
          y: 10,
        },
      },

      render: {
        fillStyle: "transparent",
        sprite: {
          texture: "/pill-4.svg",
        },
      },
    });
    const pill5 = Bodies.rectangle(180, 50, 0, 56, {
      friction: 0.2,
      frictionAir: 0.00001,
      restitution: 0.5,
      bounds: {
        min: {
          x: 1,
          y: 1,
        },
        max: {
          x: 10,
          y: 10,
        },
      },

      render: {
        fillStyle: "transparent",
        sprite: {
          texture: "/pill-5.svg",
        },
      },
    });
    const pill6 = Bodies.rectangle(900, 65, 200, 56, {
      friction: 0.2,
      frictionAir: 0.00001,
      restitution: 0.8,
      bounds: {
        min: {
          x: 1,
          y: 1,
        },
        max: {
          x: 10,
          y: 10,
        },
      },

      render: {
        fillStyle: "transparent",
        sprite: {
          texture: "/pill-6.svg",
        },
      },
    });
    const pill7 = Bodies.rectangle(750, 70, 200, 56, {
      friction: 0.2,
      frictionAir: 0.00001,
      restitution: 0.8,
      bounds: {
        min: {
          x: 1,
          y: 1,
        },
        max: {
          x: 10,
          y: 10,
        },
      },

      render: {
        fillStyle: "transparent",
        sprite: {
          texture: "/pill-7.svg",
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
      // boxB,
      // boxC,
      // boxD,
      // boxE,
      // boxF,
      pill,
      pill1,
      pill2,
      pill3,
      pill4,
      pill5,
      pill6,
      pill7,
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

    Event.on(mouseConstraint, "mousedown", function (event) {});

    //a function which set mouse cursor usito grab when the event function runs

    Composite.add(engine.world, mouseConstraint);
  }, []);

  console.log(Matter);
  return (
    <>
      <div className="cursor-grab" ref={matterRef}>
        <h1 className="absolute text-5xl font-bold cursor-default top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Connect With Our Storytellers
        </h1>
      </div>
    </>
  );
};

export default MatterJS;
