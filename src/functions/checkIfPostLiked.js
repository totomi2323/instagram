const checkIfPostLiked = (postLikes, userUID) => {
    let match = false;

    if (postLikes) {
        for (let i = 0; i <= postLikes.length; i++) {
          if (postLikes[i] === userUID) {
            match = true;
          }
        }
      }
    return match;
}

export default checkIfPostLiked;