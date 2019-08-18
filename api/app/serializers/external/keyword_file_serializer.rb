class External::KeywordFileSerializer < ApplicationSerializer
  type 'keyword_file'
  include External::CommonSerializer

  attributes :keyword,
    :total_adwords,
    :total_links,
    :total_results,
    :is_searched
end
