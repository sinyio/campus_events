import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { createStyles } from './styles';

const FeedHeaderSkeleton: React.FC = () => {
  const { getColor } = useThemeStyles();
  const shimmerValue = new Animated.Value(0);

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => {
      shimmerAnimation.stop();
    };
  }, []);

  const styles = createStyles(getColor);

  const shimmerStyle = {
    opacity: shimmerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.skeletonContainer}>
          {[...Array(5)].map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.skeletonChip,
                shimmerStyle,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default FeedHeaderSkeleton; 