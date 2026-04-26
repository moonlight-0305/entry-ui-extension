// src/blocks/block_ui_button.js

Entry.block.ui_button_create = {
    color: '#FF6B6B',
    outerLine: '#E55A5A',
    skeleton: 'basic',
    statements: [],
    template: '%1 버튼 만들기: 이름 %2 x %3 y %4 %5',
    params: [
        {
            type: 'Block',
            accept: 'string'
        },
        {
            type: 'Block',
            accept: 'string'
        },
        {
            type: 'Block',
            accept: 'string'
        },
        {
            type: 'Block',
            accept: 'string'
        },
        {
            type: 'Indicator',
            img: 'block_icon/ui_icon.png',
            size: 11
        }
    ],
    events: {},
    def: {
        params: [
            { type: 'text', params: ['btn1'] },
            { type: 'text', params: ['클릭!'] },
            { type: 'number', params: ['0'] },
            { type: 'number', params: ['0'] },
            null
        ],
        type: 'ui_button_create'
    },
    paramsKeyMap: {
        ID: 0,
        TEXT: 1,
        X: 2,
        Y: 3
    },
    class: 'ui_button',
    func: function(sprite, script) {
        const id = script.getStringValue('ID', script);
        const text = script.getStringValue('TEXT', script);
        const x = script.getNumberValue('X', script);
        const y = script.getNumberValue('Y', script);
        
        new Entry.UIButton({
            id: id,
            text: text,
            x: x,
            y: y
        });
        
        return script.callReturn();
    }
};

Entry.block.ui_button_set_text = {
    color: '#FF6B6B',
    outerLine: '#E55A5A',
    skeleton: 'basic',
    template: '%1 버튼의 텍스트를 %2 (으)로 바꾸기 %3',
    params: [
        { type: 'Block', accept: 'string' },
        { type: 'Block', accept: 'string' },
        { type: 'Indicator', img: 'block_icon/ui_icon.png', size: 11 }
    ],
    def: {
        params: [
            { type: 'text', params: ['btn1'] },
            { type: 'text', params: ['새 텍스트'] },
            null
        ],
        type: 'ui_button_set_text'
    },
    paramsKeyMap: { ID: 0, TEXT: 1 },
    class: 'ui_button',
    func: function(sprite, script) {
        const id = script.getStringValue('ID', script);
        const text = script.getStringValue('TEXT', script);
        
        const button = Entry.UIManager.getComponent(id);
        if (button) {
            button.setText(text);
        }
        
        return script.callReturn();
    }
};

Entry.block.ui_button_set_position = {
    color: '#FF6B6B',
    outerLine: '#E55A5A',
    skeleton: 'basic',
    template: '%1 버튼을 x %2 y %3 (으)로 이동하기 %4',
    params: [
        { type: 'Block', accept: 'string' },
        { type: 'Block', accept: 'string' },
        { type: 'Block', accept: 'string' },
        { type: 'Indicator', img: 'block_icon/ui_icon.png', size: 11 }
    ],
    def: {
        params: [
            { type: 'text', params: ['btn1'] },
            { type: 'number', params: ['100'] },
            { type: 'number', params: ['50'] },
            null
        ],
        type: 'ui_button_set_position'
    },
    paramsKeyMap: { ID: 0, X: 1, Y: 2 },
    class: 'ui_button',
    func: function(sprite, script) {
        const id = script.getStringValue('ID', script);
        const x = script.getNumberValue('X', script);
        const y = script.getNumberValue('Y', script);
        
        const button = Entry.UIManager.getComponent(id);
        if (button) {
            button.setPosition(x, y);
        }
        
        return script.callReturn();
    }
};

Entry.block.ui_button_set_color = {
    color: '#FF6B6B',
    outerLine: '#E55A5A',
    skeleton: 'basic',
    template: '%1 버튼의 색상을 %2 (으)로 바꾸기 %3',
    params: [
        { type: 'Block', accept: 'string' },
        {
            type: 'Color'
        },
        { type: 'Indicator', img: 'block_icon/ui_icon.png', size: 11 }
    ],
    def: {
        params: [
            { type: 'text', params: ['btn1'] },
            null,
            null
        ],
        type: 'ui_button_set_color'
    },
    paramsKeyMap: { ID: 0, COLOR: 1 },
    class: 'ui_button',
    func: function(sprite, script) {
        const id = script.getStringValue('ID', script);
        const color = script.getStringField('COLOR', script);
        
        const button = Entry.UIManager.getComponent(id);
        if (button) {
            button.setColor(color);
        }
        
        return script.callReturn();
    }
};

