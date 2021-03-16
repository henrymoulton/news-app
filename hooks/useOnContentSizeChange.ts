import { useState, useCallback } from "react";

const useOnContentSizeChange = () => {
  const [contentSize, setContentSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const onContentSizeChange = useCallback((width: number, height: number) => {
    setContentSize({ width, height });
  }, []);

  return { contentSize, onContentSizeChange };
};

export default useOnContentSizeChange;
