const fs = require("fs");
const path = require("path");
function productRouting(method, url, request, response) {
  response.setHeader("Content-type", "text/html");

  switch (true) {
    case url === "/product/add" && method === "GET":
      renderAddProductPage(response);
      break;
    case url === "/product/add" && method === "POST":
      addNewProduct(request, response);
      break;
    case url === "/product/new":
      renderNewestProductPage(response);
      break;
    default:
      console.log(`ERROR: url ${url} doesnt exist`);
      response.statusCode = 404;
      response.end("404 PAGE NOT FOUND");
      break;
  }
}
function renderAddProductPage(response) {
  const html = `<!DOCTYPE html>
<html>
<head>
    <title>Shop – Add product</title>
</head>
<body>
    <h1>Add product</h1>
    <form method="POST" action="/product/add">
        <label>Name: <input type="text" name="name" required></label><br>
        <label>Description: <textarea name="description" required></textarea></label><br>
        <button type="submit">Add Product</button>
    </form>
    <nav>
        <a href="/">Home</a>
        <a href="/product/new">Newest product</a>
        <a href="/logout">Logout</a>
    </nav>
</body>
</html>
    `;
  response.end(html);
}
function renderNewestProductPage(response) {
  const productFilePath = path.join(__dirname, "..", "product.txt");
  fs.readFile(productFilePath, "utf8", (err, data) => {
    let content = "Theres no new products";
    if (!err && data) {
      const [name, description] = data.split("|");
      content = `<h2> Product Name: ${name}</h2>
            <p>Description: ${description}</p>
            `;
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Shop – Newest product</title>
</head>
<body>
    <h1>Newest product</h1>
    ${content}
    <nav>
        <a href="/">Home</a>
        <a href="/product/add">Add product</a>
        <a href="/logout">Logout</a>
    </nav>
</body>
</html>
        `;

    response.setHeader("Content-Type", "text/html");
    response.end(htmlContent);
  });
}
function addNewProduct(request, response) {
  let body = "";

  request.on("data", (chunk) => {
    body += chunk.toString();
  });

  request.on("end", () => {
    const productData = new URLSearchParams(body);
    const name = productData.get("name");
    const description = productData.get("description");

    const productFilePath = path.join(__dirname, "..", "product.txt");

    fs.writeFile(productFilePath, `${name} | ${description}`, (err) => {
      if (err) {
        console.error("Error saving product", err);
        response.statusCode = 500;
        response.end("Error saving product");
        return;
      }

      response.statusCode = 302;
      response.setHeader("Location", "/product/new");
      response.end();
    });
  });
}

module.exports = {
  renderNewestProductPage,
  addNewProduct,
};
