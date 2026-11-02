import { Source } from '../../types/newsApi';
import './sources.css';

class Sources {
    public draw(data: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: Source) => {
            const sourceClone: HTMLElement | undefined = sourceItemTemp?.content.cloneNode(true) as HTMLElement;

            if (sourceClone !== undefined) {
                const sourceItemName: Element | null = sourceClone.querySelector('.source__item-name');

                if (sourceItemName !== null) {
                    sourceItemName.textContent = item.name;
                }

                const sourceItem: Element | null = sourceClone.querySelector('.source__item');

                if (sourceItem !== null) {
                    sourceItem.setAttribute('data-source-id', item.id);
                }

                fragment.append(sourceClone);
            }
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
