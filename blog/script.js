// ========================================
// MICROBLOG JAVASCRIPT
// ========================================


// Get HTML elements

const blogForm = document.getElementById("blogForm");

const blogContainer =
    document.getElementById("blogContainer");

const emptyMessage =
    document.getElementById("emptyMessage");

const totalBlogs =
    document.getElementById("totalBlogs");

const totalLikes =
    document.getElementById("totalLikes");


// Get saved blogs from LocalStorage

let blogs =
    JSON.parse(localStorage.getItem("microBlogs")) || [];


// ========================================
// DISPLAY BLOGS
// ========================================

function displayBlogs(blogList = blogs) {

    blogContainer.innerHTML = "";


    // Check whether blogs exist

    if (blogList.length === 0) {

        emptyMessage.style.display = "block";

        return;

    } else {

        emptyMessage.style.display = "none";

    }


    // Display every blog

    blogList.forEach(function(blog) {

        const blogCard =
            document.createElement("div");

        blogCard.className = "blog-card";


        blogCard.innerHTML = `

            <span class="blog-category">
                ${blog.category}
            </span>

            <h3>
                ${escapeHTML(blog.title)}
            </h3>

            <p class="blog-content">
                ${escapeHTML(blog.content)}
            </p>

            <div class="blog-author">

                <div class="author-avatar">
                    ${getInitial(blog.author)}
                </div>

                <div class="author-info">

                    <strong>
                        ${escapeHTML(blog.author)}
                    </strong>

                    <small>
                        ${blog.date}
                    </small>

                </div>

            </div>

            <div class="blog-actions">

                <button
                    class="like-btn"
                    onclick="likeBlog(${blog.id})"
                >
                    ❤️ ${blog.likes}
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteBlog(${blog.id})"
                >
                    🗑 Delete
                </button>

            </div>

        `;


        blogContainer.appendChild(blogCard);

    });


    updateStatistics();

}


// ========================================
// CREATE BLOG
// ========================================

blogForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // Get form values

        const author =
            document.getElementById("author").value.trim();

        const title =
            document.getElementById("title").value.trim();

        const category =
            document.getElementById("category").value;

        const content =
            document.getElementById("content").value.trim();


        // Validate input

        if (
            author === "" ||
            title === "" ||
            content === ""
        ) {

            alert("Please fill all required fields.");

            return;

        }


        // Create new blog object

        const newBlog = {

            id: Date.now(),

            author: author,

            title: title,

            category: category,

            content: content,

            likes: 0,

            date: getCurrentDate()

        };


        // Add blog to array

        blogs.unshift(newBlog);


        // Save blogs

        saveBlogs();


        // Display blogs

        displayBlogs();


        // Reset form

        blogForm.reset();


        // Show success message

        alert("Blog published successfully! 🎉");


        // Scroll to blog section

        scrollToBlogs();

    }
);


// ========================================
// LIKE BLOG
// ========================================

function likeBlog(id) {

    const blog =
        blogs.find(function(item) {

            return item.id === id;

        });


    if (blog) {

        blog.likes++;

        saveBlogs();

        displayBlogs();

    }

}


// ========================================
// DELETE BLOG
// ========================================

function deleteBlog(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmation) {

        return;

    }


    blogs =
        blogs.filter(function(blog) {

            return blog.id !== id;

        });


    saveBlogs();

    displayBlogs();

}


// ========================================
// SEARCH BLOGS
// ========================================

function searchBlogs() {

    const searchValue =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    const filteredBlogs =
        blogs.filter(function(blog) {

            return (

                blog.title
                    .toLowerCase()
                    .includes(searchValue)

                ||

                blog.author
                    .toLowerCase()
                    .includes(searchValue)

                ||

                blog.category
                    .toLowerCase()
                    .includes(searchValue)

                ||

                blog.content
                    .toLowerCase()
                    .includes(searchValue)

            );

        });


    displayBlogs(filteredBlogs);

}


// ========================================
// SAVE BLOGS TO LOCAL STORAGE
// ========================================

function saveBlogs() {

    localStorage.setItem(
        "microBlogs",
        JSON.stringify(blogs)
    );

}


// ========================================
// UPDATE STATISTICS
// ========================================

function updateStatistics() {

    totalBlogs.textContent =
        blogs.length;


    let likes = 0;


    blogs.forEach(function(blog) {

        likes += blog.likes;

    });


    totalLikes.textContent = likes;

}


// ========================================
// GET CURRENT DATE
// ========================================

function getCurrentDate() {

    const date = new Date();


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",

            month: "short",

            year: "numeric"
        }
    );

}


// ========================================
// GET FIRST LETTER
// ========================================

function getInitial(name) {

    if (!name) {

        return "U";

    }


    return name
        .charAt(0)
        .toUpperCase();

}


// ========================================
// HTML SECURITY FUNCTION
// ========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// ========================================
// SCROLL TO CREATE
// ========================================

function scrollToCreate() {

    document
        .getElementById("create")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ========================================
// SCROLL TO BLOGS
// ========================================

function scrollToBlogs() {

    document
        .getElementById("blogs")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ========================================
// LOAD BLOGS WHEN PAGE OPENS
// ========================================

displayBlogs();

updateStatistics();