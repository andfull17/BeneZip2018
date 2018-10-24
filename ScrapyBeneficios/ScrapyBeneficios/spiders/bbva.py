import scrapy


class QuotesSpider(scrapy.Spider):
    name = "bbva"

    def start_requests(self):
        urls = [
            'https://www.bbva.com.uy/inicio/Personas/Tarjetas/beneficios_credito'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)
    
    def parse(self, response):
        #o = open("bbva","r+")
        categories = []
        categorie_name = response.xpath('//ul[@class="mtree xx mtree-custom hidden-xs"]/li[@class="mtree-custom__item"]/a/text()').extract()
        url_to_categorie = response.xpath('//ul[@class="mtree xx mtree-custom hidden-xs"]/li[@class="mtree-custom__item"]/a/@href').extract()
        for i in range(1,len(categorie_name)+1):
            yield scrapy.Request(url= 'https://www.bbva.com.uy' + url_to_categorie[i-1], callback=self.bbvaCategorie)



    def bbvaCategorie(self, response):
        item_categorie = []
        item_in_categorie = response.xpath('//div[@class="grid-block-new__innerWrap"]/div[@class="grid-block-new__header"]/h4/a/text()').extract()
        item_categorie.append((response, item_in_categorie))
        print (item_categorie)
#            stores = response.xpath('//section[@class="staticInfoTiles"][' + str(i) + ']//li/h2/text()').extract()
#            for s in range(1,len(stores)+1):
#                link_to_description = response.xpath('//section[@class="staticInfoTiles"][' + str(i) + ']//li[' + str(s) + ']//a[@class="button"]/@href').extract_first()
#                entries.append((categories[i-1], stores[s-1], link_to_description))
#                o.write(str((categories[i-1], stores[s-1], link_to_description)) + '\n')
                

        


#response.xpath('//section[@class="staticInfoTiles"][3]//li/h2/text()')[0]

