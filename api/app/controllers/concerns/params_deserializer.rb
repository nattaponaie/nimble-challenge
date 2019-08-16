module ParamsDeserializer
  extend ActiveSupport::Concern

  protected

  def deserialized_params
    params_deserializer_private__deserialize
  end

  def normalized_query_params
    params_deserializer_private__normalize
  end

  private

  # historically there are team members
  # who call these private methods directly
  # so we decide to use naming to solve the issue
  # that's how we end up with very long names

  def params_deserializer_private__deserialize
    return @params_deserializer_private__deserialize if defined? @params_deserializer_private__deserialize
    @params_deserializer_private__deserialize = begin
      ActiveModelSerializers::Deserialization
        .jsonapi_parse(params)
        .map do |key, value|
        normalized_key = "#{ key }".underscore
        normalized_value = if /(?:\A|_)id\z/ =~ normalized_key
          IntegerObfuscator.decrypt(value.to_i)
        else
          value
        end
        [normalized_key.to_sym, normalized_value]
      end
        .to_h
        .with_indifferent_access
    end
  end

  def params_deserializer_private__normalize
    return @params_deserializer_private__normalize if defined? @params_deserializer_private__normalize
    @params_deserializer_private__normalize = params.transform_keys do |key|
      key.to_s.underscore
    end
  end
end
