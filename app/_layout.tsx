// Tệp: app/_layout.tsx (hoặc nơi chứa index.tsx của bạn)
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* Cấu hình này sẽ áp dụng cho tệp "index.tsx" */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Ẩn header có chữ "index"
        }}
      />
    </Stack>
  );
}