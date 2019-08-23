
class Api::V1::KeywordController < ApplicationController
  before_action :authenticate_uid!, only: [:index, :create]

  def index
    inclusion = include_params(Keyword)
    keywords = Keyword.find_by_user(current_user)
    render json: keywords,
      each_serializer: External::KeywordSerializer,
      include: inclusion
  end

  def show
    render json: { data: 'show' }
  end

  def create
    keywords_data = created_params[:keywords_data]
    keywords_data.each do |data|
      keyword_result = Keyword.find_or_initialize_by(
        keyword_name: data,
        user: current_user
      )
      keyword_result.initialize_report()
      
      if keyword_result.errors.present?
        render_error_resource keyword_result
      else
        keyword_result.save
      end
    end
    render json: { status_msg: 'success' }
  end

  def created_params
    deserialized_params.slice(
      :keywords_data,
    )
  end

end
