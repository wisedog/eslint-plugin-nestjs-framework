import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/experimental-utils";
import { docsUrl } from "docUrl";

export const message = "Use @ApiOperation for API Endpoints";
export const messageSummary = "Should be 'summary' property for @ApiOperation";
export const messageDescription = "Should be 'description' property for @ApiOperation";

export const useApiOperation = {
  meta: {
    type: "suggestion",
    schema: [
      {
        type: "object",
        docs: {
          url: docsUrl("newline-after-import"),
        },
        properties: {
          shouldBeSummary: {
            type: "boolean",
            default: true,
          },
          shouldBeDescription: {
            type: "boolean",
            default: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context: any) {
    return {
      MethodDefinition: (node: TSESTree.MethodDefinition) => {
        const targetDecorators = ["Get", "Post", "Delete", "Patch", "Put"];
        const isInTarget = node.decorators?.some((d: TSESTree.Decorator) => {
          return (
            d.expression.type === AST_NODE_TYPES.CallExpression &&
            d.expression.callee.type === AST_NODE_TYPES.Identifier &&
            targetDecorators.includes(d.expression.callee.name)
          );
        });
        if (!isInTarget) {
          return;
        }
        const isExistApiOperationDecorators = node.decorators?.find((d: TSESTree.Decorator) => {
          return (
            d.expression.type === AST_NODE_TYPES.CallExpression &&
            d.expression.callee.type === AST_NODE_TYPES.Identifier &&
            d.expression.callee.name === "ApiOperation"
          );
        });

        if (!isExistApiOperationDecorators) {
          context.report({ node, message });
        } else {
          const options: { shouldBeSummary: boolean; shouldBeDescription: boolean } = context.options[0] || {
            shouldBeSummary: true,
            shouldBeDescription: true,
          };
          const args = (isExistApiOperationDecorators.expression as TSESTree.CallExpression).arguments;
          args.forEach((v) => {
            if (v.type === AST_NODE_TYPES.ObjectExpression) {
              const objExpr = v;

              const summary = objExpr.properties.find((property: TSESTree.ObjectLiteralElementLike) => {
                if (property.type !== AST_NODE_TYPES.Property) {
                  return false;
                }
                return (property.key as TSESTree.Identifier).name === "summary";
              });
              if (!summary && options.shouldBeSummary) {
                context.report({ node, message: messageSummary });
              }

              const desc = objExpr.properties.find((property: TSESTree.ObjectLiteralElementLike) => {
                if (property.type !== AST_NODE_TYPES.Property) {
                  return false;
                }
                return (property.key as TSESTree.Identifier).name === "description";
              });
              if (!desc && options.shouldBeDescription) {
                context.report({ node, message: messageDescription });
              }
            }
          });
        }
      },
    };
  },
};
