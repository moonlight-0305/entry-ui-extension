// src/components/UITextInput.js

class UITextInput {
    constructor(options) {
        this.id = options.id || `input_${Date.now()}`;
        this.label = options.label || '';
        this.placeholder = options.placeholder || '입력하세요';
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 180;
        this.value = options.value || '';
        this.maxLength = options.maxLength || 100;
        this.inputType = options.inputType || 'text'; // text, number, password
        this.visible = options.visible !== false;
        this.enabled = options.enabled !== false;
        
        this.element = null;
        this.input = null;
        this.isFocused = false;
        
        this.create();
    }
    
    create() {
        const manager = Entry.UIManager;
        manager.initialize();
        
        this.element = document.createElement('div');
        this.element.className = 'entry-ui-component entry-ui-textinput-container';
        
        // 라벨
        if (this.label) {
            const labelEl = document.createElement('label');
            labelEl.className = 'entry-ui-textinput-label';
            labelEl.textContent = this.label;
            this.element.appendChild(labelEl);
        }
        
        // 입력창
        this.input = document.createElement('input');
        this.input.type = this.inputType;
        this.input.className = 'entry-ui-textinput';
        this.input.placeholder = this.placeholder;
        this.input.value = this.value;
        this.input.maxLength = this.maxLength;
        this.input.style.width = `${this.width}px`;
        this.input.disabled = !this.enabled;
        this.element.appendChild(this.input);
        
        this.updateStyle();
        this.bindEvents();
        
        manager.container.appendChild(this.element);
        manager.registerComponent(this.id, this);
    }
    
    updateStyle() {
        const screenPos = Entry.UIManager.convertEntryToScreen(this.x, this.y);
        
        this.element.style.left = `${screenPos.x}px`;
        this.element.style.top = `${screenPos.y}px`;
        this.element.style.transform = 'translate(-50%, -50%)';
        this.element.style.display = this.visible ? 'block' : 'none';
        this.element.style.zIndex = Entry.UIManager.getNextZIndex();
    }
    
    bindEvents() {
        this.input.addEventListener('input', (e) => {
            this.value = e.target.value;
            Entry.UIManager.triggerEvent(this.id, 'input', {
                id: this.id,
                value: this.value
            });
        });
        
        this.input.addEventListener('change', (e) => {
            this.value = e.target.value;
            Entry.UIManager.triggerEvent(this.id, 'change', {
                id: this.id,
                value: this.value
            });
        });
        
        this.input.addEventListener('focus', () => {
            this.isFocused = true;
            Entry.UIManager.triggerEvent(this.id, 'focus', { id: this.id });
        });
        
        this.input.addEventListener('blur', () => {
            this.isFocused = false;
            Entry.UIManager.triggerEvent(this.id, 'blur', {
                id: this.id,
                value: this.value
            });
        });
        
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                Entry.UIManager.triggerEvent(this.id, 'enter', {
                    id: this.id,
                    value: this.value
                });
            }
        });
    }
    
    getValue() {
        return this.value;
    }
    
    setValue(value) {
        this.value = String(value);
        this.input.value = this.value;
    }
    
    clear() {
        this.setValue('');
    }
    
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.updateStyle();
    }
    
    setVisible(visible) {
        this.visible = visible;
        this.element.style.display = visible ? 'block' : 'none';
    }
    
    setEnabled(enabled) {
        this.enabled = enabled;
        this.input.disabled = !enabled;
    }
    
    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        this.input.placeholder = placeholder;
    }
    
    focus() {
        this.input.focus();
    }
    
    blur() {
        this.input.blur();
    }
    
    getLength() {
        return this.value.length;
    }
    
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

Entry.UITextInput = UITextInput;
