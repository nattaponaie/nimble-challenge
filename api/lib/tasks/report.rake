namespace :search_scheduler do
  desc 'Search keyword that has not been searched'
  task search: :environment do
    report_data = Report.where(is_searched: false)
    report_data.each do |report|
      keyword = Keyword.find(report[:keyword_id])
      response_data = Google::Api.searchByGoogleApi(keyword[:keyword_name])
      total_results = Google::Api.getTotalResults(response_data)
      document = Google::Url.searchByGoogle(keyword[:keyword_name])
      div_block = Google::Url.xpathSearch(document, '//div')
      total_adwords = Google::Url.getTotalAdwords(div_block)
      total_links = Google::Url.getTotalLinks(div_block)

      report.assign_attributes(
        is_searched: true,
        total_adwords: total_adwords,
        total_links: total_links,
        total_results: total_results,
        html_code: document
      )
      report.save!
      sleep 5
    end
  end
end
