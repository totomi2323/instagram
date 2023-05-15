import uniqid from "uniqid";
const refreshHomePage =  (update) => {
    let newKey = uniqid();
    update(newKey)
   }

export default refreshHomePage;