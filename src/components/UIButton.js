// src/components/UIButton.js

class UIButton {
    constructor(options) {
        this.id = options.id || `btn_${Date.now()}`;
        this.text = options.text || '버튼';
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 'auto';
        this.height = options.height || 'auto';
        this.color = options.color || '#667eea';
        this.textColor = options.textColor || '#ffffff';
        this.fontSize = options.fontSize || 14;
        this.borderRadius = options.borderRadius || 8;
        this.visible = options.visible !== false;
        this.enabled = options.enabled !== false;
        
        this.element = null;
        this.clickCount = 0;
        this.isPressed = false;
        
        this.create();
    }
    
    create() {
        const manager = Entry.UIManager;
        manager.initialize();
        
        this.element = document.createElement('button');
        this.element.className = 'entry-ui-component entry-ui-button';
        this.element.textContent = this.text;
        
        this.updateStyle();
        this.bindEvents();
        
        manager.container.appendChild(this.element);
        manager.registerComponent(this.id, this);
    }
    
    updateStyle() {
        const screenPos = Entry.UIManager.convertEntryToScreen(this.x, this.y);
        
        this.element.style.cssText = `
            position: absolute;
            left: ${screenPos.x}px;
            top: ${screenPos.y}px;
            transform: translate(-50%, -50%);
            width: ${this.width === 'auto' ? 'auto' : this.width + 'px'};
            height: ${this.height === 'auto' ? 'auto' : this.height + 'px'};
            background: ${this.color};
            color: ${this.textColor};
            font-size: ${this.fontSize}px;
            border-radius: ${this.borderRadius}px;
            display: ${this.visible ? 'block' : 'none'};
            z-index: ${Entry.UIManager.getNextZIndex()};
        `;
        
        if (!this.enabled) {
            this.element.classList.add('disabled');
        } else {
            this.element.classList.remove('disabled');
        }
    }
    
    bindEvents() {
        this.element.addEventListener('click', (e) => {
            if (!this.enabled) return;
            
            this.clickCount++;
            Entry.UIManager.triggerEvent(this.id, 'click', {
                id: this.id,
                clickCount: this.clickCount
            });
        });
        
        this.element.addEventListener('mousedown', () => {
            if (!this.enabled) return;
            this.isPressed = true;
            Entry.UIManager.triggerEvent(this.id, 'press', { id: this.id });
        });
        
        this.element.addEventListener('mouseup', () => {
            if (!this.enabled) return;
            this.isPressed = false;
            Entry.UIManager.triggerEvent(this.id, 'release', { id: this.id });
        });
        
        this.element.addEventListener('mouseenter', () => {
            Entry.UIManager.triggerEvent(this.id, 'hover', { id: this.id });
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.isPressed = false;
            Entry.UIManager.triggerEvent(this.id, 'leave', { id: this.id });
        });
    }
    
    // Setter 메서드들
    setText(text) {
        this.text = text;
        this.element.textContent = text;
    }
    
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.updateStyle();
    }
    
    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.updateStyle();
    }
    
    setColor(color) {
        this.color = color;
        this.updateStyle();
    }
    
    setTextColor(color) {
        this.textColor = color;
        this.updateStyle();
    }
    
    setVisible(visible) {
        this.visible = visible;
        this.element.style.display = visible ? 'block' : 'none';
    }
    
    setEnabled(enabled) {
        this.enabled = enabled;
        if (enabled) {
            this.element.classList.remove('disabled');
        } else {
            this.element.classList.add('disabled');
        }
    }
    
    // Getter 메서드들
    getClickCount() {
        return this.clickCount;
    }
    
    isButtonPressed() {
        return this.isPressed;
    }
    
    resetClickCount() {
        this.clickCount = 0;
    }
    
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

Entry.UIButton = UIButton;
