import Database from "@tauri-apps/plugin-sql";

async function createProduct(title, description, price, image) {
    const db = Database.load('sqlite:store.db')
    const result = (await db).execute(
        "INSERT INTO product(title, description, price, image) VALUES ($1, $2, $3, $4)",
        [title, description, price, image]
    )
    return result
}

async function getAllProducts() {
      try {
        const db = await Database.load("sqlite:store.db");
        const data = await db.select("SELECT * FROM product");
        return data
      } catch (error) {
        console.error("Failed to load database:", error);
      }
}

async function getOneProduct(id) {
      try {
        const db = await Database.load("sqlite:store.db");
        const data = await db.select("SELECT * FROM product WHERE id = $1", [id]);
        return data
      } catch (error) {
        console.error("Failed to load database:", error);
      }
}

async function updateProduct(id, title, description, price, image) {
      try {
        const db = await Database.load("sqlite:store.db");
        const result = await db.execute(
            "UPDATE product SET title=$1, description=$2, price=$3, image=$4 WHERE id = $5",
            [title, description, price, image, id]
        );
        return result
      } catch (error) {
        console.error("Failed to update database:", error);
      }
}
async function deleteProduct(id) {
      try {
        const db = await Database.load("sqlite:store.db");
        const result = await db.execute(
            "DELETE FROM product WHERE id = $1",
            [id]
        );
        return result
      } catch (error) {
        console.error("Failed to delete database:", error);
      }
}

export {
    createProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct
}