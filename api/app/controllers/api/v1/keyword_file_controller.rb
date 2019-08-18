
class Api::V1::KeywordFileController < ApplicationController
  include UserUidAuthenticable
  include ParamsDeserializer
  before_action :authenticate_uid!, only: [:create]

  def index
    keywords = KeywordData.all.order(id: :asc)
    render json: keywords,
      each_serializer: External::KeywordFileSerializer
  end

  def show
    render json: { data: 'show' }
  end

  def create
    keywords_data = created_params[:keywords_data]
    keywords_data.each do |data|
      keyword_result = KeywordData.find_or_initialize_by(
        keyword: data
      )
      if keyword_result.errors.present?
        render_error_resource keyword_result
      else
        keyword_result.save
      end
    end
    render json: { statusMsg: 'success' }
  end

  def created_params
    deserialized_params.slice(
      :keywords_data,
    )
  end

end
