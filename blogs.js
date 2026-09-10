


// Global state keeper for active filters
let currentFilter = { type: 'all', value: '' };

// Renders the summary cards based on active filter criteria
function initializeFeed() {
    const feedContainer = document.getElementById('dynamic-feed-target');
    if (!feedContainer) return; // Guard clause if elements missing
    feedContainer.innerHTML = '';

    // Filter database array based on user selection
    const filteredPosts = blogDatabase.filter(post => {
        if (currentFilter.type === 'category') {
            return post.category === currentFilter.value;
        }
        if (currentFilter.type === 'tag') {
            return post.tags.includes(currentFilter.value);
        }
        return true; // 'all'
    });

    // Handle empty state gracefully
    if (filteredPosts.length === 0) {
        feedContainer.innerHTML = `
            <div style="color: var(--text-muted); font-family: var(--font-mono); padding: 40px; text-align: center; border: 1px dashed var(--border-color); border-radius: 8px;">
                SYSTEM_ERROR: No logs found matching query execution parameters.
                <br><br>
                <button class="back-btn" style="margin-bottom: 0; align-self: center;" onclick="setFilter('all')">[RESET_FILTER]</button>
            </div>`;
        return;
    }

    // Add clear filter label if active
    if (currentFilter.type !== 'all') {
        feedContainer.innerHTML += `
            <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-cyan); margin-bottom: 10px;">
                ACTIVE_FILTER: /${currentFilter.type}/${currentFilter.value} 
                <span style="color: var(--accent-purple); cursor: pointer; margin-left: 10px;" onclick="setFilter('all')">[CLEAR]</span>
            </div>
        `;
    }

    // Populate active feed cards
    filteredPosts.forEach((post) => {
        const realIndex = blogDatabase.findIndex(p => p.id === post.id);
        
        const cardHTML = `
            <article class="blog-card">
                <div class="blog-header">
                    <div class="blog-meta">POST_ID: ${post.id} // DATE: ${post.date}</div>
                    <div class="blog-meta" style="color: var(--text-muted);">READ_TIME: ${post.readTime}</div>
                </div>
                <div class="blog-body">
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <button class="read-more" onclick="loadArticleContent(${realIndex})">[EXECUTE_READ] &rarr;</button>
                </div>
            </article>
        `;
        feedContainer.innerHTML += cardHTML;
    });
}

// Router to handle category or tag selection updates
function setFilter(type, value = '') {
    currentFilter = { type, value };
    renderFeedState(); // Reset reading panel to main feed view if open
    initializeFeed();
}

// Action routing step: Isolates selection data and handles DOM adjustments
function loadArticleContent(index) {
    const selectedPost = blogDatabase[index];
    const articleContainer = document.getElementById('full-article-target');

    if (!articleContainer) return;

    articleContainer.innerHTML = `
        <div class="article-meta-row">
            <span>SYS_LOG_ID: ${selectedPost.id}</span>
            <span>//</span>
            <span>TIMESTAMP: ${selectedPost.date}</span>
            <span>//</span>
            <span>COMPUTE_COST: ${selectedPost.readTime}</span>
        </div>
        <h2 class="article-main-title">${selectedPost.title}</h2>
        <div class="article-content">
            ${selectedPost.content}
        </div>
    `;

    document.getElementById('feed-view').classList.remove('active-view');
    document.getElementById('article-view').classList.add('active-view');
    window.scrollTo(0, 0);
}

// Reverts view back to original logging state
function renderFeedState() {
    const articleView = document.getElementById('article-view');
    const feedView = document.getElementById('feed-view');
    if (articleView && feedView) {
        articleView.classList.remove('active-view');
        feedView.classList.add('active-view');
    }
}

// Initialize subsystem feed on execution load
document.addEventListener("DOMContentLoaded", initializeFeed);