class External::KeywordSerializer < ApplicationSerializer
  type 'keyword'
  include External::CommonSerializer

  attributes :keyword_name,
    :user_id

  belongs_to :user, type: :user, serializer: External::UserSerializer
  has_one :report, type: :report, serializer: External::ReportSerializer
end
