const body = document.querySelector("body");
const main = document.querySelector(".game");
const climbList = Array.from(document.querySelectorAll(".line"));
let countIndex = 0;
const winner = document.querySelector(".winner");
let healthPoint = "100";
const dragon = document.createElement("img");
dragon.src = "./img/pngwing.com.png";
dragon.alt = "dragon";
dragon.className = "dragon";
const skullDragon = document.createElement("img");
skullDragon.src = "./img/skull-dragon.png";
skullDragon.alt = "dragon skull";
skullDragon.className = "dead-dragon";
let attackBtn;
let dragonHealth;
let congrats;

function goWin() {
  const climber = main.querySelector(".climber");

  if (countIndex < climbList.length - 1) {
    climbList[countIndex].removeChild(climber);
    countIndex += 1;
    climbList[countIndex].appendChild(climber);
  }
  if (countIndex >= climbList.length / 2) {
    winner.style.display = "block";
  }
  for (let i = 0; i < climbList.length; i += 1) {
    if (countIndex === climbList.length / 2) {
      climbList[i].style.display = "block";
    }
  }

  function createBtn() {
    const dangerFlex = document.createElement("div");
    dangerFlex.className = "flex-message";
    dangerFlex.style.cssText = `display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    font-size: 44px`;

    congrats = document.createElement("div");
    congrats.innerText = "Oh no! It's a DRAGON!!! Attack him!!!";
    congrats.className = "danger-message";
    const btn = document.createElement("button");
    btn.innerText = "Attack";
    btn.className = "main-button";
    btn.style.cssText = `text-align: center;
      color: red;
      font-size: 44px;
      background-color: blue;
      `;

    dragonHealth = document.createElement("div");
    dragonHealth.className = "health";
    dragonHealth.innerText = healthPoint;
    dragonHealth.style.cssText = `width: 100px;
      height: 100px;
      text-align: center;
      border: 2px solid black;
      background-color: darkred`;
    dangerFlex.appendChild(congrats);
    dangerFlex.appendChild(btn);
    dangerFlex.appendChild(dragonHealth);
    attackBtn = btn;
    return body.prepend(dangerFlex);
  }
  if (!buttonCreated && countIndex === climbList.length - 1) {
    main.appendChild(dragon);
    createBtn();
    buttonCreated = true;

    attackBtn.addEventListener("click", () => {
      healthPoint -= 20;
      dragonHealth.innerText = healthPoint;
      if (healthPoint <= "0") {
        congrats.innerText = "Yeeeeee you killed the dragon! You're my hero!";
        main.appendChild(skullDragon);
        dragon.style.display = "none";
      }
    });
  }
}
document.addEventListener("keydown", (event) => {
  if (event.code === "KeyX") {
    goWin();
  }
});

function goBack() {
  const climber = main.querySelector(".climber");
  if (countIndex > 0) {
    climbList[countIndex].removeChild(climber);
    countIndex -= 1;
    climbList[countIndex].appendChild(climber);
  }
}

document.addEventListener("keydown", (event) => {
  if (event.code === "KeyZ") {
    goBack();
  }
});
