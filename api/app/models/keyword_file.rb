class KeywordFile < ActiveRecord::Base
  def process_keywords(keywords)
    puts 'yey'
    puts keywords
    # self.find_or_initialize_by(
    #   file_name: params_option[:document_type],
    #   motor_policy_bundle_id: bundle_id
    # )
  end
end