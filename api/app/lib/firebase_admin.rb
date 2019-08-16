# From:
# https://groups.google.com/forum/#!topic/firebase-talk/iefJWQ9LMQE
# https://gist.github.com/serradura/40a4f05f424262a94f44997681f02d26

#  Usage:
# ========
#   FirebaseAdmin::Auth.verify_id_token(your_id_token)
#
#   The method call follows the same API of the Node.js, JAVA and Python SDKs.
#   See https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_the_firebase_admin_sdk

#  Dependencies:
# ---------------
#   gem 'activesupport'
#   gem 'httparty', '~> 0.14.0'
#   gem 'jwt', '~> 1.5', '>= 1.5.6'

# require 'jwt'
# require 'httparty'
# require 'active_support/core_ext/module/delegation'
#
# require 'openssl'
# require 'singleton'
# require 'ostruct'
# require 'base64'

module FirebaseAdmin
  class PublicKeys
    URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'
    EXPIRES_HEADER = 'expires'

    attr_reader :response, :data

    delegate :keys, :values, to: :data

    def initialize
      @response = fetch
    end

    def valid?
      Time.now.utc < time_to_expire
    end

    def data
      @response.as_json
    end

    private

    def time_to_expire
      @time_to_expire ||= Time.parse(
        response.headers[EXPIRES_HEADER]
      )
    end

    def fetch
      HTTParty.get(URL)
    end
  end

  class IDTokenVerifier
    JWT_OPTIONS = { algorithm: 'RS256', verify_iat: true }

    attr_reader :certificates

    def initialize(public_keys)
      @public_keys = public_keys
      @certificates = map_certificates
    end

    def verify(id_token)
      result = nil
      header = /(\A.+?)\./.match(id_token)[1]
      kid = JSON.parse(Base64.decode64(header))["kid"]
      public_key = @certificates[kid]
      result = decode_jwt(id_token, public_key)
    end

    private

    def decode_jwt(id_token, x509)
      JWT.decode(id_token, x509.public_key, true, JWT_OPTIONS)
    rescue JWT::VerificationError
      nil
    end

    def map_certificates
      # See http://chrisholtz.com/blog/lets-make-a-ruby-hash-map-method-that-returns-a-hash-instead-of-an-array/
      # for the rationale behind optimization
      # Returns hash of public_keys with the kid as key
      Hash[@public_keys.response.as_json.map { |k, v| [k, OpenSSL::X509::Certificate.new(v)] }]
    end
  end

  class Auth
    include Singleton

    def initialize
      refresh
    end

    def public_keys
      resolve { @public_keys }
    end

    def verify_id_token(id_token)
      result = resolve { @id_token_verifier.verify(id_token) }
      if result
        payload, header = result
        [OpenStruct.new(payload), OpenStruct.new(header)]
      end
    end

    class << self
      delegate :verify_id_token, :public_keys, to: :instance
    end

    private

    def refresh
      @public_keys = PublicKeys.new
      @id_token_verifier = IDTokenVerifier.new(@public_keys)
    end

    def resolve
      refresh unless @public_keys.valid?

      yield
    end
  end
end
