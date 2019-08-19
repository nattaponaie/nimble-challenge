class KeywordData < ApplicationRecord
  self.table_name = 'keyword_data'

  def process_search(keyword)
    response_data = Google::Api.searchByGoogleApi(keyword)
    total_results = Google::Api.getTotalResults(response_data)
    document = Google::Url.searchByGoogle(keyword)
    div_block = Google::Url.xpathSearch(document, '//div')
    total_adwords = Google::Url.getTotalAdwords(div_block)
    total_links = Google::Url.getTotalLinks(div_block)

    assign_attributes(
      is_searched: true,
      total_adwords: total_adwords,
      total_links: total_links,
      total_results: total_results,
      html_code: document
    )
    save!
  end
end
