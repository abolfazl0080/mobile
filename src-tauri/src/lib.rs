use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Define database setup migrations
    let migrations = vec![Migration {
        version: 2,
        description: "create_initial_tables",
        sql: "CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT, 
            description TEXT,
            price REAL
            );",
        kind: MigrationKind::Up,
    },
        Migration{
            version: 3,
            description: "add image to product",
            sql: "ALTER TABLE product ADD COLUMN image TEXT;",
            kind: MigrationKind::Up,
        }
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:store.db", migrations)
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
