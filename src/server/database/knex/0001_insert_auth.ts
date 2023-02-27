import { Knex } from "knex";

import { ETableNames } from "../../ETableNames";

export const seed = async (knex: Knex) => {

    const [{ count }] = await knex(ETableNames.auth).count<[{ count: number }]>('* as count');
    if (!Number.isInteger(count) || Number(count) > 0) return;



   


        
        const accessToken = [ "aaaabbbbcccc" ];

      const tok = accessToken.map( token => ({ accessToken: token }));

    await knex(ETableNames.auth).insert(tok);
    

};




