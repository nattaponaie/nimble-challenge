class ApiError::MessageError < ApiError::BaseError
  def initialize(options = {})
    modified_options = {
      status: Rack::Utils::SYMBOL_TO_STATUS_CODE[:unprocessable_entity],
      code: ApiError::BaseError::ERROR_CODES[:message],
      title: 'Error Message',
      detail: options[:message]
    }.merge(options)
    super(modified_options)
  end
end
