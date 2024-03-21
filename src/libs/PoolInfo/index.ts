import axios from 'axios';
import {pool}   from '../../address';
import { Pool, PoolConfig} from "../../types";


/**
 * Retrieves pool information for a given coin symbol.
 * @param coinSymbol - The symbol of the coin.
 * @returns The pool information for the specified coin symbol, or all pool information if no coin symbol is provided.
 * @throws If there is an error fetching the pool information.
 */
export async function getPoolInfo(coinSymbol: string = "") {

    const pool_real: PoolConfig = pool[coinSymbol as keyof Pool];
    let poolId = pool_real.assetId;

    try {
        const response = await axios.get('https://api-defi.naviprotocol.io/getIndexAssetData');
        const poolInfo = response.data;
        if (poolId != -1) {
            return poolInfo[poolId];
        }
        return poolInfo;
    } catch (error) {
        console.error('Error fetching pool information:', error);
        throw error;
    }
}
