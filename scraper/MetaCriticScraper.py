from bs4 import BeautifulSoup
import urllib2

class MetaCriticScraper:
	def __init__(self, url, reviews=False, **kwargs):
		self.game = {'url': '',
					 'title': '',
		             'description': '',
		             'img_url': '',
					 'platform': '',
					 'publisher': '',
					 'release_date': '',
					 'critic_score': '',
					 'critic_outof': '',
					 'critic_count': '',
					 'user_score': '',
					 'user_count': '',
					 'developer': '',
					 'genre': '',
					 'rating': '',
					}

		self.reviews = reviews
		if self.reviews:
			self.game['critic_reviews'] = []
			self.game['critic_review_url'] = kwargs.get('critic_url')
			self.game['user_reviews'] = []
			self.game['user_review_url'] = kwargs.get('user_url')

		try:
			req = urllib2.Request(url)
			req.add_unredirected_header('User-Agent','Mozilla/5.0')
			metacritic_url = urllib2.urlopen(req, timeout = 10)
			self.game['url'] = metacritic_url.geturl()
			html = metacritic_url.read()
			
			self.soup = BeautifulSoup(html, "html.parser")

			if self.reviews:
				req = urllib2.Request(self.game['critic_review_url'])
				req.add_unredirected_header('User-Agent', 'Mozilla/5.0')
				metacritic_url = urllib2.urlopen(req, timeout=10)
				html = metacritic_url.read()
				self.criticReviewSoup = BeautifulSoup(html, "html.parser")

				req = urllib2.Request(self.game['user_review_url'])
				req.add_unredirected_header('User-Agent', 'Mozilla/5.0')
				metacritic_url = urllib2.urlopen(req, timeout=10)
				html = metacritic_url.read()
				self.userReviewSoup = BeautifulSoup(html, "html.parser")

			self.scrape()
		except:
			pass

	def scrape(self):
		# Get Title, and Platform. If site changes and we can't find the right divs or classes
		# skip and leave these values as empty strings
		try:
			product_title_div = self.soup.find("div", class_="product_title")
			self.game['title'] = product_title_div.a.text.strip()
			#self.game['platform'] = product_title_div.span.a.text.strip()
		except:
			print "WARNING: Problem getting title and platform information"
			pass

		# Get game description
		try:
			self.game['description'] = self.soup.find("li", class_="summary_detail product_summary").find("span", class_="blurb blurb_expanded").text.strip()
		except:
			print "WARNING: Problem getting description information"

		# Get game url
		try:
			self.game['img_url'] = self.soup.find("div", class_="product_image").find("img", class_="product_image")['src']
		except:
			print "WARNING: Problem getting game img url"

		# Get publisher and release date. 
		try:
			self.game['publisher'] = self.soup.find("li", class_="summary_detail publisher").a.text.strip()
			self.game['release_date'] = self.soup.find("li", class_="summary_detail release_data").find("span", class_="data").text.strip()
			#datetime.strptime(release_date.strip(), "%b %d, %Y")
		except:
			print "WARNING: Problem getting publisher and release date information"
			pass
			
		# Get critic information
		try:
			critics = self.soup.find("div", class_="details main_details")
			self.game['critic_score'] = critics.find("span", itemprop="ratingValue").text.strip()
			#self.game['critic_outof'] = critics.find("span", class_="score_total").span.text.strip()
			self.game['critic_outof'] = "100"
			self.game['critic_count'] = critics.find("span", itemprop="reviewCount").text.strip()
		except:
			print "WARNING: Problem getting critic score information"
			pass
			
		# Get user information
		try:
			users = self.soup.find("div", class_="details side_details")
			#self.game['user_score'] = users.find("span", class_="score_value").text.strip()
			self.game['user_score'] = users.find("div", class_="metascore_w").text.strip()
			raw_users_count = users.find("span", class_="count").a.text
			user_count = ''
			for c in raw_users_count:
				if c.isdigit(): user_count += c
			self.game['user_count'] = user_count.strip()
		except:
			print "WARNING: Problem getting user score information"
			pass
				
		# Get remaining information
		try:
			product_info = self.soup.find("div", class_="section product_details").find("div", class_="details side_details")
			self.game['developer'] = product_info.find("li", class_="summary_detail developer").find("span", class_="data").text.strip()
			self.game['genre'] = product_info.find("li", class_="summary_detail product_genre").find("span", class_="data").text.strip()
			self.game['rating'] = product_info.find("li", class_="summary_detail product_rating").find("span", class_="data").text.strip()
		except:
			print "WARNING: Problem getting miscellaneous game information"
			pass

		if self.reviews:
			try:
				# User Reviews
				user_review = self.userReviewSoup.find("ol", class_="reviews user_reviews").find_all("li", class_="review user_review")

				for review in user_review:
					comment = review.find("div", class_="review_body").text.strip()
					self.game['user_reviews'].append(comment)

				# Critic Reviews
				critic_review = self.criticReviewSoup.find("ol", class_="reviews critic_reviews").find_all("li", class_="review critic_review")

				for review in critic_review:
					comment = review.find("div", class_="review_body").text.strip()
					self.game['critic_reviews'].append(comment)

			except:
				print "WARNING: Problem getting user or critic reviews"
