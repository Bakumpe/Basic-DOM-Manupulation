function fontStyleChange(){
    const fontSizeSelect = document.getElementById('fontSizeChange');
    const fontFamilySelect = document.getElementById('fontFamilyChange');
    const fontColorSelect = document.getElementById('fontColorChange');
    const textBlock = document.getElementById('textBlock');

    function updateTextStyle(){
        textBlock.style.fontSize = fontSizeSelect.value; 
        textBlock.style.color = fontColorSelect.value; 
        textBlock.style.fontFamily = fontFamilySelect.value;
    }

    fontSizeSelect.addEventListener('change', updateTextStyle); 
    fontColorSelect.addEventListener('change', updateTextStyle); 
    fontFamilySelect.addEventListener('change', updateTextStyle);
    
    updateTextStyle();

}
fontStyleChange();

