const tags = document.querySelectorAll('a');
const links = [...tags].map(item => item.href);

[...tags].forEach((tag) => {
    // tag.innerHTML = tag.href;
});
