class Api::V1::UploadFileController < ApplicationController
  def index
    render json: { path: 'index' }
  end
  def show
    render json: { path: 'show' }
  end
end
