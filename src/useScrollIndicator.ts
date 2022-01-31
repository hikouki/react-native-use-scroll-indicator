import {useCallback, useMemo, useRef, useState} from 'react';
import {Animated, LayoutChangeEvent} from 'react-native';

export default function useScrollIndicator() {
  const moveX = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(0)).current;

  const [viewportSize, setViewportSize] = useState({w: 0, h: 0});
  const [contentSize, setContentSize] = useState({w: 0, h: 0});

  const indicator = useMemo(() => {
    const sx =
      contentSize.w > viewportSize.w ? viewportSize.w / contentSize.w : 1;

    const sy =
      contentSize.h > viewportSize.h ? viewportSize.h / contentSize.h : 1;

    return {
      sx: sx || 0,
      sy: sy || 0,
      width: sx * viewportSize.w || 0,
      height: sy * viewportSize.h || 0,
    };
  }, [viewportSize, contentSize]);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const {width, height, x, y} = e.nativeEvent.layout;
    setViewportSize({w: width + x, h: height + y});
  }, []);

  const onContentSizeChange = useCallback((w: number, h: number) => {
    setContentSize({w, h});
  }, []);

  const onScroll = useMemo(
    () =>
      Animated.event([{nativeEvent: {contentOffset: {x: moveX, y: moveY}}}], {
        useNativeDriver: true,
      }),
    [],
  );

  return {
    moveX,
    moveY,
    viewportSize,
    contentSize,
    indicator,
    onLayout,
    onContentSizeChange,
    onScroll,
  };
}
