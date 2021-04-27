import pkg from "../package.json";

const repositoryUrl = "https://github.com/wisedog/eslint-plugin-nestjs-framework";

export const docsUrl = (ruleName: string, commitish = `v${pkg.version}`) => {
  return `${repositoryUrl}/blob/${commitish}/docs/rules/${ruleName}.md`;
};
