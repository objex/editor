# Objex Editor
## An Open Source Markdown Editor
Description: An Open Source markdown editor.

## Technology stack: Python
## Status: Alpha-0.0.0


## Dependencies
Project required npm to be installed as a package manager. Pyodide (?? update why we need it??)

## Installation
###  Compiling Pyodide Package

Following is the way I used to compile pyodide package. But for alternative solutions checkout [Pydoide Docs](https://pyodide.org/en/latest/development/new-packages.html).

1. Clone Pyodide repository using 
    ```sh
    # save some time using --depth=1 bcz the whole process is gonna too long anyways
    git clone https://github.com/pyodide/pyodide.git --depth=1
    ```
2. Move to pyodide
    ```sh
    cd pyodide
    ```
3. Run docker image
    ```sh
    # wait for ~2.5 GB image to be pulled
    ./run_docker --pre-built
    ```
4. Finally, you will land terminal inside docker. Now run following commands to make required packages
    ```sh
    bin/pyodide mkpkg markdown
    bin/pyodide mkpkg pymdown-extensions
    bin/pyodide mkpkg Pygments # (most probably its not needed)
    ```
5. Now, you are ready to build the packages
    ```sh
    PYODIDE_PACKAGES="micropip,markdown,Pygments,pymdown-extensions" make
    ```
6. Serveral eternities later, you will be having a build folder with all the required files.
7. Copy file from `build` folder to `/src/pyodide/build` but keep in mind not to remove `pyodide.d.ts` and `pyodide.js` also contains some changes.
8. Thanks for you patience.


Configuration
npm pacakge manager is reqired. (?? what else ??)

Usage
1. Install dependencies
    ```sh
    npm i
    ```
2. Compile files in watch mode
    ```sh
    npm run watch
    ```
3. Open a new ternimal and run the following command to open the app in electron
    ```sh
    npm run start
    ```

## How to test the software
?? test ??

## Known issues
Document any known significant shortcomings with the software.

## Getting help
How we can be contacted??

Example

If you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker.

Getting involved
This section should detail why people should get involved and describe key areas you are currently focusing on; e.g., trying to get feedback on features, fixing certain bugs, building important pieces, etc.

General instructions on how to contribute should be stated with a link to CONTRIBUTING.

Open source licensing info
TERMS
LICENSE

## Credits and references
Objex and Rabbito.io team

## Related projects

