// src/components/UISlider.js

class UISlider {
    constructor(options) {
        this.id = options.id || `slider_${Date.now()}`;
        this.label = options.label || '';
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.min = options.min || 0;
        this.max = options.max || 100;
        this.value = options.value || 50;
        this.step = options.step || 1;
        this.width = options.width || 150;
        this.showValue = options.showValue !== false;
        this.visible = options.visible !== false;
        
        this.element = null;
        this.sliderInput = null;
        this.valueDisplay = null;
        
        this.create();
    }
    
    create() {
        const manager = Entry.UIManager;
        manager.initialize();
        
        this.element = document.createElement('div');
        this.element.className = 'entry-ui-component entry-ui-slider-container';
        
        // 라벨
        if (this.label) {
            const labelEl = document.createElement('div');
            labelEl.className = 'entry-ui-slider-label';
            labelEl.textContent = this.label;
            this.element.appendChild(labelEl);
        }
        
        // 슬라이더
        this.sliderInput = document.createElement('input');
        this.sliderInput.type = 'range';
        this.sliderInput.className = 'entry-ui-slider';
        this.sliderInput.min = this.min;
        this.sliderInput.max = this.max;
        this.sliderInput.value = this.value;
        this.sliderInput.step = this.step;
        this.sliderInput.style.width = `${this.width}px`;
        this.element.appendChild(this.sliderInput);
        
        // 값 표시
        if (this.showValue) {
            this.valueDisplay = document.createElement('div');
            this.valueDisplay.className = 'entry-ui-slider-value';
            this.valueDisplay.textContent = this.value;
            this.element.appendChild(this.valueDisplay);
        }
        
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
        this.element.style.display = this.visible ? 'flex' : 'none';
        this.element.style.zIndex = Entry.UIManager.getNextZIndex();
    }
    
    bindEvents() {
        this.sliderInput.addEventListener('input', (e) => {
            this.value = parseFloat(e.target.value);
            
            if (this.valueDisplay) {
                this.valueDisplay.textContent = this.value;
            }
            
            Entry.UIManager.triggerEvent(this.id, 'change', {
                id: this.id,
                value: this.value
            });
        });
        
        this.sliderInput.addEventListener('mousedown', () => {
            Entry.UIManager.triggerEvent(this.id, 'dragstart', { id: this.id });
        });
        
        this.sliderInput.addEventListener('mouseup', () => {
            Entry.UIManager.triggerEvent(this.id, 'dragend', {
                id: this.id,
                value: this.value
            });
        });
    }
    
    getValue() {
        return this.value;
    }
    
    setValue(value) {
        this.value = Math.max(this.min, Math.min(this.max, value));
        this.sliderInput.value = this.value;
        if (this.valueDisplay) {
            this.valueDisplay.textContent = this.value;
        }
    }
    
    setRange(min, max) {
        this.min = min;
        this.max = max;
        this.sliderInput.min = min;
        this.sliderInput.max = max;
        this.setValue(this.value); // 현재 값이 범위 내인지 확인
    }
    
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.updateStyle();
    }
    
    setVisible(visible) {
        this.visible = visible;
        this.element.style.display = visible ? 'flex' : 'none';
    }
    
    setLabel(label) {
        this.label = label;
        const labelEl = this.element.querySelector('.entry-ui-slider-label');
        if (labelEl) {
            labelEl.textContent = label;
        }
    }
    
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

Entry.UISlider = UISlider;
