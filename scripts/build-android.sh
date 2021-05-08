rm -rf ./build
meteor build ./build --server=https://brightpsy.ovh

cd ./build/android/project/app/build/outputs/apk/release/

keytool -genkey -alias 'brightpsy' -keyalg RSA -keysize 2048 -validity 10000
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 'app-release-unsigned.apk' 'brightpsy'

$ANDROID_HOME/build-tools/30.0.3/zipalign 4 app-release-unsigned.apk brightpsy.apk
