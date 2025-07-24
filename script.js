// const themeToggleBtn = document.querySelector('.theme-toggle');
// const themeIcon = themeToggleBtn.querySelector('i');

// themeToggleBtn.addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');
//     if (document.body.classList.contains('dark-mode')) {
//         themeIcon.classList.remove('fa-moon');
//         themeIcon.classList.add('fa-sun');
//     } else {
//         themeIcon.classList.remove('fa-sun');
//         themeIcon.classList.add('fa-moon');
//     }
// });
// script.js to make your AI Image Generator fully working
// using placeholder images for now, ready to integrate with OpenAI, HuggingFace or Stability API later

const promptForm = document.querySelector(".prompt-form");
const promptInput = document.getElementById("prompt-input");
const modelSelect = document.getElementById("model-select");
const imageQuantity = document.getElementById("image-quantity");
const pageType = document.getElementById("page-type");
const imageGallery = document.querySelector(".image-gallery");
const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

promptForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const prompt = promptInput.value.trim();
    const model = modelSelect.value;
    const quantity = parseInt(imageQuantity.value);
    const type = pageType.value;

    if (!prompt || !model || !quantity || !type) {
        alert("Please fill all fields before generating images.");
        return;
    }

    imageGallery.innerHTML = ""; // Clear previous images

    for (let i = 0; i < quantity; i++) {
        const combinedPrompt = `${prompt} ${model} ${type}`;
        const imgUrl = `https://loremflickr.com/800/800/${encodeURIComponent(prompt)}?random=${Math.random()}`;

        const imageCard = document.createElement("div");
        imageCard.classList.add("image-card");

        const img = document.createElement("img");
        img.src = imgUrl;
        img.alt = prompt;

        img.onload = () => {
            console.log(`Image ${i + 1} loaded.`);
        };
        img.onerror = () => {
            console.log(`Image ${i + 1} failed to load.`);
        };

        const downloadBtn = document.createElement("button");
        downloadBtn.classList.add("download-btn");
        downloadBtn.innerHTML = `<i class="fa-solid fa-download"></i>`;
        downloadBtn.addEventListener("click", () => {
            const a = document.createElement("a");
            a.href = img.src;
            a.download = `${prompt}-${i + 1}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });

        imageCard.appendChild(img);
        imageCard.appendChild(downloadBtn);
        imageGallery.appendChild(imageCard);
    }

    promptInput.value = "";
    modelSelect.value = "";
    imageQuantity.value = "";
    pageType.value = "";
});
