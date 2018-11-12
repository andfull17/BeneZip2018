import csv
import http.client
import json
from os import listdir
from os.path import isfile, join
from time import sleep

elasticsearch = http.client.HTTPConnection('127.0.0.1', 9200)
headers = {'Content-type': 'application/json'}

dir = 'C:\\Users\\Andrés\\Desktop\\Andrés\\Facultad\\2018-2\\WEBIR\\BeneZip2018\\ScrapyBeneficios'
csvfiles = [f for f in listdir(dir) if (isfile(join(dir, f)) and f.endswith('.csv') )]

for csvf in csvfiles:
	with open(csvf, encoding="utf8") as csvfile:
		entries = csv.reader(csvfile, delimiter=',')
		for row in entries:
			content = {
						'category': row[0],
						'store': row[1],
						'description': row[3],
						'uri': row[2]
					}
			json_content = json.dumps(content)
			elasticsearch.request('POST', '/' + csvf.replace('.csv','') +'/benefits', json_content, headers)
			response = elasticsearch.getresponse()
			response.read()
			print(response.status, response.reason)
			if(response.status != 201):
				print(json_content)
				print(response.read().decode())
				print()
