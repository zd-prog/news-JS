import { Endpoint } from '../types/enums';
import AppLoader from './appLoader';
import { Callback } from './loader';

class AppController extends AppLoader {
    public getSources<T>(callback: Callback<T>): void {
        super.getResp(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews<T>(e: Event, callback: Callback<T>): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        while (target !== newsContainer) {
            if (target !== null) {
                const targetElement: Element = target as Element;

                if (targetElement.classList.contains('source__item')) {
                    const sourceId = targetElement.getAttribute('data-source-id');
                    const newsContainerElement = newsContainer as Element;

                    if (sourceId !== null && newsContainerElement.getAttribute('data-source') !== sourceId) {
                        newsContainerElement.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: Endpoint.Everything,
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }

                target = targetElement.parentNode;
            }
        }
    }
}

export default AppController;
