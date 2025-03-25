function homeRouting(method, response) {
  response.setHeader("content-Type", "text/html");

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>Shop – Home</title>
</head>
<body>
    <h1>Home</h1>
    <nav>
        <a href="/product/add">Add product</a>
        <a href="/product/new">Newest product</a>
        <a href="/logout">Logout</a>
    </nav>
</body>
</html>
    `;
  response.end(htmlContent);
}

module.exports = {
  homeRouting,
};
