import scrapy


class QuotesSpider(scrapy.Spider):
    name = "scotiabank"

    def start_requests(self):
        urls = [
            'https://www.scotiabank.com.uy/Tarjetas/Promociones'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)
    
    def parse(self, response):
        o = open("benescotia","r+")
        entries = []
        categories = response.xpath('//section[@class="staticInfoTiles"]//h1/text()').extract()
        for i in range(1,len(categories)+1):
            stores = response.xpath('//section[@class="staticInfoTiles"][' + str(i) + ']//li/h2/text()').extract()
            for s in range(1,len(stores)+1):
                link_to_description = response.xpath('//section[@class="staticInfoTiles"][' + str(i) + ']//li[' + str(s) + ']//a[@class="button"]/@href').extract_first()
                description = response.xpath('//section[@class="staticInfoTiles"][' + str(i) + ']//li[' + str(s) + ']//div[@class="promo-text"]//*/text()').extract()[1]
                entries.append((categories[i-1], stores[s-1], link_to_description, description))
                o.write(str((categories[i-1], stores[s-1], link_to_description, description)) + '\n')


