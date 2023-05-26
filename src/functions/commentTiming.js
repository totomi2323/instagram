const commentTiming = (commentTime) => {

   
    let startDate = new Date();
    let postDate = commentTime.toDate();
    let differenceInSeconds = (startDate -  postDate) / 1000
    let postTiming;

    

    if (differenceInSeconds >= 604800) {
      postTiming = Math.floor(differenceInSeconds/604800) + " w";
    } else if (differenceInSeconds >= 86400 ) {
      postTiming = Math.floor(differenceInSeconds/86400) + " d"
    } else if (differenceInSeconds >= 3600 ) {
      postTiming = Math.floor(differenceInSeconds/3600) + " h"
    } else if (differenceInSeconds >= 60) {
      postTiming = Math.floor(differenceInSeconds /60) + " m"
    } else if (differenceInSeconds < 60){
      postTiming = Math.floor(differenceInSeconds) + " s"
    }
    return (postTiming)
  };
  
  export default commentTiming;
  