declare module pyodide {
    interface Pyodide {
        /**
         *
         * An alias to the global Python namespace.
         *
         * An object whose attributes are members of the Python global namespace.
         * For example, to access the ``foo`` Python object from Javascript use
         * ``pyodide.globals.get("foo")``
         */
        globals: {[key: string]: any};

        /**
         * Load a package or a list of packages over the network. This makes the files
         * for the package available in the virtual filesystem. The package needs to
         * be imported from Python before it can be used.
         * @param names package name, or URL. Can be either a single
         * element, or an array
         * @param messageCallback A callback, called with progress messages
         * (optional)
         * @param errorCallback A callback, called with error/warning
         * messages (optional)
         * @returns Promise Resolves to ``undefined`` when loading is complete
         */
        loadPackage(
            names: string | string[],
            messageCallback?: (message: string) => any,
            errorCallback?: (error: string) => any
        ): Promise<void>;


        /**
         * Inspect a Python code chunk and use :js:func:`pyodide.loadPackage` to load any known
         * packages that the code chunk imports. Uses
         * :func:`pyodide_py.find_imports <pyodide.find\_imports>` to inspect the code.
         *
         * For example, given the following code as input
         *
         * .. code-block:: python
         *
         *    import numpy as np
         *    x = np.array([1, 2, 3])
         *
         * :js:func:`loadPackagesFromImports` will call ``pyodide.loadPackage(['numpy'])``.
         * See also :js:func:`runPythonAsync`.
         *
         * @param {*} code
         * @param {*} messageCallback
         * @param {*} errorCallback
         */
        loadPackagesFromImports(
            code: string,
            messageCallback?: (message: string) => any,
            errorCallback?: (error: string) => any
        ): Promise<void>;

        /**
         *
         * The list of packages that Pyodide has loaded.
         * Use ``Object.keys(pyodide.loadedPackages)`` to get the list of names of
         * loaded packages, and ``pyodide.loadedPackages[package_name]`` to access
         * install location for a particular ``package_name``.
         *
         * @type {object}
         */
        loadedPackages: {[package: string]: string};

        /**
         * Runs Python code, possibly asynchronously loading any known packages that
         * the code imports. For example, given the following code
         *
         * ``` python
         * import numpy as np
         * x = np.array([1, 2, 3])
         * ```
         * 
         * pyodide will first call ``pyodide.loadPackage(['numpy'])``, and then run
         * the code, returning the result. Since package fetching must happen
         * asynchronously, this function returns a `Promise` which resolves to the
         * output. For example:
         *
         * ```javascript
         * let output = pyodide.runPython(code, messageCallback)
         * handleOutput(output);
         * ```
         *
         * @param code Python code to evaluate
         * @param messageCallback A callback, called with progress
         * messages. (optional)
         * @param errorCallback A callback, called with error/warning
         * messages. (optional)
         */
        runPython<T extends unknown>(
            code: string,
            messageCallback?: (message: string) => any,
            errorCallback?: (error: string) => any
        ): T;

        /**
         * Runs Python code, possibly asynchronously loading any known packages that
         * the code imports. For example, given the following code
         *
         * ``` python
         * import numpy as np
         * x = np.array([1, 2, 3])
         * ```
         *
         * pyodide will first call ``pyodide.loadPackage(['numpy'])``, and then run
         * the code, returning the result. Since package fetching must happen
         * asynchronously, this function returns a `Promise` which resolves to the
         * output. For example:
         *
         * ```javascript
         * pyodide.runPythonAsync(code, messageCallback)
         *        .then((output) => handleOutput(output));
         * ```
         *
         * @param code Python code to evaluate
         * @param messageCallback A callback, called with progress
         * messages. (optional)
         * @param errorCallback A callback, called with error/warning
         * messages. (optional)
         */
         runPythonAsync<T extends unknown>(
            code: string,
            messageCallback?: (message: string) => any,
            errorCallback?: (error: string) => any
        ): Promise<T>;

        /**
         *
         * The pyodide version.
         *
         * It can be either the exact release version (e.g. ``0.1.0``), or
         * the latest release version followed by the number of commits since, and
         * the git hash of the current commit (e.g. ``0.1.0-1-bd84646``).
         */
        version: string;

        /**
         * Registers the Javascript object ``module`` as a Javascript module named
         * ``name``. This module can then be imported from Python using the standard
         * Python import system. If another module by the same name has already been
         * imported, this won't have much effect unless you also delete the imported
         * module from ``sys.modules``. This calls the ``pyodide_py`` api
         * :func:`pyodide.register_js_module`.
         *
         * @param name Name of the Javascript module to add
         * @param module Javascript object backing the module
         */
         registerJsModule(name: string, module: any): void;

        /**
         * Unregisters a Javascript module with given name that has been previously
         * registered with :js:func:`pyodide.registerJsModule` or
         * :func:`pyodide.register_js_module`. If a Javascript module with that name
         * does not already exist, will throw an error. Note that if the module has
         * already been imported, this won't have much effect unless you also delete
         * the imported module from ``sys.modules``. This calls the ``pyodide_py`` api
         * :func:`pyodide.unregister_js_module`.
         *
         * @param name Name of the Javascript module to add
         * @param module Javascript object backing the module
         */
         unregisterJsModule(name: string): void;


        /**
         * An alias to the Python pyodide package.
         */
        pyodide_py: any;
    }

    export function loadPyodide(config: { indexURL: string }): Promise<Pyodide>;
}