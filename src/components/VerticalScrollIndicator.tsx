import React, {useRef} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import VerticalScrollIndicatorComponent from './VerticalScrollIndicatorComponent';
import useScrollIndicator from '../useScrollIndicator';

interface VerticalScrollIndicatorProp {
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

export default function VerticalScrollIndicator({
  children,
  scale = 1,
  containerStyle,
  indicatorContainerStyle,
  indicatorStyle,
}: VerticalScrollIndicatorProp) {
  const listRef = useRef<FlatList | null>(null);
  const {
    moveY,
    indicator,
    viewportSize,
    onLayout,
    onContentSizeChange,
    onScroll,
  } = useScrollIndicator();

  return (
    <View style={[styles.container, containerStyle]}>
      {children({ref: listRef, onLayout, onContentSizeChange, onScroll})}
      <VerticalScrollIndicatorComponent
        viewportSize={viewportSize}
        containerStyle={indicatorContainerStyle}
        style={indicatorStyle}
        moveY={moveY}
        listRef={listRef}
        indicator={indicator}
        scale={scale}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row', alignItems: 'center'},
});
