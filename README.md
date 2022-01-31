# react-native-use-scroll-indicator

React hooks for ScrollView indicator of react-native.

## Installation

```
npm install react-native-use-scroll-indicator
```

## Usage

Horizontal Indicator.

```tsx
import React from 'react';
import {Animated} from 'react-native';
import {HorizontalScrollIndicator} from 'react-native-use-scroll-indicator';

export default function Screen() {
  ...

  return (
    <HorizontalScrollIndicator scale={0.8}>
      {({ref, onLayout, onContentSizeChange, onScroll}) => (
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          ref={ref}
          onLayout={onLayout}
          onContentSizeChange={onContentSizeChange}
          onScroll={onScroll}
        />
      )}
    </HorizontalScrollIndicator>
  );
}
```

Vertical Indicator.

```tsx
import React from 'react';
import {Animated} from 'react-native';
import {VerticalScrollIndicator} from 'react-native-use-scroll-indicator';

export default function Screen() {
  ...

  return (
    <VerticalScrollIndicator scale={0.8}>
      {({ref, onLayout, onContentSizeChange, onScroll}) => (
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          ref={ref}
          onLayout={onLayout}
          onContentSizeChange={onContentSizeChange}
          onScroll={onScroll}
        />
      )}
    </VerticalScrollIndicator>
  );
}
```

Without Component.

```tsx
import React from 'react';
import {View, Animated} from 'react-native';
import {useScrollIndicator} from react-native-use-scroll-indicator';

export default function Screen() {
  const {moveX, indicator, viewportSize, onLayout, onContentSizeChange, onScroll} =
    useScrollIndicator();
  const scale = 0.8;

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
        width: viewportSize.w * scale,
        height: 8,
        backgroundColor: '#333333',
        borderRadius: 4,
      }}>
        <Animated.View
          style={[
            {
              backgroundColor: '#27BDB9',
              height: '100%',
              borderRadius: 4,
            },
            {
              width: indicator.width * scale,
              transform: [
                {
                  translateX: Animated.multiply(moveX, scale * indicator.sx),
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

## Interface

### HorizontalScrollIndicator

| Prop                    | Required | Type                  |
|-------------------------|:--------:|-----------------------|
| children                |    ○     | Function              |
| containerStyle          |          | StyleProp\<ViewStyle> |
| indicatorContainerStyle |          | StyleProp\<ViewStyle> |
| indicatorStyle          |          | StyleProp\<ViewStyle> |
| scale                   |          | number                |

### VerticalScrollIndicator

| Prop                    | Required | Type                  |
|-------------------------|:--------:|-----------------------|
| children                |    ○     | Function              |
| containerStyle          |          | StyleProp\<ViewStyle> |
| indicatorContainerStyle |          | StyleProp\<ViewStyle> |
| indicatorStyle          |          | StyleProp\<ViewStyle> |
| scale                   |          | number                |

## LICENSE

MIT
