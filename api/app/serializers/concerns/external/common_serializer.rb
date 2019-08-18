module External::CommonSerializer
  extend ActiveSupport::Concern

  included do
    attributes :id,
      :created_at,
      :updated_at

    def id
      original_id = object.id
      IntegerObfuscator.encrypt(original_id.to_i)
    end
  end
end
