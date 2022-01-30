import React, {useRef} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import HorizontalScrollIndicatorComponent from './HorizontalScrollIndicatorComponent';
import useScrollIndicator from '../useScrollIndicator';

interface HorizontalScrollIndicatorProp {
  containerStyle?: StyleProp<ViewStyle>;
  indicatorContainerStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  scale?: number;
  children: (props: {
    ref: React.MutableRefObject<FlatList | null>;
    onLayout: (e: LayoutChangeEvent) => void;
    onContentSizeChange: (w: number, h: number) => void;
    onScroll: (...args: any[]) => void;
  }) => React.ReactNode;
}

export default function HorizontalScrollIndicator({
  children,
  scale = 1,
  containerStyle,
  indicatorContainerStyle,
  indicatorStyle,
}: HorizontalScrollIndicatorProp) {
  const listRef = useRef<FlatList | null>(null);
  const {moveX, indicator, onLayout, onContentSizeChange, onScroll} =
    useScrollIndicator();

  return (
    <View style={[styles.container, containerStyle]}>
      {children({ref: listRef, onLayout, onContentSizeChange, onScroll})}
      <HorizontalScrollIndicatorComponent
        containerStyle={indicatorContainerStyle}
        style={indicatorStyle}
        moveX={moveX}
        listRef={listRef}
        indicator={indicator}
        scale={scale}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});
