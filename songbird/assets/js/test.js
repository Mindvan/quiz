function once(selector, event) {
    console.log('watinig');
    return new Promise( res => document.querySelector(selector).addEventListener(event, res));
}

function setText (selector, text) {
    console.log('button');
    return document.querySelector(selector).textContent = text;
}

(async function(){
    setText("#btn", "click me");
    await once("#btn", "click");
    setText("#btn", "again please");
    await once("#btn", "click");
    setText("#btn", "done!");
})();
