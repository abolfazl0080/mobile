import Database from "@tauri-apps/plugin-sql";

async function createProduct(title, description, price) {
    const db = Database.load('sqlite:store.db')
    const result = (await db).execute(
        "INSERT INTO product(title, description, price) VALUES ($1, $2, $3)",
        [title, description, price]
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

async function updateProduct(id, title, description, price) {
      try {
        const db = await Database.load("sqlite:store.db");
        const result = await db.execute(
            "UPDATE product SET title=$2, description=$3, price=$4 WHERE id = $1",
            [id, title, description, price]
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