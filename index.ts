import {useCallback, useMemo, useRef, useState} from 'react';
import {Animated, LayoutChangeEvent} from 'react-native';

export function useScrollIndicator() {
  const [viewportWidth, setViewportWidth] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const scrollPercent = useMemo(
    () =>
      ((viewportWidth - (scrollWidth - viewportWidth)) / viewportWidth) * 100,
    [viewportWidth, scrollWidth],
  );

  const scrollX = useRef(new Animated.Value(0)).current;

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const {width} = e.nativeEvent.layout;
    setViewportWidth(width);
  }, []);

  const onContentSizeChange = useCallback((w: number) => {
    setScrollWidth(w);
  }, []);

  const onScroll = useMemo(
    () =>
      Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: true,
      }),
    [],
  );

  return {scrollX, scrollPercent, onLayout, onContentSizeChange, onScroll};
}
