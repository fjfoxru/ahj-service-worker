import moment from 'moment';

export default class News {
  constructor(URL) {
    this.URL = `${URL}news`;
    this.data = undefined;
    this.element = document.querySelector('.news-widget');
    this.newsListEl = this.element.querySelector('.news_list');
    this.errorModalEl = this.element.querySelector('.error_modal');
    this.updateButtonEl = this.element.querySelector('.news_update-button');
    this.bindToDOM();
  }

  bindToDOM() {
    this.getNewsData();
    this.updateButtonEl.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.getNewsData();
    });
  }

  async getNewsData() {
    try {
      this.showDownloadMarkup();
      const response = await fetch(this.URL);
      if (response.ok) {
        // если HTTP-статус в диапазоне 200-299
        const data = await response.json();
        this.data = data;
        this.drawNewsList(data.newsList);
        return data;
      }
      throw new Error('Ответ сети был не ok.');
    } catch (error) {
      this.showError();
      throw new Error(error.message);
    }
  }

  drawNewsList(newsList) {
    let HTML = '';
    newsList.forEach((item) => {
      HTML += this.showMarkupNewsItem(item);
    });
    this.newsListEl.innerHTML = HTML;
    this.element.classList.remove('download');
  }

  showMarkupNewsItem(item) {
    return `<div class="news-item">
    <div class="news-item_date">${moment(item.date).format('hh:mm MM.DD.YYYY')}</div>
    <div class="news-item-content">
      <div class="news-item-content_text">
      <p class="news-item-content_description">${item.description}</p>
      </div>
    </div>
  </div>`;
  }

  showDownloadMarkup() {
    const HTML = `<div class="news-item">
    <div class="news-item_date"></div>
    <div class="news-item-content">
      <div class="news-item-content_image-container">

      </div>
      <div class="news-item-content_text">
        <p class="news-item-content_description"></p>
      </div>
    </div>
  </div>

  <div class="news-item">
    <div class="news-item_date"></div>
    <div class="news-item-content">
      <div class="news-item-content_image-container">

      </div>
      <div class="news-item-content_text">
        <p class="news-item-content_description"></p>
      </div>
    </div>
  </div>

  <div class="news-item">
    <div class="news-item_date"></div>
    <div class="news-item-content">
      <div class="news-item-content_image-container">

      </div>
      <div class="news-item-content_text">
        <p class="news-item-content_description"></p>
      </div>
    </div>
  </div>`;
    this.newsListEl.innerHTML = HTML;
    this.element.classList.add('download');
  }

  showError() {
    this.errorModalEl.classList.remove('hidden');
  }
}
