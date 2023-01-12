const NodeEnvironment = require("jest-environment-node").TestEnvironment;
const { v4: uuid } = require("uuid");
const { execSync } = require("child_process");
const { resolve } = require("path");
const mysql = require('mysql2')

require("dotenv").config({
  path: resolve(__dirname, "..", ".env.test"),
});

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.schema = `code_schema_${uuid()}`;
    console.log('schema', this.schema)
    this.connectionString = `${process.env.DATABASE_URL}${this.schema}`;
  }

  setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    // Rodar as migrations
    execSync(`npx prisma migrate deploy`, { stdio: 'inherit' });
  }

  async teardown() {
    const conn = mysql.createConnection({
      user: 'root',
      database: 'api_rpg_test',
      password: '',
      host: 'localhost',
      port: 3306
    })

    conn.query(
        `DROP SCHEMA IF EXISTS api_rpg_test`
    )
    
    conn.end()
  }

}

module.exports = CustomEnvironment;