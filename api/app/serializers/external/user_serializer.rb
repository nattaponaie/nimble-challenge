class External::UserSerializer < ApplicationSerializer
  type 'user'
  include External::CommonSerializer

  attributes :uid,
    :email

  has_many :keyword, type: :keyword, serializer: External::KeywordSerializer
end
