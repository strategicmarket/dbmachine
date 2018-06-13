const bcrypt = require('bcrypt');

const NUM_SALT_ROUNDS = 8;

test();

async function test() {
  const pws = ['password', 'password1', 'passw0rd'];

  // `promises` is an array of promises, because `bcrypt.hash()` returns a
  // promise if no callback is supplied.
  const promises = pws.map(pw => bcrypt.hash(pw, NUM_SALT_ROUNDS));

  /**
   * Prints hashed passwords, for example:
   * [ '$2a$08$nUmCaLsQ9rUaGHIiQgFpAOkE2QPrn1Pyx02s4s8HC2zlh7E.o9wxC',
   *   '$2a$08$wdktZmCtsGrorU1mFWvJIOx3A0fbT7yJktRsRfNXa9HLGHOZ8GRjS',
   *   '$2a$08$VCdMy8NSwC8r9ip8eKI1QuBd9wSxPnZoZBw8b1QskK77tL2gxrUk.' ]
   */
  console.log(await Promise.all(promises));
}
