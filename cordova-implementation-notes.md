# Adding cordova to preact app

## Attempt 1

Use `cordova create` with the `--link-to` option pointing to the build output folder of an existing preact app:

    npx cordova create . app.web.scrappy-foods ScrappyFoods --link-to=../scrappy-foods/build/

> Note, that was after prepping a directory with cordova. I don't like using `npm install -g`, I prefer installing any dependencies as part of a project and then running npx for command line tools.

    mkdir corder  # experimental cordova project name
    cd corder
    npm install cordova

Now the directory is ready for running the cordova command with npx without having to download it over and over.

### Wah wah

Well that didn't work. It said the folder already exists -- well duh, that's why I pointed to it. Maybe it does the opposite of what the help message led me to believe?

Nope, that wasn't the problem. It doesn't like creating the project into an existing directory (like .)

### Take two

    npx cordova create corder app.web.scrappy_foods ScrappyFoods --link-to=../../jfm/scrappy-foods/build/

That worked, but it the `--link-to` argument didn't seem to do anything, instead it just generated it's own `www` folder. After building it and realizing that, I renamed the www folder to www3 and linked a new www to the remote build folder. That worked when I ran the browser platform:

    npx cordova platform add browser
    npx cordova run browser

## Building Android

I continue to have a number of problems running the android platform -- I generally get this error even though I can run from inside of android studio and I've installed the HAXM drivers:

    PANIC: Missing emulator engine program for 'x86' CPU.

I'm sure I just need to fix some path or environment setting so that cordova can find the engine. I did realize during hte process though that I had only installed the latest platform (Q) in Android Studio -- both for the build platform, but also for the single Pixel emulator that I installed. Cordova is two releases behind in it's support (Oreo 8.1) so I went back and installed Pie (9.0) and Oreo (8.1) SDKs.

## Take three

Let's try again from scratch

    npx cordova create preco app.web.preco Preco
    cd preco
    git init
    git add .
    git commit

Create a separate project with preact

    npx -p preact-cli preact create typescript preco2 --name preco
    cd preco2
    git init
    git add .
    git commit

Alternatively, maybe we can add preact right into the cordova project -- from the first preco project directory above, continue with this:

    npm install -D preact-cli@3.0.0-rc.7
    npx preact create typescript . --name preco --force
    npm install -D cordova
    git add . && git commit -m "add cordova and preact"
    npm install -D @react/types
    ## edit package.json and add --no-prerender to build script
    git add . && git commit -m "fix renderspy issue with react typings"

Now we can add some cordova platforms (browser and android for now)

    npx cordova platform add browser
    echo "www/" >> platforms/.gitignore
    git add .
    git commit
    npx cordova platform add android
    git add .
    git commit

Build it and start the emulator from the command line:
  
 npx cordova build android
~/Library/Android/sdk/emulator/emulator @3.2_HVGA_slider_ADP1_API_28
adb -e install -r platforms/android/app/build/outputs/apk/debug/app-debug.apk

> I'm using an emulator that I installed from Android Studio -- in order to list the emulators:

    ~/Library/Android/sdk/emulator/emulator -list-avds

## Conclusions...

Ok, this is actually helped a bit. I finally have a general idea of the `architectural strategies` going on here with cordova:

### The cordova build process

This basically just merges the contents of the `/www` folder with the `platform_www` folder in the platform. This is where the `cordova.js` file is _injected_ and plugins/device details are made available.

### Key Insights

-   Android/iOS webviews load local files
-   Module style javascript is not supported from local files
-   Service workers are not supported from local files
-   Cordova/Ionic only really use service worker PWA/browser target

### Consequences

-   Preact build should only target nomodule bundle
-   Skip service worker
-   User relative path references

### Routes and Hash History

Ugh, ok, this took a bit of luck to find

[webpack public path](https://github.com/webpack-contrib/file-loader/issues/46) and [hash history](https://github.com/preactjs/preact-router/issues/88)

Use hash history for routing and an empty value for the webpack public path (the base url) and apparently this combo is the recommended hack for cordova apps.

> AND IT FRICKING WORKS!!! Why was that so hard to find. Maybe it's been staring me in the face all this time, but because I didn't know what _hash history_ was, I didn't know what people were talking about.

## Final Approach

Based on all of this, I think I have a new idea on how to "add" cordova support into an existing preact project.

1. Create a separate build script/preact config file
2. Implement the hash router
3. Add a cordova config.xml file to the project (semi manually)
4. `npm install -D cordova` (install cordova into the project)
5. `npx cordova platform add android` -- add the platforms

> let's see if it actually works -- it did! At least mostly... I had to tweak the Content Security Protocol settings in the html header, but once I added a few img-src and content-src sources to let some google and firebase resources through it worked fine.
