AUTHOR := "Kevin Ewing"
DATE := $(shell date +"%B %d, %Y")

post:
	@read -p "Enter blog title: " title; \
	TITLE=$${TITLE:-$$title}; \
	DIR="$$TITLE"; \
	mkdir -p "$$DIR/resources"; \
	echo "{\n    \"title\": \"$$TITLE\",\n    \"author\": \"$(AUTHOR)\",\n    \"date\": \"$(DATE)\",\n    \"read_time\": \"\",\n    \"description\": \"\"\n}" > "$$DIR/metadata.json"; \
	echo "# $$TITLE" > "$$DIR/post.md"; \
	cp resources/placeholder.jpg "$$DIR/thumbnail.jpg"; \
	echo '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>'"$$TITLE"'</title>\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/11.1.0/marked.min.js"></script>\n    <link rel="stylesheet" href="../style.css">\n    <style>\n        .back-button {\n            position: absolute;\n            top: 20px;\n            left: 20px;\n            font-size: 16px;\n            padding: 10px 15px;\n            border-radius: 5px;\n            color: black;\n            text-decoration: none;\n            transition: background 0.3s;\n        }\n        .back-button:hover {\n            background: #f9f9f9;\n        }\n    </style>\n    <link rel="icon" type="image/png" href="../resources/favicon-96x96.png" sizes="96x96" />\n    <link rel="icon" type="image/svg+xml" href="../resources/favicon.svg" />\n    <link rel="shortcut icon" href="../resources/favicon.ico" />\n    <link rel="apple-touch-icon" sizes="180x180" href="../resources/apple-touch-icon.png" />\n    <link rel="manifest" href="../resources/site.webmanifest" />\n</head>\n<body>\n    <a href="#" class="back-button" onclick="goToParentDir(); return false;">&larr; Back</a>\n    <script>\n    function goToParentDir() {\n        let path = window.location.pathname;\n        let parentPath = path.endsWith("/") ? path.slice(0, -1) : path;\n        parentPath = parentPath.substring(0, parentPath.lastIndexOf("/")) || "/";\n        window.location.href = parentPath;\n    }\n    </script>\n    <div class="top-links">\n        <a href="https://www.linkedin.com/in/kevincewing/" target="_blank">LinkedIn</a>\n        <a href="mailto:kevin.c.ewing@outlook.net">Email</a>\n        <a href="https://www.linkedin.com/in/kevincewing/" target="_blank">GitHub</a>\n    </div>\n    <article id="content" class="markdown-body">Loading...</article>\n    <script>\n        fetch("post.md")\n            .then(response => response.text())\n            .then(text => {\n                document.getElementById("content").innerHTML = marked.parse(text);\n            })\n            .catch(error => {\n                document.getElementById("content").innerHTML = "<p>Error loading the markdown file.</p>";\n                console.error("Error fetching markdown:", error);\n            });\n    </script>\n    <div class="footer">&copy; Kevin Ewing <span id="year"></span></div>\n    <script>\n        document.getElementById("year").textContent = new Date().getFullYear();\n    </script>\n</body>\n</html>' > "$$DIR/index.html"; \
	sed -i '' 's/const directories = \[/const directories = \[\n            "'"$$TITLE"'",/' index.html; \
	echo "Blog post '$$TITLE' created at '$$DIR'"
