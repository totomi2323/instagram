const toggleCreateBox =  () => {
    let createBox =  document.querySelector(".createBox");
    let blurMain = document.querySelector(".main");
    createBox.classList.toggle("hidden");
    blurMain.classList.toggle("blur")
   }

export default toggleCreateBox;