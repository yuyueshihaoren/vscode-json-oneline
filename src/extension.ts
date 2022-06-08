"use strict";
import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.convertToOneLine",
    function () {
      // Get the active text editor
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        if (document.languageId != "json") {
          vscode.window.showWarningMessage("Not a JSON file");
          return;
        }
        const selection = editor.selection;

        const selectedText = document.getText(selection);
        try {
          const textJson = JSON.parse(selectedText);
          const textJsonOneline = JSON.stringify(textJson);
          editor.edit((editBuilder) => {
            editBuilder.replace(selection, textJsonOneline);
          });
        } catch (e: unknown) {
          if (typeof e === "string") {
            vscode.window.showWarningMessage(e);
          } else if (e instanceof Error) {
            vscode.window.showWarningMessage(e.message);
          }

          return;
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}
