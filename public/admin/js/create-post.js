let createForm = document.querySelector('.create-post-form');
let title = document.querySelector('#title');
let country = document.querySelector('#country');
let imageURL = document.querySelector('#imageURL');
let text = document.querySelector('#text');
let imageFile = document.querySelector('#image-file');


createForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let createText = text.value;
    let createDescription
    if (createText.indexOf('.') === -1) {
        createDescription = createText;
    } else {
        createDescription = createText.substring(0, createText.indexOf('.') + 1); //提取字符串substring(开始位置，结束位置【不包含】)
    }

    let data = new FormData();
    data.append('title', title.value);
    data.append('country', country.value);
    data.append('imageURL', imageURL.value);
    data.append('text', createText);
    data.append('description', createDescription);
    data.append('imageFile', imageFile.files[0]);

    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: data
    }).then((response) => response.text()).then((data) => window.history.go());
})


function disableInput(input1, input2) {
    if (input1.value) {
        input2.disabled = true;
    } else {
        input2.disabled = false;
    }
}


imageURL.addEventListener('change', () => disableInput(imageURL, imageFile));
imageFile.addEventListener('change', () => disableInput(imageFile, imageURL));