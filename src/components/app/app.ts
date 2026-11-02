import AppController from '../controller/controller';
import { ArticlesResponse, SourcesResponse } from '../types/newsApi';
import AppView from '../view/appView';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document
            ?.querySelector('.sources')
            ?.addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data: Partial<ArticlesResponse>) => this.view.drawNews(data))
            );
        this.controller.getSources((data: Partial<SourcesResponse>) => this.view.drawSources(data));
    }
}

export default App;
