
// Set the focus outline color here:
const outlineColor = '#eb4034';
// ---------------------------------

export function removeFocusOutlineUnlessKeypress(): void {
    const styleElement = document.createElement('style'),
        head = document.getElementsByTagName('head')[0],
        setCss = (cssText: string) => {
            (styleElement as any).styleSheet ?
                (styleElement as any).styleSheet.cssText = cssText :
                styleElement.innerHTML = cssText;
        };

    head.appendChild(styleElement);

    document.addEventListener('mousedown', function(){
        setCss(':focus{outline:0}');
    });

    document.addEventListener('keydown', function(e) {
        const whitelistNames = ['Esc', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Up', 'Down',
            'Left', 'Right', 'Control', 'Meta', 'Enter', ' ', 'Tab'];
        const whitelistCodes = [27, 38, 40, 37, 39, 17, 91, 93, 13, 32, 9];
        const keyCode = e.which || e.keyCode;

        if (whitelistCodes.includes(keyCode) || whitelistNames.includes(e.key)) {
            setCss(`
                :focus{outline: solid 4px ${outlineColor};}            
            `);
        }
    });
}
