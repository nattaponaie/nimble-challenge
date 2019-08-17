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
        # mock_response = GoogleSearch::Response.mock_response()
        # total_links = mock_response[:items].length
        # total_results = mock_response[:searchInformation][:totalResults]
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
      delegate :searchByGoogle, :getTotalAdwords, :getTotalLinks, to: :instance
    end

    def searchByGoogle(query)
      begin
        document = Nokogiri::HTML.parse(open("https://www.google.com/search?q=#{query}"))
        divs = document.xpath("//div")
      rescue HTTParty::Error
      end
    end

    def getTotalAdwords(data)
      ad_words = data.select { |div| div[:class] == 'zbELhe MUxGbd lyLwlc aLF0Z' }.length
    end

    def getTotalLinks(data)
      total_links = data.select { |div| div[:class] == 'BNeawe vvjwJb AP7Wnd' }.length
    end

  end

  def mock_response
    return {
        "kind": "customsearch#search",
        "url": {
            "type": "application/json",
            "template": "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
        },
        "queries": {
            "request": [
                {
                    "title": "Google Custom Search - lectures",
                    "totalResults": "12200000",
                    "searchTerms": "lectures",
                    "count": 10,
                    "startIndex": 1,
                    "inputEncoding": "utf8",
                    "outputEncoding": "utf8",
                    "safe": "off",
                    "cx": "012610938639456974169:qcicw6fgude"
                }
            ],
            "nextPage": [
                {
                    "title": "Google Custom Search - lectures",
                    "totalResults": "12200000",
                    "searchTerms": "lectures",
                    "count": 10,
                    "startIndex": 11,
                    "inputEncoding": "utf8",
                    "outputEncoding": "utf8",
                    "safe": "off",
                    "cx": "012610938639456974169:qcicw6fgude"
                }
            ]
        },
        "context": {
            "title": "nimble-search"
        },
        "searchInformation": {
            "searchTime": 0.386747,
            "formattedSearchTime": "0.39",
            "totalResults": "12200000",
            "formattedTotalResults": "12,200,000"
        },
        "items": [
            {
                "kind": "customsearch#result",
                "title": "Digital Photography",
                "htmlTitle": "Digital Photography",
                "link": "https://sites.google.com/site/marclevoylectures",
                "displayLink": "sites.google.com",
                "snippet": "I'll show the parts of a camera (every screw) during one of the lectures. Most \nphotography books talk about depth of field and depth of focus, but few of them \ngive ...",
                "htmlSnippet": "I&#39;ll show the parts of a camera (every screw) during one of the <b>lectures</b>. Most <br>\nphotography books talk about depth of field and depth of focus, but few of them <br>\ngive&nbsp;...",
                "formattedUrl": "https://sites.google.com/site/marclevoylectures",
                "htmlFormattedUrl": "https://sites.google.com/site/marclevoy<b>lectures</b>",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "474",
                            "height": "106",
                            "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTr3IhXex98QUcC6GRnjjfZCkNu1sKbUyQ1zEqfYcZ2DTNzlDu4E4lVwg"
                        }
                    ],
                    "metatags": [
                        {
                            "title": "Digital Photography",
                            "og:title": "Digital Photography",
                            "og:image": "https://sites.google.com/site/marclevoylectures/_/rsrc/1463317228421/home/teaser-pictures-notext3.png"
                        }
                    ],
                    "webpage": [
                        {
                            "name": "Digital Photography",
                            "image": "https://sites.google.com/site/marclevoylectures/_/rsrc/1463317228421/home/teaser-pictures-notext3.png"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://sites.google.com/site/marclevoylectures/_/rsrc/1463317228421/home/teaser-pictures-notext3.png"
                        }
                    ]
                }
            },
            {
                "kind": "customsearch#result",
                "title": "Noether Lectures - AWM Association for Women in Mathematics",
                "htmlTitle": "Noether <b>Lectures</b> - AWM Association for Women in Mathematics",
                "link": "https://sites.google.com/site/awmmath/programs/noether-lectures",
                "displayLink": "sites.google.com",
                "snippet": "ABOUT THE SERIES. AWM established the Emmy Noether Lectures in 1980 to \nhonor women who have made fundamental and sustained contributions to the ...",
                "htmlSnippet": "ABOUT THE SERIES. AWM established the Emmy Noether <b>Lectures</b> in 1980 to <br>\nhonor women who have made fundamental and sustained contributions to the&nbsp;...",
                "formattedUrl": "https://sites.google.com/site/awmmath/programs/noether-lectures",
                "htmlFormattedUrl": "https://sites.google.com/site/awmmath/programs/noether-<b>lectures</b>",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "197",
                            "height": "159",
                            "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9tAPxT_XuezYWgdUFcJGi7zUh9W8WS-_nD33_GawS3PsOOCumTEtRCZE"
                        }
                    ],
                    "metatags": [
                        {
                            "viewport": "width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
                            "title": "Noether Lectures - AWM Association for Women in Mathematics",
                            "og:title": "Noether Lectures - AWM Association for Women in Mathematics",
                            "og:description": "The purpose of the Association for Women in Mathematics is to encourage women and girls to study and to have active careers in the mathematical sciences, and to promote equal opportunity and the equal treatment of women and girls in the mathematical sciences.",
                            "og:image": "https://sites.google.com/site/awmmath/_/rsrc/1466351869156/programs/noether-lectures/awmlogo.gif?height=160&width=200"
                        }
                    ],
                    "webpage": [
                        {
                            "name": "Noether Lectures - AWM Association for Women in Mathematics",
                            "description": "The purpose of the Association for Women in Mathematics is to encourage women and girls to study and to have active careers in the mathematical sciences, and to promote equal opportunity and...",
                            "image": "https://sites.google.com/site/awmmath/_/rsrc/1466351869156/programs/noether-lectures/awmlogo.gif?height=160&width=200"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://sites.google.com/site/awmmath/_/rsrc/1466351869156/programs/noether-lectures/awmlogo.gif?height=160&width=200"
                        }
                    ]
                }
            },
            {
                "kind": "customsearch#result",
                "title": "Daily briefing: UK university will ban lectures",
                "htmlTitle": "Daily briefing: UK university will ban <b>lectures</b>",
                "link": "http://feedproxy.google.com/~r/nature/rss/current/~3/qrT1Ub1L_FQ/d41586-019-02078-6",
                "displayLink": "feedproxy.google.com",
                "snippet": "Jul 3, 2019 ... Daily briefing: UK university will ban lectures. “Soul-destroying” for lecturers and \nnot great for learning anyway. Plus: climate change made the ...",
                "htmlSnippet": "Jul 3, 2019 <b>...</b> Daily briefing: UK university will ban <b>lectures</b>. “Soul-destroying” for lecturers and <br>\nnot great for learning anyway. Plus: climate change made the&nbsp;...",
                "formattedUrl": "feedproxy.google.com/~r/nature/rss/current/~3/.../d41586-019-02078-6",
                "htmlFormattedUrl": "feedproxy.google.com/~r/nature/rss/current/~3/.../d41586-019-02078-6",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "318",
                            "height": "159",
                            "src": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToKtNOvmoYEao1jB8IQjZXTCbehLS89mFphPjfYta0ZqdmUc6q8pKWaWPl"
                        }
                    ],
                    "metatags": [
                        {
                            "viewport": "width=device-width, initial-scale=1.0, shrink-to-fit=no",
                            "og:url": "http://www.nature.com/articles/d41586-019-02078-6",
                            "og:type": "article",
                            "og:title": "Daily briefing: UK university will ban lectures",
                            "og:description": "“Soul-destroying” for lecturers and not great for learning anyway. Plus: climate change made the record-breaking heatwave in Europe at least five times more likely and psychology’s possible conflict-of-interest problem.",
                            "og:image": "https://media.nature.com/lw1024/magazine-assets/d41586-019-02078-6/d41586-019-02078-6_16878564.png",
                            "twitter:card": "summary_large_image",
                            "twitter:site": "@nature",
                            "twitter:title": "Daily briefing: UK university will ban lectures",
                            "twitter:description": "“Soul-destroying” for lecturers and not great for learning anyway. Plus: climate change made the record-breaking heatwave in Europe at least five times more likely and psychology’s possible conflict-of-interest problem.",
                            "twitter:image": "https://media.nature.com/lw1024/magazine-assets/d41586-019-02078-6/d41586-019-02078-6_16878564.png",
                            "journal_id": "41586",
                            "dc.title": "Daily briefing: UK university will ban lectures",
                            "dc.source": "Nature 2019",
                            "dc.format": "text/html",
                            "dc.publisher": "Nature Publishing Group",
                            "dc.date": "2019-07-03",
                            "dc.type": "Nature Briefing",
                            "dc.copyright": "2019 Nature",
                            "dc.rightsagent": "journalpermissions@springernature.com",
                            "dc.description": "“Soul-destroying” for lecturers and not great for learning anyway. Plus: climate change made the record-breaking heatwave in Europe at least five times more likely and psychology’s possible conflict-of-interest problem. “Soul-destroying” for lecturers and not great for learning anyway. Plus: climate change made the record-breaking heatwave in Europe at least five times more likely and psychology’s possible conflict-of-interest problem.",
                            "prism.publicationname": "Nature",
                            "prism.publicationdate": "2019-07-03",
                            "prism.section": "News",
                            "prism.copyright": "2019 Nature",
                            "prism.rightsagent": "journalpermissions@springernature.com",
                            "prism.url": "https://www.nature.com/articles/d41586-019-02078-6",
                            "prism.doi": "doi:10.1038/d41586-019-02078-6",
                            "dc.identifier": "doi:10.1038/d41586-019-02078-6",
                            "doi": "10.1038/d41586-019-02078-6",
                            "dc.creator": "Flora Graham",
                            "msapplication-tileimage": "/static/images/favicons/nature/favicon-144x144.3e61d1f755.png",
                            "msapplication-tilecolor": "#cedbe0",
                            "wt.cg_s": "Nature Briefing",
                            "wt.z_cg_type": "Nature Briefing",
                            "wt.page_categorisation": "Article page",
                            "wt.template": "oscar",
                            "wt.cg_n": "Nature",
                            "dc.rights": "©2019 Macmillan Publishers Limited. All Rights Reserved.",
                            "wt.z_bandiera_abtest": "a"
                        }
                    ],
                    "newsarticle": [
                        {
                            "articlebody": "NATURE BRIEFING 03 July 2019 Daily briefing: UK university will ban lectures “Soul-destroying” for lecturers and not great for learning anyway. Plus: climate change made the record-breaking...",
                            "datepublished": "03 July 2019",
                            "headline": "Daily briefing: UK university will ban lectures"
                        }
                    ],
                    "breadcrumb": [
                        {
                            "url": "nature",
                            "title": "nature"
                        },
                        {
                            "url": "nature briefing",
                            "title": "nature briefing"
                        },
                        {
                            "url": "article",
                            "title": "article"
                        }
                    ],
                    "organization": [
                        {
                            "name": "Macmillan Publishers Limited, part of Springer Nature"
                        },
                        {
                            "name": "Nature Editorial"
                        }
                    ],
                    "periodical": [
                        {
                            "publisher": "Springer Nature",
                            "name": "Nature",
                            "issn": "1476-4687"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://media.nature.com/lw1024/magazine-assets/d41586-019-02078-6/d41586-019-02078-6_16878564.png"
                        }
                    ]
                }
            },
            {
                "kind": "customsearch#result",
                "title": "PHYSIOLOGY OF EXERCISE - 020 - Lectures on Apple Podcasts",
                "htmlTitle": "PHYSIOLOGY OF EXERCISE - 020 - <b>Lectures</b> on Apple Podcasts",
                "link": "http://feedproxy.google.com/~r/university-query/Lecture/~3/zuR3J0qaOLA/url",
                "displayLink": "feedproxy.google.com",
                "snippet": "Physiology of Exercise. Prerequisites: KH 2230 with a grade of \"C\" or higher or \nconsent of instructor. Focuses on alterations in body systems and organs during ...",
                "htmlSnippet": "Physiology of Exercise. Prerequisites: KH 2230 with a grade of &quot;C&quot; or higher or <br>\nconsent of instructor. Focuses on alterations in body systems and organs during&nbsp;...",
                "cacheId": "-BWyyjpRfWAJ",
                "formattedUrl": "feedproxy.google.com/~r/university-query/Lecture/~3/.../url",
                "htmlFormattedUrl": "feedproxy.google.com/~r/university-query/<b>Lecture</b>/~3/.../url",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "310",
                            "height": "163",
                            "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS0KsTLhEw68t5EevsITz9TisyEjG41vioTfVF2X99MYIwCtk1ih992qOy"
                        }
                    ],
                    "metatags": [
                        {
                            "viewport": "width=device-width, initial-scale=1, viewport-fit=cover",
                            "web-experience-app/config/environment": "%7B%22appVersion%22%3A1%2C%22modulePrefix%22%3A%22web-experience-app%22%2C%22environment%22%3A%22production%22%2C%22rootURL%22%3A%22/%22%2C%22locationType%22%3A%22history-hash-router-scroll%22%2C%22historySupportMiddleware%22%3Atrue%2C%22contentSecurityPolicyMeta%22%3Atrue%2C%22contentSecurityPolicy%22%3A%7B%22default-src%22%3A%5B%22%27none%27%22%5D%2C%22img-src%22%3A%5B%22%27self%27%22%2C%22http%3A//*.mzstatic.com%22%2C%22*.mzstatic.com%22%2C%22*.apple.com%22%2C%22*.googleusercontent.com%22%2C%22data%3A%22%5D%2C%22style-src%22%3A%5B%22%27self%27%22%2C%22%27unsafe-inline%27%22%2C%22*.apple.com%22%5D%2C%22font-src%22%3A%5B%22%27self%27%22%2C%22http%3A//*.apple.com%22%2C%22https%3A//*.apple.com%22%5D%2C%22media-src%22%3A%5B%22%27self%27%22%2C%22blob%3A%22%2C%22http%3A//*%22%2C%22https%3A//*%22%5D%2C%22connect-src%22%3A%5B%22%27self%27%22%2C%22*.apple.com%22%2C%22https%3A//*.mzstatic.com%22%2C%22*.mzstatic.com%22%5D%2C%22script-src%22%3A%5B%22%27self%27%22%2C%22%27unsafe-inline%27%22%2C%22%27unsafe-eval%27%22%2C",
                            "version": "1932.6.0",
                            "og:title": "‎PHYSIOLOGY OF EXERCISE - 020 - Lectures on Apple Podcasts",
                            "og:description": "‎Medicine · 2009",
                            "og:site_name": "Apple Podcasts",
                            "og:url": "https://podcasts.apple.com/us/podcast/physiology-of-exercise-020-lectures/id405933850",
                            "og:image": "https://is4-ssl.mzstatic.com/image/thumb/Podcasts4/v4/7a/1b/f5/7a1bf586-917e-3adc-6232-629cee4a4ee8/mza_1874940493558042991.jpg/1200x630wp.png",
                            "og:image:alt": "PHYSIOLOGY OF EXERCISE - 020 - Lectures on Apple Podcasts",
                            "og:image:secure_url": "https://is4-ssl.mzstatic.com/image/thumb/Podcasts4/v4/7a/1b/f5/7a1bf586-917e-3adc-6232-629cee4a4ee8/mza_1874940493558042991.jpg/1200x630wp.png",
                            "og:image:type": "image/png",
                            "og:image:width": "1200",
                            "og:image:height": "630",
                            "og:type": "product.group",
                            "og:locale": "en_US",
                            "fb:app_id": "311786205924385",
                            "al:ios:url": "itms-podcasts://podcasts.apple.com/us/podcast/physiology-of-exercise-020-lectures/id405933850",
                            "al:ios:app_store_id": "525463029",
                            "al:ios:app_name": "Apple Podcasts",
                            "twitter:title": "‎PHYSIOLOGY OF EXERCISE - 020 - Lectures on Apple Podcasts",
                            "twitter:description": "‎Medicine · 2009",
                            "twitter:site": "@ApplePodcasts",
                            "twitter:domain": "Apple Podcasts",
                            "twitter:image": "https://is4-ssl.mzstatic.com/image/thumb/Podcasts4/v4/7a/1b/f5/7a1bf586-917e-3adc-6232-629cee4a4ee8/mza_1874940493558042991.jpg/1200x600wp.png",
                            "twitter:image:alt": "PHYSIOLOGY OF EXERCISE - 020 - Lectures on Apple Podcasts",
                            "twitter:card": "summary_large_image",
                            "apple:title": "‎PHYSIOLOGY OF EXERCISE - 020 - Lectures",
                            "apple:description": "‎Physiology of Exercise. Prerequisites: KH 2230 with a grade of \"C\" or higher or consent of instructor. Focuses on alterations in body systems and organs during physical activity with emphasis on metabolic, cardio respiratory, and body composition parameters.  Laboratory experiences employing physiol…",
                            "apple:content_id": "405933850"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://is4-ssl.mzstatic.com/image/thumb/Podcasts4/v4/7a/1b/f5/7a1bf586-917e-3adc-6232-629cee4a4ee8/mza_1874940493558042991.jpg/1200x630wp.png"
                        }
                    ]
                }
            },
            {
                "kind": "customsearch#result",
                "title": "Attending Startup School Lectures and Meetups | Startup School",
                "htmlTitle": "Attending Startup School <b>Lectures</b> and Meetups | Startup School",
                "link": "http://feedproxy.google.com/~r/university-query/Lecture/~3/ayoPSE1a5WM/url",
                "displayLink": "feedproxy.google.com",
                "snippet": "Jul 11, 2019 ... This year, more Startup School founders can get the opportunity to attend \nlectures and in-person meetups. You'll also be able to interact with ...",
                "htmlSnippet": "Jul 11, 2019 <b>...</b> This year, more Startup School founders can get the opportunity to attend <br>\n<b>lectures</b> and in-person meetups. You&#39;ll also be able to interact with&nbsp;...",
                "cacheId": "_O5fqF8_fd0J",
                "formattedUrl": "feedproxy.google.com/~r/university-query/Lecture/~3/.../url",
                "htmlFormattedUrl": "feedproxy.google.com/~r/university-query/<b>Lecture</b>/~3/.../url",
                "pagemap": {
                    "metatags": [
                        {
                            "csrf-param": "authenticity_token",
                            "csrf-token": "9FOufeFhN3RgjsbQnPDw1Dfcm+AJH0wQu+frLqmlqHocwBagbgoKkw+zqy4DJh9DTG9ERd/NrNszjFJGPtZvPw==",
                            "viewport": "width=device-width, initial-scale=1"
                        }
                    ]
                }
            },
            {
                "kind": "customsearch#result",
                "title": "Lectures - TheStoicLife.org",
                "htmlTitle": "<b>Lectures</b> - TheStoicLife.org",
                "link": "https://sites.google.com/site/thestoiclife/the_teachers/musonius-rufus/lectures",
                "displayLink": "sites.google.com",
                "snippet": "I - That there is no need of giving many proofs for one problem. II - That man is \nborn with an inclination towards virtue. III - That women too should study ...",
                "htmlSnippet": "I - That there is no need of giving many proofs for one problem. II - That man is <br>\nborn with an inclination towards virtue. III - That women too should study&nbsp;...",
                "formattedUrl": "https://sites.google.com/site/thestoiclife/the_teachers/musonius.../lectures",
                "htmlFormattedUrl": "https://sites.google.com/site/thestoiclife/the_teachers/musonius.../<b>lectures</b>",
                "pagemap": {
                    "metatags": [
                        {
                            "title": "Lectures - TheStoicLife.org",
                            "og:title": "Lectures - TheStoicLife.org"
                        }
                    ],
                    "webpage": [
                        {
                            "name": "Lectures - TheStoicLife.org"
                        }
                    ]
                }
            },
            {
                "kind": "customsearch#result",
                "title": "Invited Lectures - Rafael Ribas",
                "htmlTitle": "Invited <b>Lectures</b> - Rafael Ribas",
                "link": "https://sites.google.com/site/r4ribas/lectures",
                "displayLink": "sites.google.com",
                "snippet": "Rafael Ribas' material used in invited lectures. ... Lecture 1: Occupational Choice, \nRisk, and Financial Constraints Lecture 2: Valuation of Private Ventures",
                "htmlSnippet": "Rafael Ribas&#39; material used in invited <b>lectures</b>. ... <b>Lecture</b> 1: Occupational Choice, <br>\nRisk, and Financial Constraints <b>Lecture</b> 2: Valuation of Private Ventures",
                "formattedUrl": "https://sites.google.com/site/r4ribas/lectures",
                "htmlFormattedUrl": "https://sites.google.com/site/r4ribas/<b>lectures</b>",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "233",
                            "height": "217",
                            "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBiQ3EmpqxRwSbCMdtfagVPL8-XiLmmRFWueuz06Qg-7L1JocOhOER5TU"
                        }
                    ],
                    "metatags": [
                        {
                            "viewport": "width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
                            "title": "Invited Lectures - Rafael Ribas",
                            "og:title": "Invited Lectures - Rafael Ribas",
                            "og:description": "Rafael Ribas' material used in invited lectures."
                        }
                    ],
                    "webpage": [
                        {
                            "name": "Invited Lectures - Rafael Ribas",
                            "description": "Rafael Ribas' material used in invited lectures."
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://sites.google.com/site/r4ribas/_/rsrc/1407211660400/home/_O3A8859.jpg"
                        }
                    ]
                }
            },
            {
                "kind": "customsearch#result",
                "title": "Falconer Lectures - AWM Association for Women in Mathematics",
                "htmlTitle": "Falconer <b>Lectures</b> - AWM Association for Women in Mathematics",
                "link": "https://sites.google.com/site/awmmath/programs/falconer-lectures",
                "displayLink": "sites.google.com",
                "snippet": "The Association for Women in Mathematics and the Mathematical Association of \nAmerica annually present the Etta Zuber Falconer Lecture to honor women who ...",
                "htmlSnippet": "The Association for Women in Mathematics and the Mathematical Association of <br>\nAmerica annually present the Etta Zuber Falconer <b>Lecture</b> to honor women who&nbsp;...",
                "formattedUrl": "https://sites.google.com/site/awmmath/programs/falconer-lectures",
                "htmlFormattedUrl": "https://sites.google.com/site/awmmath/programs/falconer-<b>lectures</b>",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "317",
                            "height": "144",
                            "src": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRWbe5nzM2C9_emG2L8Fcl4p7dyNSu7oH68nKmQZpN0stLiH_bNd32vLrQo"
                        }
                    ],
                    "metatags": [
                        {
                            "viewport": "width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
                            "title": "Falconer Lectures - AWM Association for Women in Mathematics",
                            "og:title": "Falconer Lectures - AWM Association for Women in Mathematics",
                            "og:description": "The purpose of the Association for Women in Mathematics is to encourage women and girls to study and to have active careers in the mathematical sciences, and to promote equal opportunity and the equal treatment of women and girls in the mathematical sciences.",
                            "og:image": "https://sites.google.com/site/awmmath/_/rsrc/1466351869149/programs/falconer-lectures/MAA%20logo.png?height=144&width=320"
                        }
                    ],
                    "webpage": [
                        {
                            "name": "Falconer Lectures - AWM Association for Women in Mathematics",
                            "description": "The purpose of the Association for Women in Mathematics is to encourage women and girls to study and to have active careers in the mathematical sciences, and to promote equal opportunity and...",
                            "image": "https://sites.google.com/site/awmmath/_/rsrc/1466351869149/programs/falconer-lectures/MAA%20logo.png?height=144&width=320"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://sites.google.com/site/awmmath/_/rsrc/1466351869149/programs/falconer-lectures/MAA%20logo.png?height=144&width=320"
                        }
                    ]
                }
            },
            {
                "kind": "customsearch#result",
                "title": "Free public lecture series to explore symmetry in the ... - Chicago",
                "htmlTitle": "Free public <b>lecture</b> series to explore symmetry in the ... - Chicago",
                "link": "http://feedproxy.google.com/~r/UChicago/~3/XbLWHXKb2AE/free-public-lecture-series-explore-symmetry-universe",
                "displayLink": "feedproxy.google.com",
                "snippet": "Apr 5, 2019 ... Postdoc in physics to deliver Compton Lectures beginning April 6.",
                "htmlSnippet": "Apr 5, 2019 <b>...</b> Postdoc in physics to deliver Compton <b>Lectures</b> beginning April 6.",
                "cacheId": "7SXZCaXnf-8J",
                "formattedUrl": "feedproxy.google.com/.../free-public-lecture-series-explore-symmetry- universe",
                "htmlFormattedUrl": "feedproxy.google.com/.../free-public-<b>lecture</b>-series-explore-symmetry- universe",
                "pagemap": {
                    "cse_thumbnail": [
                        {
                            "width": "300",
                            "height": "168",
                            "src": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTMegVp_wBM6tXQcO7m9N0juDMnxILfcYpysb3NBfJKVUBXy-fPmwe-cps"
                        }
                    ],
                    "metatags": [
                        {
                            "title": "Free public lecture series to explore symmetry in the universe | University of Chicago News",
                            "twitter:card": "summary_large_image",
                            "og:site_name": "University of Chicago News",
                            "twitter:title": "Free public lecture series to explore symmetry in the universe",
                            "twitter:description": "Postdoc in physics to deliver Compton Lectures beginning April 6",
                            "twitter:site": "@UChicago",
                            "og:url": "https://news.uchicago.edu/story/free-public-lecture-series-explore-symmetry-universe",
                            "og:title": "Free public lecture series to explore symmetry in the universe",
                            "twitter:creator": "@UChicago",
                            "twitter:url": "https://news.uchicago.edu/story/free-public-lecture-series-explore-symmetry-universe",
                            "og:description": "Free public lecture series to explore symmetry in the universe",
                            "twitter:image": "https://cdn.news.uchicago.edu/sites/default/files/images/2019-04/comptonspring1380.png",
                            "og:image": "https://cdn.news.uchicago.edu/sites/default/files/images/2019-04/comptonspring1380.png",
                            "mobileoptimized": "width",
                            "handheldfriendly": "true",
                            "viewport": "width=device-width, initial-scale=1.0"
                        }
                    ],
                    "cse_image": [
                        {
                            "src": "https://cdn.news.uchicago.edu/sites/default/files/images/2019-04/comptonspring1380.png"
                        }
                    ]
                }
            },
            {
                "kind": "customsearch#result",
                "title": "KAIST MediaNET Lab. - Lectures",
                "htmlTitle": "KAIST MediaNET Lab. - <b>Lectures</b>",
                "link": "https://sites.google.com/view/mnlabkaist/lectures",
                "displayLink": "sites.google.com",
                "snippet": "EE727 Broadband Network Design and Analysis (Fall); EE572/MSB556 Future \nand Technology: New Media technology and Business Strategy (Fall); EE305 ...",
                "htmlSnippet": "EE727 Broadband Network Design and Analysis (Fall); EE572/MSB556 Future <br>\nand Technology: New Media technology and Business Strategy (Fall); EE305&nbsp;...",
                "cacheId": "XN4lmq_8avMJ",
                "formattedUrl": "https://sites.google.com/view/mnlabkaist/lectures",
                "htmlFormattedUrl": "https://sites.google.com/view/mnlabkaist/<b>lectures</b>",
                "pagemap": {
                    "metatags": [
                        {
                            "viewport": "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no",
                            "og:type": "website",
                            "og:title": "KAIST MediaNET Lab. - Lectures",
                            "og:url": "https://sites.google.com/view/mnlabkaist/lectures"
                        }
                    ],
                    "webpage": [
                        {
                            "url": "https://sites.google.com/view/mnlabkaist/lectures",
                            "thumbnailurl": "https://ssl.gstatic.com/atari/images/atari-logo.svg",
                            "image": "https://ssl.gstatic.com/atari/images/atari-logo.svg",
                            "name": "KAIST MediaNET Lab. - Lectures"
                        }
                    ]
                }
            }
        ]
    }
  end
end