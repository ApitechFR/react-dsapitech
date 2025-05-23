#!/usr/bin/env node

const [, , commandName, ...args] = process.argv;

(async () => {
    switch (commandName) {
        case "update-icons":
            {
                const { main } = await import("./only-include-used-icons");

                await main(args);
            }
            break;
        case "copy-static-assets":
            {
                const { main } = await import("./copy-dsapitech-to-public");

                await main(args);
            }
            break;
        default:
            console.error(`Unknown command ${commandName}`);
            process.exit(-1);
    }
})();
