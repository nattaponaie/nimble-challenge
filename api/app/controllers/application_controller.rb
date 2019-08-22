class ApplicationController < ActionController::Base
  include ParamsIncludable
  include UserUidAuthenticable
  include ParamsDeserializer
  skip_before_action :verify_authenticity_token
end
