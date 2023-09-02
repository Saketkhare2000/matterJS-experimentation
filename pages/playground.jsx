import React, { useEffect, useLayoutEffect } from "react";
import Matter from "matter-js";
import Two from "twojs-ts";
const Playground = () => {
  useLayoutEffect(() => {
    // const splitWords = () => {
    //   const textNode = document.querySelector(".text");
    //   console.log(textNode);
    //   const text = textNode.textContent;

    //   const newDomElements = text.split(" ").map((text) => {
    //     const highlighted =
    //       text.startsWith(`"30under30"`) ||
    //       text.startsWith(`CTO`) ||
    //       text.startsWith(`Mythrill`);
    //     return `<span class="word ${
    //       highlighted ? "highlighted" : null
    //     }">${text}</span>`;
    //   });
    //   textNode.innerHTML = newDomElements.join("");
    // };
    // console.log(splitWords);
    // const renderCanvas = () => {
    //   const Engine = Matter.Engine;
    //   const Render = Matter.Render;
    //   const World = Matter.World;
    //   const Bodies = Matter.Bodies;
    //   const Runner = Matter.Runner;
    //   const params = {
    //     isStatic: true,
    //     render: {
    //       fillStyle: "transparent",
    //     },
    //   };
    //   const canvasSize = {
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    //   };
    //   const engine = Engine.create({});

    //   const render = Render.create({
    //     element: document.body,
    //     engine: engine,
    //     options: {
    //       ...canvasSize,
    //       background: "transparent",
    //       wireframes: false,
    //     },
    //   });
    //   const floor = Bodies.rectangle(
    //     canvasSize.width / 2,
    //     canvasSize.height,
    //     canvasSize.width,
    //     50,
    //     params
    //   );
    //   const wall1 = Bodies.rectangle(
    //     0,
    //     canvasSize.height / 2,
    //     50,
    //     canvasSize.height,
    //     params
    //   );
    //   const wall2 = Bodies.rectangle(
    //     canvasSize.width,
    //     canvasSize.height / 2,
    //     50,
    //     canvasSize.height,
    //     params
    //   );
    //   const top = Bodies.rectangle(
    //     canvasSize.width / 2,
    //     0,
    //     canvasSize.width,
    //     50,
    //     params
    //   );
    //   const wordElements = document.querySelectorAll(".word");
    //   console.log(wordElements);
    //   const wordBodies = [...wordElements].map((elemRef) => {
    //     const width = elemRef.offsetWidth;
    //     const height = elemRef.offsetHeight;

    //     return {
    //       body: Matter.Bodies.rectangle(
    //         canvasSize.width / 2,
    //         0,
    //         width,
    //         height,
    //         {
    //           render: {
    //             fillStyle: "transparent",
    //           },
    //         }
    //       ),
    //       elem: elemRef,
    //       render() {
    //         const { x, y } = this.body.position;
    //         this.elem.style.top = `${y - 20}px`;
    //         this.elem.style.left = `${x - width / 2}px`;
    //         this.elem.style.transform = `rotate(${this.body.angle}rad)`;
    //       },
    //     };
    //   });

    //   const mouse = Matter.Mouse.create(document.body);
    //   const mouseConstraint = Matter.MouseConstraint.create(engine, {
    //     mouse,
    //     constraint: {
    //       stiffness: 0.2,
    //       render: {
    //         visible: false,
    //       },
    //     },
    //   });
    //   mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    //   mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    //   World.add(engine.world, [
    //     floor,
    //     ...wordBodies.map((box) => box.body),
    //     wall1,
    //     wall2,
    //     top,
    //     mouseConstraint,
    //   ]);
    //   render.mouse = mouse;
    //   Runner.run(engine);
    //   Render.run(render);
    //   console.log(Render);
    //   console.log(World);

    //   const rerender = () => {
    //     wordBodies.forEach((element) => {
    //       element.render();
    //     });

    //     Matter.Engine.update(engine);
    //     requestAnimationFrame(rerender);
    //   };
    //   rerender();
    // };

    // splitWords();
    // renderCanvas();

    const vector = new Two.Vector();
    let entities = [];
    let mouse;
    let copy = [
      "Idea",
      "Idea",
      "Idea",
      "Money",
      "Money",
      "Tech",
      "Concept",
      "Business",
      "Design",
      "MVP",
      "Roadmap",
      "Testing",
      "Focus Group",
      "Culture",
      "Concept",
      "Pitch",
      "Needs",
      "Issues",
      "Marketing",
      "Customer",
      "Client",
      "Service",
      "Users",
      "Analytics",
      "Idea",
      "Idea",
      "Idea",
      "Idea",
      "Guidance",
    ];
    //creating the canvas and adding it to the body
    let two = new Two({
      type: Two.Types.canvas,
      fullscreen: true,
      autostart: true,
    }).appendTo(document.body);

    //creating matter engine
    let solver = Matter.Engine.create();

    //setting the gravity Y parameter
    solver.world.gravity.y = 1;

    //creating the boundary and setting thinckness of left/right/bottom

    let bounds = {
      length: 5000,
      thickness: 50,
      properties: {
        isStatic: true,
      },
    };

    // bounds.top = createBoundary(bounds.length, bounds.thickness);
    bounds.left = createBoundary(bounds.thickness, bounds.length);
    bounds.right = createBoundary(bounds.thickness, bounds.length);
    bounds.bottom = createBoundary(bounds.length, bounds.thickness);

    //adding the boundary to world
    Matter.World.add(solver.world, [
      /*bounds.top.entity,*/ bounds.left.entity,
      bounds.right.entity,
      bounds.bottom.entity,
    ]);

    //setting the default styles for the rectangle which will be later appended to two Polygons
    let defaultStyles = {
      size: two.width * 0.08,
      weight: 400,
      fill: "white",
      leading: two.width * 0.08 * 0.8,
      family: "Angus, Arial, sans-serif",
      alignment: "center",
      baseline: "baseline",
      decoration: "underline",
      margin: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    };

    const addMouseInteraction = () => {
      // add mouse control
      let mouse = Matter.Mouse.create(document.body);
      let mouseConstraint = Matter.MouseConstraint.create(solver, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
        },
      });

      Matter.World.add(solver.world, mouseConstraint);

      return mouseConstraint;
    };

    // const resize = () => {
    //   let length = bounds.length;
    //   let thickness = bounds.thickness;

    //   // vector.x = two.width / 2;
    //   // vector.y = - thickness / 2;
    //   // Matter.Body.setPosition(bounds.top.entity, vector);

    //   vector.x = -thickness / 2;
    //   vector.y = two.height / 2;
    //   Matter.Body.setPosition(bounds.left.entity, vector);

    //   vector.x = two.width + thickness / 2;
    //   vector.y = two.height / 2;
    //   Matter.Body.setPosition(bounds.right.entity, vector);

    //   vector.x = two.width / 2;
    //   vector.y = two.height + thickness / 2;
    //   Matter.Body.setPosition(bounds.bottom.entity, vector);

    //   let size;

    //   if (two.width < 480) {
    //     size = two.width * 0.12;
    //   } else if (two.width > 1080 && two.width < 1600) {
    //     size = two.width * 0.07;
    //   } else if (two.width > 1600) {
    //     size = two.width * 0.06;
    //   } else {
    //     size = two.width * 0.08;
    //   }

    //   let leading = size * 0.8;

    //   for (let i = 0; i < two.scene.children.length; i++) {
    //     let child = two.scene.children[i];

    //     if (!child.isWord) {
    //       continue;
    //     }

    //     let text = child.text;
    //     let rectangle = child.rectangle;
    //     let entity = child.entity;

    //     text.size = size;
    //     text.leading = leading;

    //     let rect = text.getBoundingClientRect(true);
    //     rectangle.width = rect.width;
    //     rectangle.height = rect.height;

    //     Matter.Body.scale(entity, 1 / entity.scale.x, 1 / entity.scale.y);
    //     Matter.Body.scale(entity, rect.width, rect.height);
    //     entity.scale.set(rect.width, rect.height);

    //     text.size = size / 3;
    //   }
    // };

    const addSlogan = () => {
      let x = defaultStyles.margin.left;
      let y = -two.height; // Header offset

      for (let i = 0; i < copy.length; i++) {
        let word = copy[i];
        let group = new Two.Group();
        let text = new Two.Text("", 0, 0, defaultStyles);
        group.isWord = true;

        console.log(text);

        // Override default styles
        if (word.value) {
          text.value = word.value;

          for (let prop in word.styles) {
            text[prop] = word.styles[prop];
          }
        } else {
          text.value = word;
        }

        let rect = text.getBoundingClientRect();
        let ox = x + rect.width / 2;
        let oy = y + rect.height / 2;

        console.log(rect);

        let ca = x + rect.width;
        let cb = two.width;

        // New line
        if (ca >= cb) {
          x = defaultStyles.margin.left;
          y +=
            defaultStyles.leading +
            defaultStyles.margin.top +
            defaultStyles.margin.bottom;

          ox = x + rect.width / 2;
          oy = y + rect.height / 2;
        }

        group.translation.x = ox;
        group.translation.y = oy;
        text.translation.y = 14;

        let rectangle = new Two.Rectangle(0, 0, rect.width, rect.height);

        // rectangle.fill = 'rgb(255, 50, 50)';
        rectangle.fill =
          "rgba(" +
          255 +
          "," +
          Math.floor(Math.random() * 255) +
          "," +
          Math.floor(Math.random() * 255) +
          "," +
          0.85 +
          ")";
        rectangle.noStroke();
        // rectangle.opacity = 0.75;
        rectangle.visible = true;

        let entity = Matter.Bodies.rectangle(ox, oy, 1, 1);
        Matter.Body.scale(entity, rect.width, rect.height);

        entity.scale = new Two.Vector(rect.width, rect.height);
        entity.object = group;
        entities.push(entity);
        x +=
          rect.width + defaultStyles.margin.left + defaultStyles.margin.right;

        group.text = text;
        group.rectangle = rectangle;
        group.entity = entity;

        group.add(rectangle, text);
        two.add(group);
      }

      Matter.World.add(solver.world, entities);
    };

    const update = (frameCount, timeDelta) => {
      let allBodies = Matter.Composite.allBodies(solver.world);
      Matter.MouseConstraint.update(mouse, allBodies);
      Matter.MouseConstraint._triggerEvents(mouse);

      Matter.Engine.update(solver);

      for (let i = 0; i < entities.length; i++) {
        let entity = entities[i];
        entity.object.position.copy(entity.position);
        entity.object.rotation = entity.angle;
      }
    };

    addSlogan();
    // resize();
    mouse = addMouseInteraction();
    // two.bind("resize", resize).bind("update", update);
    function createBoundary(width, height) {
      let rectangle = two.makeRectangle(0, 0, width, height);
      rectangle.visible = false;

      rectangle.entity = Matter.Bodies.rectangle(
        0,
        0,
        width,
        height,
        bounds.properties
      );
      rectangle.entity.position = rectangle.position;

      return rectangle;
    }
  }, []);
  return (
    <main>
      <div className="text">
        Awesome Javascript Fun CSS HTML this is some random pill
      </div>
      s
    </main>
  );
};

export default Playground;
