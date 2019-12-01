import Input from '../childrens/input';
import Textarea from '../childrens/textarea';
import CheckBox from '../childrens/checkBox';
import Select from '../childrens/select';
import Radio from '../childrens/radio';
import Label from '../childrens/label';
import TextareaWithTab from '../childrens/textareaWithTab';
import PlusMinus from '../childrens/plusMinus';
import FakeSelect from '../childrens/fakeselect';
import AutoSuggest from '../childrens/autosuggest';
import ListBox from '../childrens/listbox';

const switchComponent = (control, component) => {
    let loadComponent = null;
    switch (control) {
        default:
            break;
        case 'text':
            loadComponent = Input;
            break;
        case 'label':
            loadComponent = Label;
            break;
        case 'external':
            loadComponent = component;
            break;
        case 'autosuggest':
            loadComponent = AutoSuggest;
            break;
        case 'check':
            loadComponent = CheckBox;
            break;
        case 'radio':
            loadComponent = Radio;
            break;
        case 'plusMinus':
            loadComponent = PlusMinus;
            break;
        case 'textArea':
            loadComponent = Textarea;
            break;
        case 'select':
            loadComponent = Select;
            break;
        case 'listbox':
            loadComponent = ListBox;
            break;
        case 'tabTextArea':
            loadComponent = TextareaWithTab;
            break;
        case 'fakeselect':
            loadComponent = FakeSelect;
            break;
    }
    return loadComponent;
}

export default switchComponent;