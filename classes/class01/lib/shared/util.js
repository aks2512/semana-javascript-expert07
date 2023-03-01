function supportWorkerType() {
    let supports = false;
    const tester = {
        get type() { supports = true } // it's supported
    };
    try {
        //  We use "blob://" as url to avoid an useless network request.
        // this will either throw in Chrome
        // either fire an error event in Firework
        // which is perfect since
        // we don't need the worker to actually start,
        // checking for the type of the script is done before trying to load it.
        new Worker("blob://", tester).terminate();
    } finally {
        return supports;
    }
}

function prepareRunChecker({ timerDelay }) {
    let lastEvent = Date.now()
    return {
        shouldRun () {
            const result = (Date.now() - lastEvent) > timerDelay;
            if (result) lastEvent = Date.now()
            return result;
        }
    }
}

export {
    supportWorkerType,
    prepareRunChecker
};
