import scrapy

entries = []
o = open("benebrou","r+")

class QuotesSpider(scrapy.Spider):
    name = "brou"

    def start_requests(self):
        urls = [
            'https://beneficios.brou.com.uy/'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)
    
    def parse(self, response):
        #entries = []
        categories = response.xpath('//div[@class="col-md-5ths col-xs-6"]//p/text()').extract()
        url_to_category = response.xpath('//div[@class="col-md-5ths col-xs-6"]//a/@href').extract()
        for i in range(1,len(categories)+1):
            yield scrapy.Request(url= 'https:' + url_to_category[i-1], callback=self.brouCategory, meta={'category': categories[i-1]})


    def brouCategory(self, response):      
        category = response.meta['category']
        item_category = []
        item_in_category = response.xpath('//div[@class="col-md-5ths col-xs-6 beneficio-item"]//div[@class="logo-beneficio-wrapper"]/p/text()').extract()
        item_in_category = [' '.join(x.split()) for x in item_in_category]
        item_url = response.xpath('//div[@class="col-md-5ths col-xs-6 beneficio-item"]/a/@href').extract()
        for i in range(1,len(item_in_category)+1):
                yield scrapy.Request(url= 'https:' + item_url[i-1], callback=self.brouItem, meta={'category': category, 'item_name': item_in_category[i-1]})

    def brouItem(self, response):
        category = response.meta['category']
        item_name = response.meta['item_name'] 
        item_category = []
        item_title = response.xpath('//div[@class="col-xs-12 col-md-10 hidden-xs"]/h3/text()').extract_first()
        entries.append((category, item_name, item_title))
        o.write(str((category, item_name, item_title)) + '\n')



