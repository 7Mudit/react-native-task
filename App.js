import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [wheelHeight, setWheelHeight] = useState(0); // Initial state is 0
  const lastUpdateTime = useRef(Date.now());
  const [loadingBoxPos, setLoadingBoxPos] = useState("absolute");

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y * -1;
    setScrollY(currentScrollY);

    if (currentScrollY >= 80 && Date.now() - lastUpdateTime.current > 5000) {
      setWheelHeight(80);
      lastUpdateTime.current = Date.now();
    } else if (currentScrollY < 80) {
      setWheelHeight(currentScrollY);
    }
  };

  return (
    <View style={{ backgroundColor: "green", flex: 1 }}>
      <View
        style={{
          backgroundColor: "yellow",
          width: "100%",
          height: wheelHeight,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
      <ScrollView
        style={{ position: loadingBoxPos, width: "100%", height: "100%" }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={{ height: 30, backgroundColor: "orange" }}>
          <Text>ComponentA</Text>
        </View>
        <Text style={{ height: 1000 }}>ComponentB</Text>
        <Text>ComponentC</Text>
      </ScrollView>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
