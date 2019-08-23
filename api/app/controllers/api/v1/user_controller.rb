
class Api::V1::UserController < ApplicationController
  include UserUidAuthenticable
  include ParamsDeserializer

  def index
    user = User.find_by(uid: current_uid)
    render json: user,
      serializer: External::UserSerializer
  end

  def show
    render json: { data: 'show' }
  end

  def create
    user = User.find_or_initialize_by(
      uid: current_uid,
      email: current_email
    )
    if user.errors.present?
      render_error_resource user
    else
      user.save
    end
    render json: { status_msg: 'success' }
  end

  def created_params
    deserialized_params.slice(
      :uid,
      :email,
    )
  end

end
