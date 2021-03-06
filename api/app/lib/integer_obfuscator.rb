# Obfuscator based on modular multiplicative inverse
# https://en.wikipedia.org/wiki/Modular_multiplicative_inverse

class IntegerObfuscator
  include Singleton

  def initialize
    # generated with:
    # openssl prime -generate -hex
    # not that much confidential
    # so we will simply commit it into source control
    @secret_prime = 0xfab3be7e7f
  end

  def encrypt(big_integer)
    # disabled until: https://github.com/rails-api/active_model_serializers/issues/2125
    # got resolved
    # # +2 to prevent multiplication inverse of 1
    # invmod(big_integer + 2, @secret_prime)
    big_integer
  end

  def decrypt(big_integer)
    # disabled until: https://github.com/rails-api/active_model_serializers/issues/2125
    # got resolved
    # invmod(big_integer, @secret_prime) - 2
    big_integer
  end

  class << self
    delegate :encrypt, :decrypt, to: :instance
  end

  private

  # taken from: ======== begin ========
  # https://rosettacode.org/wiki/Modular_inverse#Ruby

  # based on pseudo code from
  # http://en.wikipedia.org/wiki/Extended_Euclidean_algorithm#Iterative_method_2
  # and from translating the python implementation.
  def extended_gcd(a, b)
    last_remainder, remainder = a.abs, b.abs
    x, last_x, y, last_y = 0, 1, 1, 0
    while remainder != 0
      last_remainder, (quotient, remainder) = remainder, last_remainder.divmod(remainder)
      x, last_x = last_x - quotient*x, x
      y, last_y = last_y - quotient*y, y
    end

    return last_remainder, last_x * (a < 0 ? -1 : 1)
  end

  def invmod(e, et)
    g, x = extended_gcd(e, et)
    if g != 1
      raise 'The maths are broken!'
    end
    x % et
  end

  # taken from: ======== end ========
end
