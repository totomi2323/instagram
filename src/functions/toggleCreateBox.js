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
  window.scrollTo({ top: 0, behavior: 'smooth' })
  document.querySelector("#imagePreview").src = "#";
  document.querySelector("#selectPicture").value = null;
  document.querySelector(".postButton").classList.add("hidden")
  
  if (window.innerWidth >= 1000) {
    document.querySelector("body").classList.toggle("stop-scrolling")
  }
};


export default toggleCreateBox;
