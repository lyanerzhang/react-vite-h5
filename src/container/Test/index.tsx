
import { useReducer, useState, useMemo, memo, useEffect } from "react";

const Child = memo(({userInfo}) => {
  console.log("child render");
  return <div>child-----
    <p>{userInfo.name} {userInfo.age}</p>
  </div>;
})
const Test = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("test")
  useEffect(() => {
    console.log("useEffect");
  }, [count]);
  const userInfo = useMemo(() => {
    return {
      name,
      age: 18
    }
  }, [name])
  return <div>
    <p>
      count is {count}
      <button onClick={() => setCount(count + 1)}>count+1</button>
    </p>
    <Child userInfo={userInfo}></Child>
  </div>;
};
export default Test;