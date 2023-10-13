const inputField = document.querySelector("#input-no--display")
const mainContainer = document.querySelector("main");
const fileContainer = document.querySelector("#render-json-file--container");
const TitleJsonFile = document.querySelector("#json-file-title");
const ContainerToRenderJSON = document.querySelector("#container-to-render");

const space = `<span class="space"></span>`;

let FileJson;
const onClickLoadJson = () =>
    inputField.click();

inputField.addEventListener("change", function (e) {
    FileJson = e.target.files[0];
    if (!FileJson) return;
    ReadFile(FileJson);
})


const ReadFile = (file) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(file);
}

const onReaderLoad = (event) => {
    let obj
    try {
        obj = JSON.parse(event.target.result);
    }
    catch (e) {
        alert("O JSON informado é inválido!");
        throw e;
    }
    onFileReaded(obj);
}

const onFileReaded = (obj) => {
    mainContainer.style.display = "none";
    fileContainer.style.display = "flex";
    TitleJsonFile.innerText = FileJson.name;
    const htmlString = PrepareJSON(obj);
    ContainerToRenderJSON.innerHTML = htmlString;
}



function PrepareJSON(obj, i = 0) {
    let htmlJSON;
    const VerifyObject = ($obj, $key) => {
        const type = typeof ($obj[$key]);
        let element;
        switch (type) {
            case "boolean":
            case "number":
            case "undefined":
                element = `<span class="${type}">${$obj[$key]}</span>`
                break;
            case "string":
                element = `<span class="${type}">"${$obj[$key]}"</span>`
                break;
            case "object":
                i++;
                element = !$obj[$key]?.length ?
                    `{<br>${PrepareJSON($obj[$key], i)}}`
                    :
                    `[<br>${PrepareJSON($obj[$key], i)}]`

                break;

        }
        return element;
    }
    let $spaces = "";
    for (let q = 0; q < i; q++){
        console.log(q)
        $spaces += space
    }

    console.log($spaces)
    Object.keys(obj).forEach(key => {
        htmlJSON +=
            `<div class="container--content">
            ${$spaces}
                <span class="key"> ${key} :</span>
                <span class="value"> 
                ${VerifyObject(obj, key)} 
                </span>
            </div>`;

    })
    return htmlJSON;
}