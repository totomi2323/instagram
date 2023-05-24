const toggleCreateBox = (set, prevValue) => {
  let createBox = document.querySelector(".createBox");
  createBox.classList.toggle("hidden");
  
  let blurMain = document.querySelector(".main");
  blurMain.classList.toggle("blur");
  if (createBox.classList.contains("hidden") === true) {
    set(false);
  } else {
    set(true);
  }
  console.log(prevValue)
};

export default toggleCreateBox;
