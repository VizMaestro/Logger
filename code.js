
figma.showUI(__html__, { width: 350, height: 440});

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'annotate-page') {
    const pageName = figma.currentPage.name;
    let changeLogPage = figma.root.children.find(page => page.name === 'Change log');
    if (!changeLogPage) {
      changeLogPage = figma.createPage();
      changeLogPage.name = 'Change log';
    }

    //figma.currentPage = changeLogPage;

    let textNode = changeLogPage.children.find(node => node.type === 'TEXT' && node.name === pageName);
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    if (!textNode) {
      textNode = figma.createText();
      textNode.name = pageName;
      textNode.characters = ''; // Set after font is loaded
      changeLogPage.appendChild(textNode);
    }

    const timestamp = new Date().toLocaleString();
    const logEntry = `${timestamp} - ${msg.requestedBy}\n${msg.description}\n\n`;
    textNode.characters += logEntry;
  }

  if (msg.type === 'annotate-frame') {
    const frame = figma.getNodeById(msg.frameId);

    if (frame && frame.type === 'FRAME') {
      const timestamp = new Date().toLocaleString();
      const newText = `${timestamp} - ${msg.requestedBy}\n${msg.description}`;

      // Load the correct font
      figma.loadFontAsync({ family: 'Inter', style: 'Regular' }).then(() => {
        // Look for existing hidden annotation inside frame
        let annotationText = frame.findOne(function (node) {
          return node.type === 'TEXT' && node.name === 'Frame log';
        });

        if (annotationText) {
          annotationText.characters += `\n\n${newText}`;
        } else {
          const text = figma.createText();
          text.name = 'Frame log';
          text.characters = newText;
          text.visible = false; // hidden from UI and exports

          // Place it at the top-left inside the frame
          text.x = 0;
          text.y = 0;

          frame.appendChild(text); // attach to the frame
        }
      });
    }
  }

  if (msg.type === 'get-frames') {
    const topLevelFrames = figma.currentPage.children.filter(n => n.type === 'FRAME');
    const selected = figma.currentPage.selection.find(n => n.type === 'FRAME');
    const frameOptions = topLevelFrames.map(frame => ({ id: frame.id, name: frame.name }));
    figma.ui.postMessage({
      type: 'frame-options',
      frameOptions,
      selectedFrameId: selected ? selected.id : null
    });
  }
};

// Listen for selection changes and send the updated selected frame to the UI
figma.on('selectionchange', () => {
  const selected = figma.currentPage.selection.find(n => n.type === 'FRAME');
  figma.ui.postMessage({
    type: 'selection-changed',
    selectedFrameId: selected ? selected.id : null
  });
});