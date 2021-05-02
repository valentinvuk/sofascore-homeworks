import { useState } from "react";

function useShow(initalStatus) {
  const [status, setStatus] = useState(initalStatus);

  return [status, () => setStatus((prev) => !prev)];
}

export default useShow;
