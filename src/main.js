import { dialogueData, scaleFactor } from "./constants.js";
import { k } from "./kaboomCtx.js";
import { displayDialogue, setCamScale } from "./utils.js";

k.loadSprite("spritesheet", "./spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
  },
});

k.loadSprite("map", "./map.png");
// Load the music file
k.loadSound("muzic", "./background.mp3");
k.loadSound("rate", "./quizzRate.mp3");
k.loadSound("copaci", "./quizzCopaciRoz.mp3");
k.loadSound("semafor", "./quizzCuloareSemafor.mp3");

function displayInstructions(onClose) {
  const instructionsContainer = document.createElement("div");
  instructionsContainer.classList.add("instructions-container");

  const blurOverlay = document.createElement("div");
  blurOverlay.classList.add("blur-overlay");

  const closeButton = document.createElement("button");
  closeButton.innerText = "X";
  closeButton.classList.add("close-button");

  closeButton.addEventListener("click", () => {
    document.body.removeChild(instructionsContainer);
    document.body.removeChild(blurOverlay);
    k.play("muzic", { loop: true, volume: 0.3 });
    onClose();
  });

  instructionsContainer.appendChild(closeButton);

  const row1 = document.createElement("div");
  row1.classList.add("row");

  const homeImage = document.createElement("img");
  homeImage.src = "/media/home.png";
  homeImage.alt = "Home";
  homeImage.classList.add("home-image");
  row1.appendChild(homeImage);

  const arrowContainer1 = document.createElement("div");
  arrowContainer1.classList.add("arrow-container");

  const arrowShaft1 = document.createElement("div");
  arrowShaft1.classList.add("arrow-shaft");
  arrowContainer1.appendChild(arrowShaft1);

  const arrowHead1 = document.createElement("div");
  arrowHead1.classList.add("arrow-head");
  arrowContainer1.appendChild(arrowHead1);

  row1.appendChild(arrowContainer1);

  const schoolImage = document.createElement("img");
  schoolImage.src = "/media/school.png";
  schoolImage.alt = "School";
  schoolImage.classList.add("school-image");
  row1.appendChild(schoolImage);

  instructionsContainer.appendChild(row1);

  const row2 = document.createElement("div");
  row2.classList.add("row");

  const instructionsImage1 = document.createElement("img");
  instructionsImage1.src = "/media/instructions.png";
  instructionsImage1.alt = "Instructions 1";
  instructionsImage1.classList.add("instructions-image");
  row2.appendChild(instructionsImage1);

  const chatBubble1 = document.createElement("div");
  chatBubble1.classList.add("chat-bubble", "chat-bubble1");
  chatBubble1.innerHTML =
    '1 + 1 = ?<br>1 3 <span class="highlight">2</span> 10';
  instructionsImage1.parentNode.appendChild(chatBubble1);

  const arrowContainer2 = document.createElement("div");
  arrowContainer2.classList.add("arrow-container");

  const arrowShaft2 = document.createElement("div");
  arrowShaft2.classList.add("arrow-shaft");
  arrowContainer2.appendChild(arrowShaft2);

  const arrowHead2 = document.createElement("div");
  arrowHead2.classList.add("arrow-head");
  arrowContainer2.appendChild(arrowHead2);

  row2.appendChild(arrowContainer2);

  const instructionsImage2 = document.createElement("img");
  instructionsImage2.src = "/media/instructions.png";
  instructionsImage2.alt = "Instructions 2";
  instructionsImage2.classList.add("instructions-image");
  row2.appendChild(instructionsImage2);

  const chatBubble2 = document.createElement("div");
  chatBubble2.classList.add("chat-bubble", "chat-bubble2");
  chatBubble2.innerHTML = "➡️ 🏫<br>⬇️ 🏥<br>⬅️ 🌲";
  instructionsImage2.parentNode.appendChild(chatBubble2);

  instructionsContainer.appendChild(row2);

  document.body.appendChild(blurOverlay);
  document.body.appendChild(instructionsContainer);
}

