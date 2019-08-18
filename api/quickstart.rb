require 'rufus-scheduler'

scheduler = Rufus::Scheduler.new

scheduler.every '1m' do
  p 'Start search keyword that has not been searched'
  system('rake keyword_data:search')
  p 'Done search keyword that has not been searched'
end

scheduler.join
