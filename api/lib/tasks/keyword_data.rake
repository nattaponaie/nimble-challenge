namespace :keyword_data do
  desc 'Search keyword that has not been searched'
  task search: :environment do
    keywords_data = KeywordData.where(is_searched: false)
    keywords_data.each do |keyword|
      keyword.process_search(keyword[:keyword])
      sleep 5
    end
  end
end