Entry.block.ui_button_show_hide = {
    color: '#FF6B6B',
    outerLine: '#E55A5A',
    skeleton: 'basic',
    template: '%1 버튼 %2 %3',
    params: [
        { type: 'Block', accept: 'string' },
        {
            type: 'Dropdown',
            options: [
                ['보이기', 'show'],
                ['숨기기', 'hide']
            ],
            fontSize: 11
        },
        { type: 'Indicator', img: 'block_icon/ui_icon.png', size: 11 }
    ],
    def: {
        params: [
            { type: 'text', params: ['btn1'] },
            'show',
            null
        ],
        type: 'ui_button_show_hide'
    },
    paramsKeyMap: { ID: 0, ACTION: 1 },
    class: 'ui_button',
    func: function(sprite, script) {
        const id = script.getStringValue('ID', script);
        const action = script.getField('ACTION', script);
        
        const button = Entry.UIManager.getComponent(id);
        if (button) {
            button.setVisible(action === 'show');
        }
        
        return script.callReturn();
    }
};

Entry.block.ui_button_enable_disable = {
    color: '#FF6B6B',
    outerLine: '#E55A5A',
    skeleton: 'basic',
    template: '%1 버튼 %2 %3',
    params: [
        { type: 'Block', accept: 'string' },
        {
            type: 'Dropdown',
            options: [
                ['활성화', 'enable'],
                ['비활성화', 'disable']
            ],
            fontSize: 11
        },
        { type: 'Indicator', img: 'block_icon/ui_icon.png', size: 11 }
    ],
    def: {
        params: [
            { type: 'text', params: ['btn1'] },
            'enable',
            null
        ],
        type: 'ui_button_enable_disable'
    },
    paramsKeyMap: { ID: 0, ACTION: 1 },
    class: 'ui_button',
    func: function(sprite, script) {
        const id = script.getStringValue('ID', script);
        const action = script.getField('ACTION', script);
        
        const button = Entry.UIManager.getComponent(id);
        if (button) {
            button.setEnabled(action === 'enable');
        }
        
        return script.callReturn();
    }
};

Entry.block.ui_button_remove = {
    color: '#FF6B6B',
    outerLine: '#E55A5A',
    skeleton: 'basic',
    template: '%1 버튼 삭제하기 %2',
    params: [
        { type: 'Block', accept: 'string' },
        { type: 'Indicator', img: 'block_icon/ui_icon.png', size: 11 }
    ],
    def: {
        params: [
            { type: 'text', params: ['btn1'] },
            null
        ],
        type: 'ui_button_remove'
    },
    paramsKeyMap: { ID: 0 },
    class: 'ui_button',
    func: function(sprite, script) {
        const id = script.getStringValue('ID', script);
        Entry.UIManager.removeComponent(id);
        return script.callReturn();
    }
};

// 이벤트 블록 (시작 블록)
Entry.block.ui_button_when_clicked = {
    color: '#FF6B6B',
    outerLine: '#E55A5A',
    skeleton: 'basic_event',
    template: '%1 버튼을 클릭했을 때 %2',
    params: [
        { type: 'Block', accept: 'string' },
        { type: 'Indicator', img: 'block_icon/start_icon_play.png', size: 17, position: { x: 0, y: -2 } }
    ],
    def: {
        params: [
            { type: 'text', params: ['btn1'] },
            null
        ],
        type: 'ui_button_when_clicked'
    },
    paramsKeyMap: { ID: 0 },
    class: 'ui_button_event',
    event: 'ui_button_click',
    func: function(sprite, script) {
        return script.callReturn();
    }
};

// 값 블록
Entry.block.ui_button_get_click_count = {
    color: '#FF6B6B',
    outerLine: '#E55A5A',
    skeleton: 'basic_string_field',
    template: '%1 버튼 클릭 횟수',
    params: [
        { type: 'Block', accept: 'string' }
    ],
    def: {
        params: [
            { type: 'text', params: ['btn1'] }
        ],
        type: 'ui_button_get_click_count'
    },
    paramsKeyMap: { ID: 0 },
    class: 'ui_button_value',
    func: function(sprite, script) {
        const id = script.getStringValue('ID', script);
        const button = Entry.UIManager.getComponent(id);
        return button ? button.getClickCount() : 0;
    }
};

Entry.block.ui_button_is_pressed = {
    color: '#FF6B6B',
    outerLine: '#E55A5A',
    skeleton: 'basic_boolean_field',
    template: '%1 버튼이 눌려 있는가?',
    params: [
        { type: 'Block', accept: 'string' }
    ],
    def: {
        params: [
            { type: 'text', params: ['btn1'] }
        ],
        type: 'ui_button_is_pressed'
    },
    paramsKeyMap: { ID: 0 },
    class: 'ui_button_value',
    func: function(sprite, script) {
        const id = script.getStringValue('ID', script);
        const button = Entry.UIManager.getComponent(id);
        return button ? button.isButtonPressed() : false;
    }
};