function displayQuiz(quizData, onComplete) {
  if (quizData.sound) {
    k.play(quizData.sound, {
      volume: 1.0, // Full volume for quiz sounds
    });
  }

  const quizContainer = document.createElement("div");
  quizContainer.className = "quiz-container";

  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.innerText = "X";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(quizContainer);
    onComplete();
  });

  quizContainer.appendChild(closeButton);

  const questionElement = document.createElement("p");
  questionElement.innerText = quizData.question;
  quizContainer.appendChild(questionElement);

  quizData.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.innerText = option.text;

    button.addEventListener("click", () => {
      document.body.removeChild(quizContainer);

      if (option.correct) {
        const directionsContainer = document.createElement("div");
        directionsContainer.className = "directions-container";

        const directionsElement = document.createElement("p");
        directionsElement.innerText = quizData.directions;
        directionsContainer.appendChild(directionsElement);

        document.body.appendChild(directionsContainer);

        setTimeout(() => {
          document.body.removeChild(directionsContainer);
          onComplete();
        }, 3000);
      } else {
        const wrongAnswerContainer = document.createElement("div");
        wrongAnswerContainer.className = "wrong-answer-container";

        const wrongMessageElement = document.createElement("p");
        wrongMessageElement.innerText = "❌❌❌";
        wrongAnswerContainer.appendChild(wrongMessageElement);

        document.body.appendChild(wrongAnswerContainer);

        setTimeout(() => {
          document.body.removeChild(wrongAnswerContainer);
          onComplete(); // Continue the game
        }, 3000); // Show ❌ for 3 seconds
      }
    });

    quizContainer.appendChild(button);
  });

  document.body.appendChild(quizContainer);
}

k.setBackground(k.Color.fromHex("#311047"));

k.scene("main", async () => {
  const mapData = await (await fetch("./map.json")).json();
  const layers = mapData.layers;
  const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

  const player = k.make([
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.area({
      shape: new k.Rect(k.vec2(0, 3), 10, 10),
    }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor),
    {
      speed: 250,
      direction: "down",
      isInDialogue: false,
    },
    "player",
  ]);

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            const data = dialogueData[boundary.name];

            if (data) {
              player.isInDialogue = true;

              if (data.type === "dialogue") {
                // Display standard dialogue
                displayDialogue(data.text, () => (player.isInDialogue = false));
              } else if (data.type === "quiz") {
                // Display quiz

                displayQuiz(data, () => (player.isInDialogue = false));
              }
            } else {
              console.warn(`No data found for: ${boundary.name}`); // Debugging
            }
          });
        }
      }
      continue;
    }

    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }
  }

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.worldPos().x, player.worldPos().y - 100);
  });

  k.onMouseDown((mouseBtn) => {
    if (mouseBtn !== "left" || player.isInDialogue) return;

    const worldMousePos = k.toWorld(k.mousePos());
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);

    const lowerBound = 50;
    const upperBound = 125;

    if (
      mouseAngle > lowerBound &&
      mouseAngle < upperBound &&
      player.curAnim() !== "walk-up"
    ) {
      player.play("walk-up");
      player.direction = "up";
      return;
    }

    if (
      mouseAngle < -lowerBound &&
      mouseAngle > -upperBound &&
      player.curAnim() !== "walk-down"
    ) {
      player.play("walk-down");
      player.direction = "down";
      return;
    }

    if (Math.abs(mouseAngle) > upperBound) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      return;
    }

    if (Math.abs(mouseAngle) < lowerBound) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      return;
    }
  });

  function stopAnims() {
    if (player.direction === "down") {
      player.play("idle-down");
      return;
    }
    if (player.direction === "up") {
      player.play("idle-up");
      return;
    }

    player.play("idle-side");
  }

  k.onMouseRelease(stopAnims);

  k.onKeyRelease(() => {
    stopAnims();
  });
  k.onKeyDown((key) => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("down"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 1) return;

    if (player.isInDialogue) return;
    if (keyMap[0]) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      player.move(player.speed, 0);
      return;
    }

    if (keyMap[1]) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap[2]) {
      if (player.curAnim() !== "walk-up") player.play("walk-up");
      player.direction = "up";
      player.move(0, -player.speed);
      return;
    }

    if (keyMap[3]) {
      if (player.curAnim() !== "walk-down") player.play("walk-down");
      player.direction = "down";
      player.move(0, player.speed);
    }
  });
});

displayInstructions(() => {
  // Start the game after instructions are closed
  k.go("main");
});
// k.go("main");
