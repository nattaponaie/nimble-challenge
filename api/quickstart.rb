require 'rufus-scheduler'

scheduler = Rufus::Scheduler.new

scheduler.every '1m' do
  p 'Start search keyword that has not been searched'
  system('rake search_scheduler:search')
  p 'Done search keyword that has not been searched'
end

scheduler.join
