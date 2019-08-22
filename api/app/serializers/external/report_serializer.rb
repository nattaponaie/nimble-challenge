class External::ReportSerializer < ApplicationSerializer
  type 'report'
  include External::CommonSerializer

  attributes :total_adwords,
    :total_links,
    :total_results,
    :is_searched

  belongs_to :keyword, type: :keyword, serializer: External::KeywordSerializer
end
