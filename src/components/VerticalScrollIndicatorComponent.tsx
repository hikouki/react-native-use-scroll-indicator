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

interface VerticalScrollIndicatorProp {
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  moveY: Animated.Value;
  listRef: React.RefObject<FlatList | null>;
  indicator: {sy: number; height: number};
  scale: number;
  viewportSize: {h: number};
}

export default function VerticalScrollIndicatorComponent({
  containerStyle,
  style,
  indicator,
  moveY,
  listRef,
  scale,
  viewportSize,
}: VerticalScrollIndicatorProp) {
  const currentScrollOffsetY = useRef(0);
  const startScrollOffsetY = useRef(0);
  const draggable = useRef(false);

  moveY.addListener(e => {
    currentScrollOffsetY.current = e.value;
  });

  const height = useMemo(
    () => indicator.height * scale,
    [indicator.height, scale],
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
        nativeEvent: {locationY},
      } = e;

      if (listRef.current) {
        const scrollRef = listRef.current.getNativeScrollRef() as ScrollView;
        if (scrollRef) {
          scrollRef.scrollTo({
            y: (locationY - height / 2) / indicator.sy / scale,
            animated: false,
          });
        }
      }
    },
    [draggable, listRef, height, indicator.sy, scale],
  );

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        draggable.current = true;
        startScrollOffsetY.current = currentScrollOffsetY.current;
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
          const {dy} = gestureState;

          if (listRef.current) {
            const scrollRef =
              listRef.current.getNativeScrollRef() as ScrollView;
            if (scrollRef) {
              scrollRef.scrollTo({
                y: startScrollOffsetY.current + dy / indicator.sy / scale,
                animated: false,
              });
            }
          }
        },
        useNativeDriver: false,
      }),
    });
  }, [listRef, indicator.sy, scale]);

  return (
    <View
      onTouchStart={containerTouchEnd}
      {...panResponder.panHandlers}
      style={[
        styles.container,
        {height: scale * viewportSize.h},
        containerStyle,
      ]}>
      <Animated.View
        onTouchStart={dragOn}
        onTouchEnd={dragOff}
        style={[
          styles.indicator,
          {
            height,
            transform: [
              {
                translateY: Animated.multiply(moveY, scale * indicator.sy),
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
    width: 8,
    backgroundColor: '#333333',
    borderRadius: 4,
  },
  indicator: {
    backgroundColor: '#27BDB9',
    width: '100%',
    borderRadius: 4,
  },
});
