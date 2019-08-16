module ErrorRendering
  extend ActiveSupport::Concern

  protected

  def render_error_message(options = {})
    status_code = options.fetch(:status, :unprocessable_entity)
    error_code = ApiError::BaseError::ERROR_CODES[options[:code]]
    title = options.fetch(:title, "Unknown")
    detail = options.fetch(:detail, "Resource not found")
    render json: { errors: [ApiError::MessageError
      .new(options.merge(
        status: status_code,
        code: error_code,
        title: title,
        detail: detail
      ))
      .as_json] },
      status: status_code
  end

  def render_error_resource(resource)
    render json: resource,
      status: :unprocessable_entity,
      adapter: :json_api,
      serializer: ActiveModel::Serializer::ErrorSerializer
  end
end
