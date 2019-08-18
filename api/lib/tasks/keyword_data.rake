namespace :keyword_data do
  desc 'Search keyword that has not been searched'
  task search: :environment do
    keywords_data = KeywordData.where(is_searched: false)
    keywords_data.each do |keyword|
      response_data = Google::Api.searchByGoogleApi(keyword[:keyword])
      total_results = Google::Api.getTotalResults(response_data)
      document = Google::Url.searchByGoogle(keyword[:keyword])
      div_block = Google::Url.xpathSearch(document, '//div')
      total_adwords = Google::Url.getTotalAdwords(div_block)
      total_links = Google::Url.getTotalLinks(div_block)

      keyword.assign_attributes(
        is_searched: true,
        total_adwords: total_adwords,
        total_links: total_links,
        total_results: total_results,
        html_code: document
      )
      keyword.save!
      sleep 5
    end
  end
end
