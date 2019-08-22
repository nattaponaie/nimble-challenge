module UserUidAuthenticable
  extend ActiveSupport::Concern
  include ActionController::HttpAuthentication::Token
  include ErrorRendering

  protected

  def current_uid
    user_uid_authenticable_private__uid
  end

  def current_email
    user_uid_authenticable_private__email.presence
  end

  def authenticate_uid!
    user_uid_authenticable_private__render unless user_uid_authenticable_private__firebase_token
  end

  def current_user
    User.find_by(uid: current_uid)
  end

  private

  # historically there are team members
  # who call these private methods directly
  # so we decide to use naming to solve the issue
  # that's how we end up with very long names

  def user_uid_authenticable_private__uid
    if defined? @user_uid_authenticable_private__uid
      @user_uid_authenticable_private__uid
    else
      @user_uid_authenticable_private__uid = user_uid_authenticable_private__firebase_token.try(:first).try(:sub)
    end
  end

  def user_uid_authenticable_private__email
    if defined? @user_uid_authenticable_private__email
      @user_uid_authenticable_private__email
    else
      @user_uid_authenticable_private__email = user_uid_authenticable_private__firebase_token.try(:first).try(:email)
    end
  end

  def user_uid_authenticable_private__firebase_token
    if defined? @user_uid_authenticable_private__firebase_token
      @user_uid_authenticable_private__firebase_token
    else
      header_token = token_and_options(request).first rescue nil
      result = user_uid_authenticable_private__verify header_token
      # check for result validity
      sub = result.first.sub rescue nil

      # return value example
      # [#<OpenStruct
      #   iss = "https://securetoken.google.com/debunker-development",
      #   name = "Sanji",
      #   picture = "https://lh3.googleusercontent.com/-Y1_FYLQpPns/AAAAAAAAAAI/AAAAAAAAAZU/T_xT1bjE-xo/photo.jpg",
      #   aud = "debunker-development",
      #   auth_time = 1493484250,
      #   user_id = "8nFwD7AWKcUGXkb56j22bzkbj4ql",
      #   sub = "8nFwD7AWKcUGXkb56j22bzkbj4ql",
      #   iat = 1494164568,
      #   exp = 1494168168,
      #   email = "sanji@straw-hat-pirates.onion",
      #   email_verified = true,
      #   firebase = {
      #     "identities" => {
      #       "google.com" => ["677870163656820433066"],
      #       "email" => ["sanji@straw-hat-pirates.onion"]
      #     },
      #     "sign_in_provider" => "google.com"
      #   }>,
      #  #<OpenStruct
      #    alg = "RS256",
      #    kid = "da00f783ddbdaa7b93c9e49bbf7128fddd67cb50"
      #  >]
      # or nil if not success

      @user_uid_authenticable_private__firebase_token = sub ? result : nil
    end
  end

  def user_uid_authenticable_private__verify(header_token)
    return nil unless header_token
    if Rails.env.test? # for bearer mocking in test environment
      matched_uid_data = /testmock:uid:(.+):testmock:email:/.match(header_token) || []
      matched_email_data = /\s*:testmock:email:(.+)\s*\z/.match(header_token) || []
      return [OpenStruct.new(sub: matched_uid_data[1], email: matched_email_data[1]), OpenStruct.new]
    end
    result = FirebaseAdmin::Auth.verify_id_token(header_token) rescue nil
    return nil unless result

    # see what need to be validated beyond this point at
    # https://firebase.google.com/docs/auth/admin/verify-id-tokens
    aud = result.first.aud rescue nil
    return nil unless aud == ENV['FIREBASE_AUD']
    iss = result.first.iss rescue nil
    return nil unless iss == ENV['FIREBASE_ISS']
    sub = result.first.sub rescue nil
    return nil unless sub.is_a?(String) && !sub.empty?

    result
  end

  def user_uid_authenticable_private__render
    render_error_message(
      status: :unauthorized,
      code: :unauthorized,
      detail: 'Unauthorized'
    )
  end
end
