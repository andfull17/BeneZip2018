import scrapy


class QuotesSpider(scrapy.Spider):
    name = "oca"

    def start_requests(self):
        urls = [
            'https://www.oca.com.uy/institucional/promociones.aspx'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)
    
    def parse(self, response):
        o = open("beneoca","r+")
        entries = []
        categories = response.xpath('//div[@class="item"]//div[@class="bd"]/h4/text()').extract()
        for i in range(1,len(categories)+1):
            description = response.xpath('//div[@class="item"][' + str(i) + ']//div[@class="bd"]/p/text()').extract_first()
            entries.append((categories[i-1], description))
            o.write(str((categories[i-1], description)) + '\n')
