class ApiError::BaseError < StandardError
  # attributes has been selected from
  # https://github.com/holidayextras/jsonapi-server/blob/master/documentation/handlers.md
  attr_reader :status
  attr_reader :code
  attr_reader :title
  attr_reader :detail

  # conform to rack status codes
  # https://github.com/rack/rack/blob/a0557f7/lib/rack/utils.rb
  # if there are something reusable (eg. :not_found)
  # we should conform to the exist implementation
  # https://gist.github.com/mlanett/a31c340b132ddefa9cca
  ERROR_CODES = {
    unauthorized: 'E_UNAUTHORIZED',
    unknown: 'E_UNKNOWN',
    message: 'E_MESSAGE',
    not_found: 'E_NOT_FOUND'
  }

  def initialize(options = {})
    self.status = options[:status] || Rack::Utils::SYMBOL_TO_STATUS_CODE[:not_implemented]
    self.code = options[:code] || ERROR_CODES[:unknown]
    self.title = options[:title] || 'unknown error'
    self.detail = options[:detail] || 'some mysterious error occurred'
  end

  def to_h(*_args)
    {
      status: self.status.to_s,
      code: self.code,
      title: self.title,
      detail: self.detail
    }
  end

  def as_json(*args)
    self.to_h(*args)
  end

  protected
  attr_writer :status
  attr_writer :code
  attr_writer :title
  attr_writer :detail
end
