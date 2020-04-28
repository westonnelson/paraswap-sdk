

const pools: { [pool: string]: any } = {
  Compound: {
    underlying: ['DAI', 'USDC'],
    coins: ['cDAI', 'cUSDC'],
    name: 'Compound',
  },
  USDT: {
    underlying: ['DAI', 'USDC', 'USDT'],
    coins: ['cDAI', 'cUSDC', 'USDT'],
    name: 'USDT'
  },
  iEarn: {
    underlying: ['DAI', 'USDC', 'USDT', 'TUSD'],
    coins: ['yDAI', 'yUSDC', 'yUSDT', 'yTUSD'],
    name: 'iEarn'
  },
  iEarnUSDB: {
    underlying: ['DAI', 'USDC', 'USDT', 'BUSD'],
    coins: ['yDAIv3', 'yUSDCv3', 'yUSDTv3', 'yBUSD'],
    name: 'iEarnUSDB'
  }
};

export class Curve {

  static getPool(srcToken: string, destToken: string) {
    const pool = Object.keys(pools).find(p => (
      (pools[p].underlying.includes(srcToken) && pools[p].underlying.includes(destToken)) ||
      (pools[p].coins.includes(srcToken) && pools[p].coins.includes(destToken))
    ));

    return pool && pools[pool];
  }

  static getSwapIndexes = (srcToken: string, destToken: string) => {
    const pool = Curve.getPool(srcToken, destToken);

    if (!pool) {
      return [-1, -1, -1];
    }

    const isUnderlyingSwap = pool.underlying.includes(srcToken) && pool.underlying.includes(destToken);

    const fromIndex = isUnderlyingSwap ? pool.underlying.indexOf(srcToken) : pool.coins.indexOf(srcToken);

    const toIndex = isUnderlyingSwap ? pool.underlying.indexOf(destToken) : pool.coins.indexOf(destToken);

    return [fromIndex, toIndex, isUnderlyingSwap];
  };

}