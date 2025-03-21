import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Tabs, Redirect } from "expo-router"; 

import {icons} from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
      <View style={styles.tabIconContainer}>
        <Image 
          source={icon}
          resizeMode="contain"
          style={[styles.icon, { tintColor: color }]} // Apply dynamic color with tintColor
        />
        <Text style={[styles.tabLabel, { color: color }, focused && styles.focusedLabel]}>
          {name}
        </Text>
      </View>
    );
  };
  
  const TabsLayout = () => {
    return (
      <>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFA001',
            tabBarInactiveTintColor:'#CDCDE0',
            tabBarStyle:{
                backgroundColor: '#161622',
                borderTopWidth: 1,
                borderTopColor: '#232533',
                height: 84,
            }
          }}
        >
          <Tabs.Screen 
            name="home"
            options={{
              title: 'Home',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen 
            name="bookmark"
            options={{
              title: 'Bookmark',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.bookmark}
                  color={color}
                  name="Bookmark"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen 
            name="create"
            options={{
              title: 'Create',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.plus}
                  color={color}
                  name="Create"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen 
            name="profile"
            options={{
              title: 'Profile',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  name="Profile"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    tabIconContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 8, // Replaces gap-2
    },
    icon: {
      width: 24, // Equivalent to w-6
      height: 24, // Equivalent to h-6
    },
    tabLabel: {
      fontSize: 12, // Equivalent to text-xs
      textAlign: "center",
      fontFamily: "Poppins-Regular", // You can replace this with the regular font you need
    },
    focusedLabel: {
      fontFamily: "Poppins-SemiBold", // Apply semi-bold font when focused
    },
    tabBarStyle: {
      backgroundColor: "#161622",
      borderTopWidth: 1,
      borderTopColor: "#232533",
      height: 84,
    },
  });
  
  export default TabsLayout;