const toggleCreateBox = (set, prevValue) => {
  let createBox = document.querySelector(".createBox");
  let blurMain = document.querySelector(".main");
  createBox.classList.toggle("hidden");
  blurMain.classList.toggle("blur");
  if (createBox.classList.contains("hidden") === true) {
    set(false);
  } else {
    set(true);
  }
  console.log(prevValue)
};

export default toggleCreateBox;
