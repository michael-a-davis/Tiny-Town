// -- This script generates the toolbox --//
for (i = 0; i < tools.length; i++) {
    const toolGroup = document.createElement('div');
    toolGroup.classList.add('tool-group');
    const toolButton = document.createElement('input');
    toolButton.classList.add('radio-buttons');
    toolButton.type = "radio";
    toolButton.name = "tool";
    toolButton.value = tools[i];
    
    if (i == 0) {
        toolButton.checked = true;
    }

    toolButton.addEventListener("click", function() {
        currentTool = toolButton.value;
        console.log(currentTool);
    })

    const toolLegend = document.createElement('legend');
    toolLegend.innerHTML = tools[i];
    toolGroup.append(toolButton, toolLegend);
    toolBox.append(toolGroup);
}