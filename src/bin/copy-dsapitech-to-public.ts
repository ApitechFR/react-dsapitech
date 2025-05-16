#!/usr/bin/env node

/**
 * This script is ran with `npx react-dsapitech copy-dsapitech-to-public`
 * It takes one optional arguments (for NX monorepos):
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 */

import { join as pathJoin, resolve as pathResolve } from "path";
import * as fs from "fs";
import { getProjectRoot } from "./tools/getProjectRoot";
import yargsParser from "yargs-parser";
import { getAbsoluteAndInOsFormatPath } from "./tools/getAbsoluteAndInOsFormatPath";
import { readPublicDirPath } from "./readPublicDirPath";
import { transformCodebase } from "./tools/transformCodebase";
import { assert } from "tsafe/assert";
import { modifyHtmlHrefs } from "./tools/modifyHtmlHrefs";

export async function main(args: string[]) {
    const argv = yargsParser(args);

    const projectDirPath: string = (() => {
        read_from_argv: {
            const arg = argv["projectDir"];

            if (arg === undefined) {
                break read_from_argv;
            }

            return getAbsoluteAndInOsFormatPath({ "pathIsh": arg, "cwd": process.cwd() });
        }

        return process.cwd();
    })();

    const publicDirPath = await readPublicDirPath({ projectDirPath });

    const htmlFilePath = await (async () => {
        vite: {
            const filePath = pathJoin(projectDirPath, "index.html");

            if (!fs.existsSync(filePath)) {
                break vite;
            }

            return filePath;
        }

        cra: {
            const filePath = pathJoin(publicDirPath, "index.html");

            if (!fs.existsSync(filePath)) {
                break cra;
            }

            return filePath;
        }

        assert(false, "Can't locate your index.html file.");
    })();

    if (!fs.existsSync(publicDirPath)) {
        console.error(`Can't locate your public directory.`);
        process.exit(-1);
    }

    const dsapitechDirPath = pathJoin(publicDirPath, "dsapitech");

    const gouvFrDsapitechVersion: string = JSON.parse(
        fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8")
    )["devDependencies"]["@apitech/dsapitech"];

    const versionFilePath = pathJoin(dsapitechDirPath, "version.txt");

    early_exit: {
        if (!fs.existsSync(dsapitechDirPath)) {
            break early_exit;
        }

        if (!fs.existsSync(versionFilePath)) {
            break early_exit;
        }

        const currentVersion = fs.readFileSync(versionFilePath).toString("utf8");

        if (currentVersion !== gouvFrDsapitechVersion) {
            fs.rmSync(dsapitechDirPath, { "recursive": true, "force": true });
            break early_exit;
        }

        return;
    }

    fs.mkdirSync(dsapitechDirPath, { "recursive": true });

    fs.writeFileSync(pathJoin(dsapitechDirPath, ".gitignore"), Buffer.from("*", "utf8"));

    const dsapitechDistNodeModulesDirPath = (function dsapitechDistNodeModulesDirPath(depth: number): string {
        const parentProjectDirPath = pathResolve(
            pathJoin(...[projectDirPath, ...new Array(depth).fill("..")])
        );

        const dsapitechDirPathInNodeModules = pathJoin(
            ...[parentProjectDirPath, "node_modules", "@apitech", "react-dsapitech", "dsapitech"]
        );

        if (!fs.existsSync(dsapitechDirPathInNodeModules)) {
            if (parentProjectDirPath === "/") {
                console.error(
                    [
                        "Can't find dsapitech directory",
                        `please submit an issue about it here ${getRepoIssueUrl()}`
                    ].join(" ")
                );
                process.exit(-1);
            }

            return dsapitechDistNodeModulesDirPath(depth + 1);
        }

        return dsapitechDirPathInNodeModules;
    })(0);

    {
        const dsapitechMinCssFileRelativePath = "dsapitech.min.css";

        const usedAssetsRelativeFilePaths = new Set(
            readAssetsImportFromDsapitechCss({
                "dsapitechSourceCode": fs
                    .readFileSync(pathJoin(dsapitechDistNodeModulesDirPath, dsapitechMinCssFileRelativePath))
                    .toString("utf8")
            })
        );

        const fileToKeepRelativePaths = new Set([
            pathJoin("favicon", "apple-touch-icon.png"),
            pathJoin("favicon", "favicon.svg"),
            pathJoin("favicon", "favicon.ico"),
            pathJoin("favicon", "manifest.webmanifest"),
            pathJoin("utility", "icons", "icons.min.css"),
            dsapitechMinCssFileRelativePath
        ]);

        transformCodebase({
            "srcDirPath": dsapitechDistNodeModulesDirPath,
            "destDirPath": dsapitechDirPath,
            "transformSourceCode": ({ fileRelativePath, sourceCode }) => {
                if (
                    fileToKeepRelativePaths.has(fileRelativePath) ||
                    usedAssetsRelativeFilePaths.has(fileRelativePath)
                ) {
                    return { "modifiedSourceCode": sourceCode };
                }
            }
        });
    }

    fs.writeFileSync(versionFilePath, Buffer.from(gouvFrDsapitechVersion, "utf8"));

    add_version_query_params_in_html_imports: {
        const { modifiedHtml } = modifyHtmlHrefs({
            "html": fs.readFileSync(htmlFilePath).toString("utf8"),
            "getModifiedHref": href => {
                if (!href.includes("/dsapitech/")) {
                    return href;
                }

                const [urlWithoutQuery] = href.split("?");

                return `${urlWithoutQuery}?v=${gouvFrDsapitechVersion}`;
            }
        });

        if (htmlFilePath === modifiedHtml) {
            break add_version_query_params_in_html_imports;
        }

        fs.writeFileSync(htmlFilePath, Buffer.from(modifiedHtml, "utf8"));
    }
}

function readAssetsImportFromDsapitechCss(params: { dsapitechSourceCode: string }): string[] {
    const { dsapitechSourceCode } = params;

    const fileRelativePaths = [/url\("([^"]+)"\)/g, /url\('([^']+)'\)/g, /url\(([^)]+)\)/g]
        .map(regex => {
            const fileRelativePaths: string[] = [];

            dsapitechSourceCode.replace(regex, (...[, relativeFilePath]) => {
                if (relativeFilePath.startsWith("data:")) {
                    return "";
                }

                fileRelativePaths.push(relativeFilePath);

                return "";
            });

            return fileRelativePaths;
        })
        .flat();

    assert(fileRelativePaths.length !== 0);

    return fileRelativePaths;
}

function getRepoIssueUrl() {
    const reactDsapitechRepoUrl = JSON.parse(
        fs.readFileSync(pathJoin(getProjectRoot(), "package.json")).toString("utf8")
    )
        ["repository"]["url"].replace(/^git/, "https:")
        .replace(/\.git$/, "");

    return `${reactDsapitechRepoUrl}/issues`;
}

if (require.main === module) {
    main(process.argv.slice(2));
}
