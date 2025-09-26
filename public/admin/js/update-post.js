{
    let articlesBlock = document.querySelector('.articles-list');
    let updateBtn = document.querySelector('#v-pills-update-post-tab');
    let updateForm = document.querySelector('.update-post-form');
    let titleInput = document.querySelector('#update-title');
    let textArea = document.querySelector('#update-text');

    let id;

    articlesBlock.addEventListener('click', async function (e) {
        if (e.target.classList.contains('edit-btn')) {
            id = e.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo = await fetch('http://localhost:3000/posts/' + id)
                .then((response) => response.json())
                .then((data) => data)
            titleInput.value = postInfo.title;
            textArea.value = postInfo.text;
            updateBtn.click();
        }
    })

    updateForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let updateDescription;
        if (textArea.value.indexOf('.') === -1) {
            updateDescription = textArea.value;
        } else {
            updateDescription = textArea.value.substring(0, textArea.value.indexOf('.') + 1); //提取字符串substring(开始位置，结束位置【不包含】)
        }

        fetch('http://localhost:3000/posts/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInput.value,
                text: textArea.value,
                description: updateDescription
            })
        }).then((resp) => resp.text()).then(() => window.history.go());
    })
}