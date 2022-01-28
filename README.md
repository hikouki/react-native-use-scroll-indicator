# react-native-use-scroll-indicator

React hooks for ScrollView indicator of react-native.

## Installation

```
npm install react-native-use-scroll-indicator
```

## Usage

```tsx
import React from 'react';
import {View, Animated} from 'react-native';
import useScrollIndicator from react-native-use-scroll-indicator';

export default function Screen() {
  const {moveX, indicator, onLayout, onContentSizeChange, onScroll} =
    useScrollIndicator();
    
  return (
    <View>
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onLayout={onLayout}
        onContentSizeChange={onContentSizeChange}
        onScroll={onScroll}
      />
      <View style={{
        width: '80%',
        height: 20,
        backgroundColor: '#333333',
        borderRadius: 10,
      }}>
        <Animated.View
          style={[
            {
              backgroundColor: '#27BDB9',
              height: '100%',
              borderRadius: 10,
            },
            {
              width: indicator.width,
              transform: [
                {
                  translateX: Animated.multiply(moveX, 0.8),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
}
```
