# My Atlas

## Steps to run application ##
1. Run ``` git clone https://github.com/GenerateNU/my-atlas.git ``` to clone the repository
2. Have the following app/services download: Node.js, MongoDB, Docker
### To run backend
1. Add .env to backend directory, ask team-member for file
2. In backend directory, run ``` npm install```
3. In root directory, run ``` docker-compose up -d ```
4. In backend directory, run ``` npm run start ```
5. If the server runs properly, the server should message that it has booted up
### To run frontend
1. Install XCode at https://developer.apple.com/xcode/. XCode provides the ios simulator that we'll test the app through.
2. Sign up for an Expo account at https://expo.dev/signup/. Expo is the mobile development framework that lets us build and test our app.
3. In any directory, run ``` npm install -g eas-cli ```
4. In the frontend directory, run ``` npm install ```
5. Install the Expo Go app onto your simulator. Run ``` expo client:install:ios ```
6. Run ``` expo install expo-dev-client ```
7. Run ``` expo install react-native-health ```
8. Build with EAS. Run ``` eas build — profile development — platform ```
9. Download & unzip the .tar.gz file given in terminal once build has finished
10. Drag and drop the build into your simulator.
11. Run ``` expo start — dev-client ``` to start the development server
12. Open the Expo Go app in the simulator and go to your project. The frontend app should open and you should be able to edit code and hot reload.
