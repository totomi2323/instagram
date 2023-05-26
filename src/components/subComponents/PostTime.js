import { useEffect, useState } from "react";

const PostTime = (props) => {
  const { time } = props;

  const [timeToText, setTimeToText] = useState();

  useEffect(() => {
    let postTime = time.toDate();

    setTimeToText(
      postTime.getDate() +
        "/" +
        (postTime.getMonth() + 1) +
        "/" +
        postTime.getFullYear()
    );
  }, []);

  return <p className="postTime"> {timeToText}</p>;
};

export default PostTime;
