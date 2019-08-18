require 'nokogiri'
require 'open-uri'

module Google

  class Api
    include Singleton

    class << self
      delegate :searchByGoogleApi, :getTotalResults, to: :instance
    end

    def searchByGoogleApi(query)
      begin
        response = HTTParty.get("https://www.googleapis.com/customsearch/v1?key=#{ENV['GOOGLE_API_KEY']}&cx=#{ENV['GOOGLE_CX']}&q=#{query}")
        JSON.parse(response&.body || "{}")
      rescue HTTParty::Error
      end
    end

    def getTotalResults(data)
      data["searchInformation"]["totalResults"]
    end
  end

  class Url
    include Singleton

    class << self
      delegate :searchByGoogle, :xpathSearch, :getTotalAdwords, :getTotalLinks, to: :instance
    end

    def searchByGoogle(query)
      begin
        document = Nokogiri::HTML.parse(open("https://www.google.com/search?q=#{query}"))
      rescue Nokogiri::Error
      end
    end

    def xpathSearch(document, path)
      begin
        document.xpath(path)
      rescue Nokogiri::Error
      end
    end

    def getTotalAdwords(data)
      ad_words = data.select { |div| div[:class] == 'zbELhe MUxGbd lyLwlc aLF0Z' }.length
    end

    def getTotalLinks(data)
      total_links = data.select { |div| div[:class] == 'BNeawe vvjwJb AP7Wnd' }.length
    end

  end
end