# appfe

Hello Folks,
In this README I (Aakash) assume that we have React Native setup on our local machines.
Steps to setup project are as follows.

    1.	Take a clone from GitHub of the master branch or whichever branch you want to test.
    2.	Open the cloned project in Visual Studio Code.
    3.	Execute the command - npx react-native start (This will start the Metro Bundler).
    4.	Execute the command - npm install (This will install all the libraries)
    5.	Now, from the project root, navigate to iOS directory via command - cd ios.
    6.	Once inside the iOS directory, execute the command - pod install (This will install all the libraries on the iOS side via pods).
    7.	After successfully installing iOS pods, we have to navigate back to the root of project via command - cd .. (Move back to project root from the iOS folder)
    8.	After landing on project root all we have to do is run the app via following commands for iOS we have to execute the command - npx react-native run-ios
    9.	For Android, open android studio, drag and drop the android folder inside it from the cloned project directory & you can run the project from android studio directly.
    10.	In case you want to run the project from Visual Studio Code, then launch the android emulator from Android Studio. Once android emulator is up and running, we can simply execute the following command - npx react-native run-android

NOTE : In case of any queries or if you find and difficulties, feel free to contact our developer. Hope it helps. Thanks .
