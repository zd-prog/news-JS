import { Article } from '../../types/newsApi';
import './news.css';

class News {
    public draw(data: Article[]): void {
        const news: Article[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone: HTMLElement | undefined = newsItemTemp?.content.cloneNode(true) as HTMLElement;

            if (newsClone !== undefined) {
                if (idx % 2) {
                    newsClone.querySelector('.news__item')?.classList.add('alt');
                }

                const newsPhoto: HTMLStyleElement | undefined = newsClone.querySelector(
                    '.news__meta-photo'
                ) as HTMLStyleElement;
                const newsAuthor: Element | null = newsClone.querySelector('.news__meta-author');
                const newsDate: Element | null = newsClone.querySelector('.news__meta-date');
                const newsDescriptionTitle: Element | null = newsClone.querySelector('.news__description-title');
                const newsDescriptionSource: Element | null = newsClone.querySelector('.news__description-source');
                const newsDescriptionContent: Element | null = newsClone.querySelector('.news__description-content');
                const newsReadMore = newsClone.querySelector('.news__read-more a');
                if (newsPhoto !== undefined) {
                    newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }

                if (newsAuthor !== null) {
                    newsAuthor.textContent = item.author || item.source.name;
                }

                if (newsDate !== null) {
                    newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }

                if (newsDescriptionTitle !== null) {
                    newsDescriptionTitle.textContent = item.title;
                }

                if (newsDescriptionSource !== null) {
                    newsDescriptionSource.textContent = item.source.name;
                }

                if (newsDescriptionContent !== null) {
                    newsDescriptionContent.textContent = item.description;
                }

                if (newsReadMore !== null) newsReadMore.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });

        const newsElement = document.querySelector('.news');

        if (newsElement !== null) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
