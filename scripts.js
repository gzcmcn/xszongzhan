// 小说数据
const novels = [
    {
        title: "星赐之石",
        cover: "images/novel1.jpg",
        description: "这是一部关于冒险与成长的小说，讲述了主角的奇幻旅程。",
        tags: ["冒险", "奇幻"],
        author: "桃芙",
        link: "https://xs1.yingtaofu.cn"
    },
    {
        title: "敬请期待",
        cover: "images/novel2.jpg",
        description: "这是一部浪漫的爱情小说，讲述了两位主角的甜蜜故事。",
        tags: ["爱情", "浪漫"],
        author: "作者2",
        link: "https://example.com/novel2"
    },
    // 添加更多小说数据...
];

// 分页设置
const novelsPerPage = 6;
let currentPage = 1;

// 动态加载小说卡片
function renderNovels(page) {
    const novelsContainer = document.getElementById("novels-container");
    novelsContainer.innerHTML = "";

    const start = (page - 1) * novelsPerPage;
    const end = start + novelsPerPage;
    const novelsToShow = novels.slice(start, end);

    novelsToShow.forEach(novel => {
        const novelCard = document.createElement("div");
        novelCard.className = "novel-card";

        novelCard.innerHTML = `
            <img src="${novel.cover}" alt="${novel.title}">
            <h3>${novel.title}</h3>
            <p>${novel.description}</p>
            <div class="tags">
                ${novel.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <p><strong>作者：</strong>${novel.author}</p>
            <a href="${novel.link}" target="_blank">阅读更多</a>
        `;

        novelsContainer.appendChild(novelCard);
    });

    renderPagination();
}

// 动态加载分页按钮
function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(novels.length / novelsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.addEventListener("click", () => {
            currentPage = i;
            renderNovels(currentPage);
        });
        pagination.appendChild(button);
    }
}

// 搜索功能
document.getElementById("search-button").addEventListener("click", () => {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const filteredNovels = novels.filter(novel => 
        novel.title.toLowerCase().includes(searchTerm) || 
        novel.description.toLowerCase().includes(searchTerm) ||
        novel.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        novel.author.toLowerCase().includes(searchTerm)
    );

    const novelsContainer = document.getElementById("novels-container");
    novelsContainer.innerHTML = "";

    filteredNovels.forEach(novel => {
        const novelCard = document.createElement("div");
        novelCard.className = "novel-card";

        novelCard.innerHTML = `
            <img src="${novel.cover}" alt="${novel.title}">
            <h3>${novel.title}</h3>
            <p>${novel.description}</p>
            <div class="tags">
                ${novel.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <p><strong>作者：</strong>${novel.author}</p>
            <a href="${novel.link}" target="_blank">阅读更多</a>
        `;

        novelsContainer.appendChild(novelCard);
    });
});

// 初始化加载
renderNovels(currentPage);
