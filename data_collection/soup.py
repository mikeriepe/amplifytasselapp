import requests
from bs4 import BeautifulSoup

def scrape_html(url):
    try:
        # Send a GET request to the URL
        response = requests.get(url)
        
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the HTML content of the page using Beautiful Soup
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract any information you need from the page
            # Here, we'll just return the raw HTML content
            return soup.prettify()
        else:
            print("Failed to retrieve page:", response.status_code)
            return None
    except Exception as e:
        print("An error occurred:", str(e))
        return None

if __name__ == "__main__":
    # Example URL to scrape
    url = 'https://www.linkedin.com/in/aanchel-shimkhada/'
    
    # Scrape the HTML content
    raw_html = scrape_html(url)
    
    if raw_html:
        # Print or save the HTML content as needed
        print(raw_html)
