const pool = require('../../databasePool');

class AccountDragonTable {
  static storeAccountDragon({ accountId, dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO accountDragon("accountId", "dragonId")
          VALUES($1, $2)`,
        [accountId, dragonId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          //const traitId = response.rows[0].id;
          resolve();
        }
      )
    });
  }

  static getAccountDragons({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT "dragonId" FROM accountDragon WHERE "accountId" = $1`,
        [accountId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve({ accountDragons: response.rows })
        }
      )
    })
  }

  static getDragonAccount({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT "accountId" FROM accountDragon WHERE "dragodId" = $1`,
        [dragonId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve({ accountId: response.rows[0].accountId });
        })
    })
  }

  static updateDragonAccount({ accountId, dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE accountDragon SET "accountId = $1 WHERE "dragonId" = $2`,
        [accountId, dragonId],
        (error, response) => {
          if (error) {
            return reject(error);
          }

          resolve();
        })
    })
  }

}


module.exports = AccountDragonTable;
