/**
 * @fileoverview ESLint plugin rules for Nest.js framework
 * @author Jongha Kim
 */

import { useApiOperation } from "./rules/use-api-operation";

export const rules = {
  "use-api-operation": useApiOperation,
};

export const configs = {
  recommended: {
    rules: {
      "nest-js/use-api-operation": 1,
    },
  },
};
