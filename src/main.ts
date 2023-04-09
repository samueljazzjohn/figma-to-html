import JSZip from 'jszip';
const { getNodeFrame, getNodeHtml, getNodeCss } = require('@figma/plugin-utils');
const { browser } = require('webextension-polyfill-ts');

async function exportFrame() {
  const selection = figma.currentPage.selection;
  if (selection.length !== 1) {
    figma.notify('Please select a single Frame to export');
    return;
  }

  const frame = getNodeFrame(selection[0]);
  const html = getNodeHtml(frame);
  const css = getNodeCss(frame);

  const zipFile = new JSZip();
  zipFile.file('index.html', html);
  zipFile.file('style.css', css);

  const content = await zipFile.generateAsync({ type: 'blob' });

  const options = {
    type: 'saveFile',
    suggestedName: `${frame.name}.zip`,
    blob: content,
  };
  await browser.runtime.sendMessage(options);

  figma.notify('Frame exported successfully');
}

figma.showUI(__html__);
figma.ui.onmessage = (msg) => {
  if (msg.type === 'exportFrame') {
    exportFrame();
  }
};


// const JSZip = require('jszip');
// const { getNodeFrame, getNodeHtml, getNodeCss } = require('@figma/plugin-utils');
// const { browser } = require('webextension-polyfill-ts');

// async function exportFrame() {
//   const selection = figma.currentPage.selection;
//   if (selection.length !== 1) {
//     figma.notify('Please select a single Frame to export');
//     return;
//   }

//   const frame = getNodeFrame(selection[0]);
//   const html = getNodeHtml(frame);
//   const css = getNodeCss(frame);

//   const zipFile = new JSZip();
//   zipFile.file('index.html', html);
//   zipFile.file('style.css', css);

//   const content = await zipFile.generateAsync({ type: 'blob' });

//   const options = {
//     type: 'saveFile',
//     suggestedName: `${frame.name}.zip`,
//     blob: content,
//   };
//   await browser.runtime.sendMessage(options);

//   figma.notify('Frame exported successfully');
// }

// figma.showUI(__html__);
// figma.ui.onmessage = (msg) => {
//   if (msg.type === 'exportFrame') {
//     exportFrame();
//   }
// };
