ActiveModelSerializers.config.adapter = :json_api
ActiveModelSerializers.config.jsonapi_resource_type = :singular
ActiveModelSerializers.config.jsonapi_namespace_separator = '--'
ActiveModelSerializers.config.serializer_lookup_enabled = false
# https://github.com/rails-api/active_model_serializers/blob/v0.10.6/docs/howto/serialize_poro.md
ActiveModelSerializers::Model.derive_attributes_from_names_and_fix_accessors
ActiveModelSerializers.config.jsonapi_pagination_links_enabled = false
