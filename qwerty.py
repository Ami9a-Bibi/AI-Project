from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time
import os

# URL of the website you want to scrape
url = "http://lhc.gov.pk/your-page-with-files"

# Directory to save downloaded files
download_dir = "downloads"

if not os.path.exists(download_dir):
    os.makedirs(download_dir)

# Set up the Chrome driver
options = webdriver.ChromeOptions()
options.add_experimental_option('prefs', {
    "download.default_directory": os.path.abspath(download_dir), # Change default directory for downloads
    "download.prompt_for_download": False, # To auto download the file
    "download.directory_upgrade": True,
    "safebrowsing.enabled": True
})

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

def download_new_files():
    driver.get(url)

    # Read previously downloaded files from a local record (if any)
    downloaded_files = set()
    if os.path.exists("downloaded_files.txt"):
        with open("downloaded_files.txt", "r") as f:
            downloaded_files = set(f.read().splitlines())

    new_files = []

    # Find all links to files (this will depend on the website's structure)
    # Here we assume files are linked in <a> tags with class 'file-link'
    file_links = driver.find_elements(By.CSS_SELECTOR, "a.file-link")

    for link in file_links:
        file_url = link.get_attribute("href")
        file_name = os.path.basename(file_url)

        if file_name not in downloaded_files:
            link.click()
            new_files.append(file_name)
            print(f"Downloaded: {file_name}")

    # Update the local record of downloaded files
    with open("downloaded_files.txt", "a") as f:
        for file_name in new_files:
            f.write(file_name + "\n")

    if not new_files:
        print("No new files found.")

# Schedule the script to run every hour
try:
    while True:
        download_new_files()
        # Wait for 1 hour (3600 seconds)
        time.sleep(3600)
finally:
    driver.quit()
