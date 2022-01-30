import React, {useRef, useMemo, useCallback} from 'react';
import {
  StyleProp,
  ViewStyle,
  ScrollView,
  FlatList,
  View,
  Animated,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

interface HorizontalScrollIndicatorProp {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  moveX: Animated.Value;
  listRef: React.RefObject<FlatList | null>;
  indicator: {sx: number; width: number};
  scale: number;
}

export default function HorizontalScrollIndicatorComponent({
  containerStyle,
  style,
  indicator,
  moveX,
  listRef,
  scale,
}: HorizontalScrollIndicatorProp) {
  const currentScrollOffsetX = useRef(0);
  const startScrollOffsetX = useRef(0);
  const draggable = useRef(false);

  moveX.addListener(e => {
    currentScrollOffsetX.current = e.value;
  });

  const width = useMemo(
    () => indicator.width * scale,
    [indicator.width, scale],
  );

  const dragOn = useCallback(() => {
    draggable.current = true;
  }, []);

  const dragOff = useCallback(() => {
    draggable.current = false;
  }, []);

  const containerTouchEnd = useCallback(
    (e: GestureResponderEvent) => {
      if (draggable.current) return;

      const {
        nativeEvent: {locationX},
      } = e;

      if (listRef.current) {
        const scrollRef = listRef.current.getNativeScrollRef() as ScrollView;
        if (scrollRef) {
          scrollRef.scrollTo({
            x: (locationX - width / 2) / indicator.sx / scale,
            animated: false,
          });
        }
      }
    },
    [draggable, listRef, width, indicator.sx, scale],
  );

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        draggable.current = true;
        startScrollOffsetX.current = currentScrollOffsetX.current;
      },
      onPanResponderRelease: () => {
        draggable.current = false;
      },
      onPanResponderMove: Animated.event([], {
        // @ts-ignore
        listener: (
          _: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => {
          const {dx} = gestureState;

          if (listRef.current) {
            const scrollRef =
              listRef.current.getNativeScrollRef() as ScrollView;
            if (scrollRef) {
              scrollRef.scrollTo({
                x: startScrollOffsetX.current + dx / indicator.sx / scale,
                animated: false,
              });
            }
          }
        },
        useNativeDriver: false,
      }),
    });
  }, [listRef, indicator.sx, scale]);

  return (
    <View
      onTouchStart={containerTouchEnd}
      {...panResponder.panHandlers}
      style={[styles.container, {width: `${scale * 100}%`}, containerStyle]}>
      <Animated.View
        onTouchStart={dragOn}
        onTouchEnd={dragOff}
        style={[
          styles.indicator,
          {
            width,
            transform: [
              {
                translateX: Animated.multiply(moveX, scale * indicator.sx),
              },
            ],
          },
          style,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
  },
  indicator: {
    backgroundColor: '#27BDB9',
    height: '100%',
    borderRadius: 4,
  },
});
