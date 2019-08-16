module ParamsIncludable
  extend ActiveSupport::Concern

  protected

  def include_params(root_model_class)
    root_params = (params[:include] || '').split(/\s*,\s*/).map do |association_chain|
      association_chain.split('.').map(&:underscore).join('.')
    end.join(',')

    return get_inclusion(root_model_class, params[:include]), root_params.to_s
  end

  def get_inclusion(root_model_class, include_chain)
    root_hash = ActiveSupport::HashWithIndifferentAccess.new
    (include_chain || '').split(/\s*,\s*/).each do |association_chain|
      association_chunks = association_chain.split('.')
      association_chunks.reduce(
        parent_hash: root_hash,
        parent_model_class: root_model_class
      ) do |chain, association_chunk|
        if chain
          chunk_snake_case = association_chunk.underscore
          association = chain[:parent_model_class].reflect_on_association chunk_snake_case
          next_chain = if chain[:parent_hash] && association
            next_hash = chain[:parent_hash][chunk_snake_case] ||= ActiveSupport::HashWithIndifferentAccess.new
            next_model_class = Object.const_get(association.class_name) rescue nil
            {
              parent_hash: next_hash,
              parent_model_class: next_model_class
            }.compact.presence
          end
          next_chain
        end
      end
    end

    root_hash.deep_symbolize_keys
  end

end
